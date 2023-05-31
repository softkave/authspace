import {BaseContextType} from '../../contexts/types';
import RequestData from '../../RequestData';
import {completeTest} from '../../testUtils/helpers/test';
import {
  assertContext,
  assertEndpointResultOk,
  initTestBaseContext,
  insertUserForTest,
  insertUsersConfigForTest,
  insertWorkspaceForTest,
  mockExpressRequestWithUsersConfig,
} from '../../testUtils/testUtils';
import getUsersConfig from './handler';
import {GetUsersConfigEndpointParams} from './types';

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

test('referenced agent config returned', async () => {
  assertContext(context);
  const {userConfig} = await insertUserForTest(context);
  const {workspace} = await insertWorkspaceForTest(context, userConfig);
  const {config: config01} = await insertUsersConfigForTest(
    context,
    userConfig,
    workspace.resourceId
  );

  const instData = RequestData.fromExpressRequest<GetUsersConfigEndpointParams>(
    mockExpressRequestWithUsersConfig(userConfig),
    {configId: config01.resourceId, workspaceId: workspace.resourceId}
  );
  const result = await getUsersConfig(context, instData);
  assertEndpointResultOk(result);
  expect(result.config).toEqual(config01);
});
