import {
  AssignedItem,
  AssignedItemPartRepresentation,
} from '@/definitions/assignedItem';
import {BaseContextType} from '../../contexts/types';
import {Endpoint, EndpointOptionalWorkspaceIDParam} from '../../types';

export interface GetAssignedListEndpointParamsBase
  extends EndpointOptionalWorkspaceIDParam {
  assignee: AssignedItemPartRepresentation;
  includeInheritedItems?: boolean;
}

export interface GetAssignedListEndpointParams
  extends GetAssignedListEndpointParamsBase {}

export interface GetAssignedListEndpointResult {
  assignedList: AssignedItem[];
  immediateAssignedIdList: string[];
}

export type GetAssignedListEndpoint = Endpoint<
  BaseContextType,
  GetAssignedListEndpointParams,
  GetAssignedListEndpointResult
>;
