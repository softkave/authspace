import {
  PermissionItemPartRepresentation,
  PublicPermissionItem,
} from '../../../definitions/permissionItem';
import {BaseContextType} from '../../contexts/types';
import {Endpoint, EndpointOptionalWorkspaceIDParam} from '../../types';

export interface ResolveEntityPermissionItemInput {
  target?: PermissionItemPartRepresentation;
  action?: PermissionItemPartRepresentation;
  entity?: PermissionItemPartRepresentation;
}

export interface ResolvedPermissionItem
  extends ResolveEntityPermissionItemInput {
  hasAccess: boolean;
  permissionItem: PublicPermissionItem;
}

export interface ResolveEntityPermissionsEndpointParams
  extends EndpointOptionalWorkspaceIDParam {
  items: ResolveEntityPermissionItemInput[];
}

export interface ResolveEntityPermissionsEndpointResult {
  items: ResolvedPermissionItem[];
}

export type ResolveEntityPermissionsEndpoint = Endpoint<
  BaseContextType,
  ResolveEntityPermissionsEndpointParams,
  ResolveEntityPermissionsEndpointResult
>;
