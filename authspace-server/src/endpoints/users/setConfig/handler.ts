import {DataSchema} from '@definitions/dataSchema';
import {AppResourceType, SessionAgent} from '@definitions/system';
import {UsersConfig} from '@definitions/user';
import {BaseContextType} from '@endpoints/contexts/types';
import {checkDataSchemaAuthorization02} from '@endpoints/dataSchemas/utils';
import {InvalidRequestError} from '@endpoints/errors';
import {appAssert} from 'src/utils/assertion';
import {newWorkspaceResource} from 'src/utils/resource';
import {getActionAgentFromSessionAgent} from 'src/utils/sessionUtils';
import {getTimestamp} from '../../../utils/dateFns';
import {validate} from '../../../utils/validate';
import {executeWithTxn} from '../../contexts/semantic/utils';
import {getAssertedUsersConfig, usersConfigExtractor} from '../utils';
import {SetConfigEndpoint} from './types';
import {
  setUsersConfigJoiSchema,
  setupUsersConfigJoiSchema,
  updateUsersConfigJoiSchema,
} from './validation';

const setConfig: SetConfigEndpoint = async (context, instData) => {
  const agent = await context.session.getAgent(context, instData);
  const data = validate(instData.data, setUsersConfigJoiSchema);

  // TODO: auth check
  let config = await getExistingConfig(context, data.workspaceId);
  config = config
    ? await updateUsersConfig(context, agent, config.resourceId, data.config)
    : await setupUsersConfig(context, agent, data.workspaceId, data.config);

  return {config: usersConfigExtractor(config)};
};

async function getExistingConfig(ctx: BaseContextType, workspaceId: string) {
  return await ctx.semantic.usersConfig.getOneByQuery({workspaceId});
}

async function setupUsersConfig(
  ctx: BaseContextType,
  agent: SessionAgent,
  workspaceId: string,
  input: Partial<UsersConfig>
) {
  const data = validate(input, setupUsersConfigJoiSchema) as UsersConfig;
  const config = newWorkspaceResource<UsersConfig>(
    agent,
    AppResourceType.UsersConfig,
    workspaceId,
    data
  );
  return await executeWithTxn(ctx, async opts => {
    const {schema} = await checkDataSchemaAuthorization02(
      ctx,
      agent,
      data.schemaId
    );
    checkUsersConfigPreconditions(schema, config);
    await ctx.semantic.usersConfig.insertItem(config, opts);
    return config;
  });
}

async function updateUsersConfig(
  ctx: BaseContextType,
  agent: SessionAgent,
  schemaId: string,
  input: Partial<UsersConfig>
) {
  const data = validate(input, updateUsersConfigJoiSchema);
  const configUpdate: Partial<DataSchema> = {
    ...data,
    lastUpdatedAt: getTimestamp(),
    lastUpdatedBy: getActionAgentFromSessionAgent(agent),
  };
  return await executeWithTxn(ctx, async opts => {
    const {schema} = await checkDataSchemaAuthorization02(ctx, agent, schemaId);
    checkUsersConfigPreconditions(schema, configUpdate);
    const config = await ctx.semantic.usersConfig.updateOneById(
      schemaId,
      configUpdate,
      opts
    );
    return getAssertedUsersConfig(config);
  });
}

function checkUsersConfigPreconditions(
  schema: DataSchema,
  config: Partial<UsersConfig>
) {
  if (config.emailVerifyUsers) {
    const emailItemExists = schema.items.some(
      item => item.semanticGroup === 'email'
    );
    appAssert(
      emailItemExists,
      new InvalidRequestError(
        'Users config requires email verification but email field not found in data schema.'
      )
    );
  }
}

export default setConfig;
