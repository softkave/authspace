import {BaseContextType} from '../../contexts/types';
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
import getDataSchema from './handler';
import {GetDataSchemaEndpointParams} from './types';

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

test('referenced agent schema returned', async () => {
  assertContext(context);
  const {userSchema} = await insertUserForTest(context);
  const {workspace} = await insertWorkspaceForTest(context, userSchema);
  const {schema: schema01} = await insertDataSchemaForTest(
    context,
    userSchema,
    workspace.resourceId
  );

  const instData = RequestData.fromExpressRequest<GetDataSchemaEndpointParams>(
    mockExpressRequestWithDataSchema(userSchema),
    {schemaId: schema01.resourceId, workspaceId: workspace.resourceId}
  );
  const result = await getDataSchema(context, instData);
  assertEndpointResultOk(result);
  expect(result.schema).toEqual(schema01);
});
