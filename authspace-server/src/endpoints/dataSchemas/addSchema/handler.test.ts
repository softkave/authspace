import {populateAssignedTags} from '../../assignedItems/getAssignedItems';
import {BaseContextType} from '../../contexts/types';
import EndpointReusableQueries from '../../queries';
import {completeTest} from '../../testUtils/helpers/test';
import {
  assertContext,
  initTestBaseContext,
  insertDataSchemaForTest,
  insertUserForTest,
  insertWorkspaceForTest,
} from '../../testUtils/testUtils';
import {dataSchemaExtractor} from '../utils';

/**
 * TODO:
 * [Low] - Test that hanlder fails if schema exists
 * [Low] - Test that hanlder fails if permissionGroups don't exist
 */

let context: BaseContextType | null = null;

beforeAll(async () => {
  context = await initTestBaseContext();
});

afterAll(async () => {
  await completeTest({context});
});

test('Agent schema added', async () => {
  assertContext(context);
  const {userSchema} = await insertUserForTest(context);
  const {workspace} = await insertWorkspaceForTest(context, userSchema);
  const {schema} = await insertDataSchemaForTest(
    context,
    userSchema,
    workspace.resourceId
  );
  const savedSchema = dataSchemaExtractor(
    context,
    await populateAssignedTags(
      context,
      workspace.resourceId,
      await context.semantic.dataSchema.assertGetOneByQuery(
        EndpointReusableQueries.getByResourceId(schema.resourceId)
      )
    )
  );
  expect(dataSchemaExtractor(savedSchema)).toMatchObject(schema);
});
