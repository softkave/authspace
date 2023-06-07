import {
  AssignedItem,
  AssignedItemPartRepresentation,
} from '@/definitions/assignedItem';
import {BaseContextType} from '../../contexts/types';
import {Endpoint, EndpointOptionalWorkspaceIDParam} from '../../types';

export interface GetAssigneeListEndpointParamsBase
  extends EndpointOptionalWorkspaceIDParam {
  assigned: AssignedItemPartRepresentation;
}

export interface GetAssigneeListEndpointParams
  extends GetAssigneeListEndpointParamsBase {}

export interface GetAssigneeListEndpointResult {
  assigneeList: AssignedItem[];
}

export type GetAssigneeListEndpoint = Endpoint<
  BaseContextType,
  GetAssigneeListEndpointParams,
  GetAssigneeListEndpointResult
>;
