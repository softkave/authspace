import {PermissionItemPartRepresentation} from '@/definitions/permissionItem';
import {BaseContextType} from '../../contexts/types';
import {Endpoint, EndpointOptionalWorkspaceIDParam} from '../../types';
import {PermissionItemInput} from '../types';

export interface AddPermissionItemInput {
  target: PermissionItemPartRepresentation;
  action: PermissionItemPartRepresentation;
  grantAccess: boolean;
}

export interface AddPermissionItemsEndpointParams
  extends EndpointOptionalWorkspaceIDParam {
  items: PermissionItemInput[];
}

export type AddPermissionItemsEndpoint = Endpoint<
  BaseContextType,
  AddPermissionItemsEndpointParams
>;
