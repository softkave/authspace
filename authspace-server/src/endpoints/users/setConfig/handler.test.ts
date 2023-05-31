import {faker} from '@faker-js/faker';
import RequestData from '../../RequestData';
import {populateConfigWorkspaces} from '../../assignedItems/getAssignedItems';
import {BaseContextType} from '../../contexts/types';
import {generateAndInsertConfigListForTest} from '../../testUtils/generateData/config';
import {expectErrorThrown} from '../../testUtils/helpers/error';
import {completeTest} from '../../testUtils/helpers/test';
import {
  assertContext,
  assertEndpointResultOk,
  initTestBaseContext,
  insertConfigForTest,
  mockExpressRequestWithAgentToken,
} from '../../testUtils/testUtils';
import ConfigQueries from '../ConfigQueries';
import {EmailAddressNotAvailableError} from '../errors';
import {configExtractor} from '../utils';
import setConfig from './handler';
import {SetConfigEndpointParams} from './types';

/**
 * TODO:
 * - test that email verification was voided if email was updated
 */

let context: BaseContextType | null = null;

beforeAll(async () => {
  context = await initTestBaseContext();
});

afterAll(async () => {
  await completeTest({context});
});

describe('setConfig', () => {
  test('config data updated', async () => {
    assertContext(context);
    const {configToken} = await insertConfigForTest(context);
    const updateInput = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    };
    const instData = RequestData.fromExpressRequest<SetConfigEndpointParams>(
      mockExpressRequestWithAgentToken(configToken),
      updateInput
    );

    const result = await setConfig(context, instData);
    assertEndpointResultOk(result);

    const savedConfig = await populateConfigWorkspaces(
      context,
      await context.semantic.config.assertGetOneByQuery(
        ConfigQueries.getById(result.config.resourceId)
      )
    );
    expect(configExtractor(savedConfig)).toMatchObject(result.config);
    expect(savedConfig).toMatchObject(updateInput);
  });

  test('email verification revoked if email is changed', async () => {
    assertContext(context);
    const {configToken} = await insertConfigForTest(context);
    const instData = RequestData.fromExpressRequest<SetConfigEndpointParams>(
      mockExpressRequestWithAgentToken(configToken),
      {email: faker.internet.email()}
    );

    const result = await setConfig(context, instData);
    assertEndpointResultOk(result);

    const savedConfig = await context.semantic.config.assertGetOneByQuery(
      ConfigQueries.getById(result.config.resourceId)
    );
    expect(savedConfig.isEmailVerified).toBeFalsy();
  });

  test('setConfig fails if email address is not available', async () => {
    assertContext(context);
    const email = faker.internet.email();
    await generateAndInsertConfigListForTest(context, /** count */ 1, () => ({
      email,
    }));
    const {configToken} = await insertConfigForTest(context);
    const instData = RequestData.fromExpressRequest<SetConfigEndpointParams>(
      mockExpressRequestWithAgentToken(configToken),
      {email}
    );

    await expectErrorThrown(async () => {
      assertContext(context);
      await setConfig(context, instData);
    }, [EmailAddressNotAvailableError.name]);
  });
});
