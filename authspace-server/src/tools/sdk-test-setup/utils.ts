import {faker} from '@faker-js/faker';
import {getMongoConnection} from '../../db/connection';
import {Workspace} from '../../definitions/workspace';
import {internalCreateAgentToken} from '../../endpoints/agentTokens/addToken/utils';
import {getPublicAgentToken} from '../../endpoints/agentTokens/utils';
import {addAssignedPermissionGroupList} from '../../endpoints/assignedItems/addAssignedItems';
import BaseContext, {
  getFileProvider,
} from '../../endpoints/contexts/BaseContext';
import {SemanticDataAccessProviderMutationRunOptions} from '../../endpoints/contexts/semantic/types';
import {executeWithTxn} from '../../endpoints/contexts/semantic/utils';
import {BaseContextType} from '../../endpoints/contexts/types';
import {
  getDataProviders,
  getLogicProviders,
  getMemstoreDataProviders,
  getMongoModels,
  getSemanticDataProviders,
  ingestDataIntoMemStore,
} from '../../endpoints/contexts/utils';
import {getConsoleLogger} from '../../endpoints/globalUtils';
import NoopEmailProviderContext from '../../endpoints/testUtils/context/NoopEmailProviderContext';
import INTERNAL_createWorkspace from '../../endpoints/workspaces/addWorkspace/internalCreateWorkspace';
import {makeRootnameFromName} from '../../endpoints/workspaces/utils';
import {getAppVariables, prodEnvsSchema} from '../../resources/vars';
import {SYSTEM_SESSION_AGENT} from '../../utils/agent';
import {appAssert} from '../../utils/assertion';

async function setupContext() {
  const appVariables = getAppVariables(prodEnvsSchema);
  const connection = await getMongoConnection(
    appVariables.mongoDbURI,
    appVariables.mongoDbDatabaseName
  );
  const models = getMongoModels(connection);
  const data = getDataProviders(models);
  const mem = getMemstoreDataProviders(models);
  const ctx = new BaseContext(
    data,
    new NoopEmailProviderContext(),
    getFileProvider(appVariables),
    appVariables,
    mem,
    getLogicProviders(),
    getSemanticDataProviders(mem),
    () => connection.close()
  );

  await ingestDataIntoMemStore(ctx);
  return ctx;
}

async function insertWorkspace(
  context: BaseContextType,
  opts: SemanticDataAccessProviderMutationRunOptions
) {
  const companyName = faker.company.name();
  return await INTERNAL_createWorkspace(
    context,
    {
      name: companyName,
      rootname: makeRootnameFromName(companyName),
      description: 'For SDK tests',
    },
    SYSTEM_SESSION_AGENT,
    undefined,
    opts
  );
}

async function createAgentToken(
  context: BaseContextType,
  workspace: Workspace,
  opts: SemanticDataAccessProviderMutationRunOptions
) {
  const token = await internalCreateAgentToken(
    context,
    SYSTEM_SESSION_AGENT,
    workspace,
    {
      name: faker.lorem.words(2),
      description: 'Agent token for SDK tests',
    },
    opts
  );
  appAssert(token.workspaceId);
  const tokenStr = getPublicAgentToken(context, token).tokenStr;
  return {tokenStr, token};
}

export async function setupSDKTestReq() {
  const context = await setupContext();
  const {workspace, token, tokenStr} = await executeWithTxn(
    context,
    async opts => {
      const {workspace, adminPermissionGroup} = await insertWorkspace(
        context,
        opts
      );
      const {token, tokenStr} = await createAgentToken(
        context,
        workspace,
        opts
      );
      await addAssignedPermissionGroupList(
        context,
        SYSTEM_SESSION_AGENT,
        workspace.resourceId,
        [{permissionGroupId: adminPermissionGroup.resourceId}],
        token.resourceId,
        false, // don't delete existing assigned permission groups
        true, // skip permission groups check
        /** skip auth check */ true,
        opts
      );
      return {workspace, token, tokenStr};
    }
  );

  const consoleLogger = getConsoleLogger();
  consoleLogger.info(`Workspace ID: ${workspace.resourceId}`);
  consoleLogger.info(`Workspace rootname: ${workspace.rootname}`);
  consoleLogger.info(`Agent token ID: ${token.resourceId}`);
  consoleLogger.info(`Agent token token: ${tokenStr}`);
  await context.dispose();
}
