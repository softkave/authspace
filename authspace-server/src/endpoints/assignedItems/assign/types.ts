import {AssignedItemPartRepresentation} from '@/definitions/assignedItem';
import {BaseContextType} from '../../contexts/types';
import {Endpoint, EndpointOptionalWorkspaceIDParam} from '../../types';

export interface AssignItemInput {
  assignee: AssignedItemPartRepresentation;
  assigned: AssignedItemPartRepresentation;
}

export interface AssignEndpointParams extends EndpointOptionalWorkspaceIDParam {
  items: AssignItemInput[];
}

export type AssignEndpoint = Endpoint<BaseContextType, AssignEndpointParams>;
