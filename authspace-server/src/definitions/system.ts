import {AnyObject} from '../utils/types';
import {AgentToken} from './agentToken';
import {User} from './user';

export const CURRENT_TOKEN_VERSION = 1;

export enum TokenAccessScope {
  Login = 'login',
  ChangePassword = 'changePassword',
  ConfirmEmailAddress = 'confirmEmail',
}

export interface TokenSubjectDefault {
  id: string;
}

export interface BaseTokenData<
  Sub extends TokenSubjectDefault = TokenSubjectDefault
> {
  version: number;
  sub: Sub;
  iat: number;
  exp?: number;
}

export interface ActionAgent {
  agentId: string;

  /**
   * One of user token, program token, client token, system or public.
   */
  agentType: AppResourceType;
  agentTokenId: string;
}

export type PublicAgent = Pick<ActionAgent, 'agentId' | 'agentType'>;
export type ConvertAgentToPublicAgent<T> = {
  [K in keyof T]: NonNullable<T[K]> extends ActionAgent
    ? PublicAgent
    : NonNullable<T[K]> extends AnyObject
    ? ConvertAgentToPublicAgent<NonNullable<T[K]>>
    : T[K];
};

export interface SessionAgent extends ActionAgent {
  agentToken?: AgentToken;
  user?: User;
}

// TODO: separate data resources from symbolic resources (resources that are not
// saved in DB).
export enum AppResourceType {
  All = '*',
  System = 'system',
  Public = 'public',
  Workspace = 'workspace',
  CollaborationRequest = 'collaborationRequest',
  AgentToken = 'agentToken',
  PermissionGroup = 'permissionGroup',
  PermissionItem = 'permissionItem',
  User = 'user',
  AssignedItem = 'assignedItem',
  EndpointRequest = 'endpointRequest',
  Job = 'job',
  DataSchema = 'dataSchema',
  UsersConfig = 'usersConfig',
}

export const PERMISSION_AGENT_TYPES = [
  AppResourceType.AgentToken,
  AppResourceType.User,
  AppResourceType.Public,
];

export const PERMISSION_ENTITY_TYPES = [
  AppResourceType.User,
  AppResourceType.AgentToken,
  AppResourceType.PermissionGroup,
];

export const PERMISSION_CONTAINER_TYPES = [
  AppResourceType.Workspace,
  AppResourceType.Folder,
];

export function getWorkspaceResourceTypeList() {
  return [
    AppResourceType.All,
    AppResourceType.Workspace,
    AppResourceType.CollaborationRequest,
    AppResourceType.AgentToken,
    AppResourceType.PermissionGroup,
    AppResourceType.PermissionItem,
    AppResourceType.Folder,
    AppResourceType.File,
    AppResourceType.User,
    AppResourceType.Tag,
    AppResourceType.UsageRecord,
  ];
}

export const VALID_AGENT_TYPES = [
  AppResourceType.User,
  AppResourceType.AgentToken,
];

export enum AppActionType {
  All = '*',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',

  /** For assigning permission groups. */
  GrantPermission = 'grantPermission',
}

export function getWorkspaceActionList() {
  return [
    AppActionType.All,
    AppActionType.Create,
    AppActionType.Read,
    AppActionType.Update,
    AppActionType.Delete,
    AppActionType.GrantPermission,
  ];
}

export function getNonWorkspaceActionList() {
  return [
    AppActionType.All,
    AppActionType.Create,
    AppActionType.Read,
    AppActionType.Update,
    AppActionType.Delete,
  ];
}

export const APP_RESOURCE_TYPE_LIST = Object.values(AppResourceType);

export interface AppRuntimeState extends Resource {
  resourceId: string; // use APP_RUNTIME_STATE_DOC_ID
  isAppSetup: boolean;
  appWorkspaceId: string;
  appWorkspacesImageUploadPermissionGroupId: string;
  appUsersImageUploadPermissionGroupId: string;
}

export interface Resource {
  resourceId: string;
  createdAt: number;
  lastUpdatedAt: number;
}

export interface ResourceWrapper<T extends Resource = Resource> {
  resourceId: string;
  resourceType: AppResourceType;
  resource: T;
}

export interface WorkspaceResource extends Resource {
  workspaceId: string;
  providedResourceId?: string | null;
  lastUpdatedBy: ActionAgent;
  createdBy: ActionAgent;
}

export type PublicResource = ConvertAgentToPublicAgent<Resource>;
export type PublicWorkspaceResource =
  ConvertAgentToPublicAgent<WorkspaceResource>;
