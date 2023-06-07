import {
  PermissionItemPartRepresentation,
  PublicPermissionItem,
} from '../../../definitions/permissionItem';
import {BaseContextType} from '../../contexts/types';
import {
  Endpoint,
  EndpointOptionalWorkspaceIDParam,
  PaginatedResult,
} from '../../types';

export interface GetPermissionItemsEndpointParamsBase
  extends EndpointOptionalWorkspaceIDParam {
  target?: PermissionItemPartRepresentation;
  action?: PermissionItemPartRepresentation;
  entity?: PermissionItemPartRepresentation;
  grantAccess?: boolean;
}

export interface GetPermissionItemsEndpointParams
  extends GetPermissionItemsEndpointParamsBase {}

export interface GetPermissionItemsEndpointResult extends PaginatedResult {
  items: PublicPermissionItem[];
}

export type GetPermissionItemsEndpoint = Endpoint<
  BaseContextType,
  GetPermissionItemsEndpointParams,
  GetPermissionItemsEndpointResult
>;
