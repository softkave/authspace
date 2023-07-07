import {ConvertAgentToPublicAgent, WorkspaceResource} from './system';
import {UnknownType} from './types';

export type PermissionItemEntity = UnknownType;
export type PermissionItemAction = UnknownType;
export type PermissionItemTarget = UnknownType;

export interface PermissionItem extends WorkspaceResource {
  entity: PermissionItemEntity;
  action: PermissionItemAction;
  target: PermissionItemTarget;
  grantAccess: boolean;
}

export type PublicPermissionItem = ConvertAgentToPublicAgent<PermissionItem>;
