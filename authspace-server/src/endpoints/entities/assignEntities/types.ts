import {BaseContextType} from '@/endpoints/contexts/types';
import {Endpoint} from '@/endpoints/types';

export type IAssignEntityInputItem = {
  assigneeEntityId: string;
  assignedEntityId: string;
  weight?: number;
};

export interface IAssignEntitiesEndpointParameters {
  workspaceId: string;
  items: IAssignEntityInputItem[];
}

export type AssignEntitiesEndpoint = Endpoint<
  BaseContextType,
  IAssignEntitiesEndpointParameters
>;
