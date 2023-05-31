import {BaseContextType} from '../../contexts/types';
import RequestData from '../../RequestData';
import {generateAndInsertDataSchemaListForTest} from '../../testUtils/generateData/dataSchema';
import {completeTest} from '../../testUtils/helpers/test';
import {
  assertContext,
  assertEndpointResultOk,
  initTestBaseContext,
  insertUserForTest,
  insertWorkspaceForTest,
  mockExpressRequestWithDataSchema,
} from '../../testUtils/testUtils';
import countWorkspaceDataSchemas from './handler';
import {CountWorkspaceDataSchemasEndpointParams} from './types';

let context: BaseContextType | null = null;

beforeAll(async () => {
  context = await initTestBaseContext();
});

afterAll(async () => {
  await completeTest({context});
});

describe('countWorkspaceDataSchemas', () => {
  test('count', async () => {
    assertContext(context);
    const {userSchema} = await insertUserForTest(context);
    const {workspace} = await insertWorkspaceForTest(context, userSchema);
    await generateAndInsertDataSchemaListForTest(context, 15, {
      workspaceId: workspace.resourceId,
    });
    const count = await context.semantic.dataSchema.countByQuery({
      workspaceId: workspace.resourceId,
    });
    const instData =
      RequestData.fromExpressRequest<CountWorkspaceDataSchemasEndpointParams>(
        mockExpressRequestWithDataSchema(userSchema),
        {workspaceId: workspace.resourceId}
      );
    const result = await countWorkspaceDataSchemas(context, instData);
    assertEndpointResultOk(result);
    expect(result.count).toBe(count);
  });
});
