import {AnyObject} from '@/utils/types';
import {ConvertAgentToPublicAgent, WorkspaceResource} from './system';

export type PermissionItemPartRepresentation = string | number | AnyObject;

export interface PermissionItem extends WorkspaceResource {
  entity: PermissionItemPartRepresentation;
  action: PermissionItemPartRepresentation;
  target: PermissionItemPartRepresentation;
  grantAccess: boolean;
}

export type PublicPermissionItem = ConvertAgentToPublicAgent<PermissionItem>;
