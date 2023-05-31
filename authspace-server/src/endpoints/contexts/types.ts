import {Request} from 'express';
import {Logger} from 'winston';
import {BaseTokenData} from '../../definitions/system';
import {AppVariables} from '../../resources/types';
import {SessionContextType} from './SessionContext';
import {JobDataProvider, ResourceDataProvider} from './data/types';
import {IEmailProviderContext} from './email/types';
import {PermissionsLogicProvider} from './logic/PermissionsLogicProvider';
import {
  AgentTokenMemStoreProviderType,
  AssignedItemMemStoreProviderType,
  CollaborationRequestMemStoreProviderType,
  PermissionGroupMemStoreProviderType,
  PermissionItemMemStoreProviderType,
  UserMemStoreProviderType,
  WorkspaceMemStoreProviderType,
} from './mem/types';
import {SemanticDataAccessAgentTokenProvider} from './semantic/agentToken/types';
import {SemanticDataAccessAssignedItemProvider} from './semantic/assignedItem/types';
import {SemanticDataAccessCollaborationRequestProvider} from './semantic/collaborationRequest/types';
import {SemanticDataAccessDataSchemaProvider} from './semantic/dataSchema/types';
import {SemanticDataAccessPermissionProviderType} from './semantic/permission/types';
import {SemanticDataAccessPermissionGroupProviderType} from './semantic/permissionGroup/types';
import {SemanticDataAccessPermissionItemProviderType} from './semantic/permissionItem/types';
import {SemanticDataAccessUserProviderType} from './semantic/user/types';
import {SemanticDataAccessUsersConfigProvider} from './semantic/usersConfig/types';
import {SemanticDataAccessWorkspaceProviderType} from './semantic/workspace/types';

export interface IServerRequest extends Request {
  // decoded JWT token using the expressJWT middleware
  auth?: BaseTokenData;
}

export interface BaseContextDataProviders {
  resource: ResourceDataProvider;
  job: JobDataProvider;
}

export interface BaseContextMemStoreProviders {
  agentToken: AgentTokenMemStoreProviderType;
  permissionItem: PermissionItemMemStoreProviderType;
  permissionGroup: PermissionGroupMemStoreProviderType;
  workspace: WorkspaceMemStoreProviderType;
  collaborationRequest: CollaborationRequestMemStoreProviderType;
  user: UserMemStoreProviderType;
  assignedItem: AssignedItemMemStoreProviderType;
}

export interface BaseContextLogicProviders {
  permissions: PermissionsLogicProvider;
}

export interface BaseContextSemanticDataProviders {
  permissions: SemanticDataAccessPermissionProviderType;
  workspace: SemanticDataAccessWorkspaceProviderType;
  permissionGroup: SemanticDataAccessPermissionGroupProviderType;
  permissionItem: SemanticDataAccessPermissionItemProviderType;
  assignedItem: SemanticDataAccessAssignedItemProvider;
  agentToken: SemanticDataAccessAgentTokenProvider;
  collaborationRequest: SemanticDataAccessCollaborationRequestProvider;
  user: SemanticDataAccessUserProviderType;
  dataSchema: SemanticDataAccessDataSchemaProvider;
  usersConfig: SemanticDataAccessUsersConfigProvider;
}

export interface BaseContextType<
  Data extends BaseContextDataProviders = BaseContextDataProviders,
  Email extends IEmailProviderContext = IEmailProviderContext,
  AppVars extends AppVariables = AppVariables,
  MemStore extends BaseContextMemStoreProviders = BaseContextMemStoreProviders,
  Logic extends BaseContextLogicProviders = BaseContextLogicProviders,
  SemanticData extends BaseContextSemanticDataProviders = BaseContextSemanticDataProviders
> {
  appVariables: AppVars;
  session: SessionContextType;
  data: Data;
  semantic: SemanticData;
  memstore: MemStore;
  logic: Logic;
  email: Email;
  clientLogger: Logger;
  init: () => Promise<void>;
  dispose: () => Promise<void>;
}
