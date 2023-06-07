import {faker} from '@faker-js/faker';
import RequestData from '../../RequestData';
import {populateAssignedTags} from '../../assignedItems/getAssignedItems';
import {BaseContextType} from '../../contexts/types';
import EndpointReusableQueries from '../../queries';
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
import {dataSchemaExtractor} from '../utils';
import updateDataSchema from './handler';
import {UpdateDataSchemaEndpointParams, UpdateDataSchemaInput} from './types';

/**
 * TODO:
 * - [Low] Test that hanlder fails if permissionGroups doesn't exist
 * - [Low] Test that onReferenced feature works
 */

let context: BaseContextType | null = null;

beforeAll(async () => {
  context = await initTestBaseContext();
});

afterAll(async () => {
  await completeTest({context});
});

test('agent schema updated', async () => {
  assertContext(context);
  const {userSchema} = await insertUserForTest(context);
  const {workspace} = await insertWorkspaceForTest(context, userSchema);
  const {schema: schema01} = await insertDataSchemaForTest(
    context,
    userSchema,
    workspace.resourceId
  );
  const schemaUpdateInput: UpdateDataSchemaInput = {
    name: faker.lorem.words(10),
    description: faker.lorem.words(10),
  };

  const instData =
    RequestData.fromExpressRequest<UpdateDataSchemaEndpointParams>(
      mockExpressRequestWithDataSchema(userSchema),
      {
        schemaId: schema01.resourceId,
        schema: schemaUpdateInput,
        workspaceId: workspace.resourceId,
      }
    );
  const result = await updateDataSchema(context, instData);
  assertEndpointResultOk(result);

  const updatedSchema = dataSchemaExtractor(
    context,
    await populateAssignedTags(
      context,
      workspace.resourceId,
      await context.semantic.dataSchema.assertGetOneByQuery(
        EndpointReusableQueries.getByResourceId(schema01.resourceId)
      )
    )
  );
  expect(dataSchemaExtractor(updatedSchema)).toMatchObject(result.schema);
  expect(updatedSchema.name).toBe(schemaUpdateInput.name);
  expect(updatedSchema.description).toBe(schemaUpdateInput.description);
});
