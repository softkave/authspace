import {AssignedItemPartRepresentation} from '@/definitions/assignedItem';
import {BaseContextType} from '../../contexts/types';
import {Endpoint, EndpointOptionalWorkspaceIDParam} from '../../types';

export interface UnassignItemInput {
  assignee: AssignedItemPartRepresentation;
  assigned: AssignedItemPartRepresentation;
}

export interface UnassignEndpointParams
  extends EndpointOptionalWorkspaceIDParam {
  items: UnassignItemInput[];
}

export type UnassignEndpoint = Endpoint<
  BaseContextType,
  UnassignEndpointParams
>;
