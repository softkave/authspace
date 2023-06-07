import {BaseContextType} from '../../contexts/types';
import {executeJob, waitForJob} from '../../jobs/runner';
import EndpointReusableQueries from '../../queries';
import RequestData from '../../RequestData';
import {completeTest} from '../../testUtils/helpers/test';
import {
  assertContext,
  assertEndpointResultOk,
  initTestBaseContext,
  insertDataSchemaForTest,
  insertUserForTest,
  insertWorkspaceForTest,
  mockExpressRequestWithDataSchema,
} from '../../testUtils/testUtils';
import deleteDataSchema from './handler';
import {DeleteDataSchemaEndpointParams} from './types';

/**
 * TODO:
 * - [Low] Check that onReferenced feature works
 */

let context: BaseContextType | null = null;

beforeAll(async () => {
  context = await initTestBaseContext();
});

afterAll(async () => {
  await completeTest({context});
});

test('Agent schema deleted', async () => {
  assertContext(context);
  const {userSchema} = await insertUserForTest(context);
  const {workspace} = await insertWorkspaceForTest(context, userSchema);
  const {schema} = await insertDataSchemaForTest(
    context,
    userSchema,
    workspace.resourceId
  );
  const instData =
    RequestData.fromExpressRequest<DeleteDataSchemaEndpointParams>(
      mockExpressRequestWithDataSchema(userSchema),
      {schemaId: schema.resourceId, workspaceId: workspace.resourceId}
    );

  const result = await deleteDataSchema(context, instData);
  assertEndpointResultOk(result);
  await executeJob(context, result.jobId);
  await waitForJob(context, result.jobId);

  const deletedSchemaExists = await context.semantic.dataSchema.existsByQuery(
    EndpointReusableQueries.getByResourceId(schema.resourceId)
  );

  expect(deletedSchemaExists).toBeFalsy();
});
