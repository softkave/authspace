import {
  PermissionItemAction,
  PermissionItemEntity,
  PermissionItemTarget,
} from 'src/definitions/permissionItem';
import {BaseContextType} from '../../contexts/types';
import {Endpoint, EndpointOptionalWorkspaceIDParam} from '../../types';
import {PermissionItemInput} from '../types';

export interface AddPermissionItemInput {
  entity: PermissionItemEntity;
  target: PermissionItemTarget;
  action: PermissionItemAction;
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
