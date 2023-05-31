import {calculatePageSize} from '../../../utils/fns';
import {BaseContextType} from '../../contexts/types';
import RequestData from '../../RequestData';
import {generateAndInsertDataSchemaListForTest} from '../../testUtils/generateData/dataSchema';
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
import getWorkspaceDataSchemas from './handler';
import {GetWorkspaceDataSchemasEndpointParams} from './types';

let context: BaseContextType | null = null;

beforeAll(async () => {
  context = await initTestBaseContext();
});

afterAll(async () => {
  await completeTest({context});
});

describe('getWorkspaceDataSchemas', () => {
  test("workspace's agent schema returned", async () => {
    assertContext(context);
    const {userSchema} = await insertUserForTest(context);
    const {workspace} = await insertWorkspaceForTest(context, userSchema);
    const [{schema: schema01}, {schema: schema02}] = await Promise.all([
      insertDataSchemaForTest(context, userSchema, workspace.resourceId),
      insertDataSchemaForTest(context, userSchema, workspace.resourceId),
    ]);
    const instData =
      RequestData.fromExpressRequest<GetWorkspaceDataSchemasEndpointParams>(
        mockExpressRequestWithDataSchema(userSchema),
        {workspaceId: workspace.resourceId}
      );
    const result = await getWorkspaceDataSchemas(context, instData);
    assertEndpointResultOk(result);
    expect(result.schemas).toContainEqual(schema01);
    expect(result.schemas).toContainEqual(schema02);
  });

  test('pagination', async () => {
    assertContext(context);
    const {userSchema} = await insertUserForTest(context);
    const {workspace} = await insertWorkspaceForTest(context, userSchema);
    await generateAndInsertDataSchemaListForTest(context, 15, {
      workspaceId: workspace.resourceId,
    });
    const count = await context.semantic.dataSchema.countByQuery({
      workspaceId: workspace.resourceId,
    });
    const pageSize = 10;
    let page = 0;
    let instData =
      RequestData.fromExpressRequest<GetWorkspaceDataSchemasEndpointParams>(
        mockExpressRequestWithDataSchema(userSchema),
        {page, pageSize, workspaceId: workspace.resourceId}
      );
    let result = await getWorkspaceDataSchemas(context, instData);
    assertEndpointResultOk(result);
    expect(result.page).toBe(page);
    expect(result.schemas).toHaveLength(
      calculatePageSize(count, pageSize, page)
    );

    page = 1;
    instData =
      RequestData.fromExpressRequest<GetWorkspaceDataSchemasEndpointParams>(
        mockExpressRequestWithDataSchema(userSchema),
        {page, pageSize, workspaceId: workspace.resourceId}
      );
    result = await getWorkspaceDataSchemas(context, instData);
    assertEndpointResultOk(result);
    expect(result.page).toBe(page);
    expect(result.schemas).toHaveLength(
      calculatePageSize(count, pageSize, page)
    );
  });
});
