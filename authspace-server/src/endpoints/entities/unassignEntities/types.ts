import {BaseContextType} from '@/endpoints/contexts/types';
import {Endpoint} from '../../types';

export type IUnassignEntityInputItem = {
  assigneeEntityId: string;
  assignedEntityId: string;
};

export interface IUnassignEntitiesEndpointParameters {
  workspaceId: string;
  items: IUnassignEntityInputItem[];
}

export type UnassignEntitiesEndpoint = Endpoint<
  BaseContextType,
  IUnassignEntitiesEndpointParameters
>;
