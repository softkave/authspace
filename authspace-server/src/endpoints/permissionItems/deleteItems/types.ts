import {PermissionItemPartRepresentation} from '../../../definitions/permissionItem';
import {BaseContextType} from '../../contexts/types';
import {LongRunningJobResult} from '../../jobs/types';
import {Endpoint, EndpointOptionalWorkspaceIDParam} from '../../types';

export type DeletePermissionItemInput = {
  target?: PermissionItemPartRepresentation;
  action?: PermissionItemPartRepresentation;
  entity?: PermissionItemPartRepresentation;
  grantAccess?: boolean;
};

export interface DeletePermissionItemsEndpointParams
  extends EndpointOptionalWorkspaceIDParam {
  items?: DeletePermissionItemInput[];
}

export type DeletePermissionItemsEndpoint = Endpoint<
  BaseContextType,
  DeletePermissionItemsEndpointParams,
  LongRunningJobResult
>;

export type DeletePermissionItemsCascadeFnsArgs = {
  workspaceId: string;
  permissionItemsIdList: string[];
};
