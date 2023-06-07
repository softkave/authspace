import {Entity} from '@/definitions/entity';
import {BaseContextType} from '@/endpoints/contexts/types';
import {Endpoint} from '../../types';

export interface IGetEntityAssigneeListEndpointParameters {
  entityId: string;
}

// TODO: paginate?
export interface IGetEntityAssigneeListEndpointResult {
  entityList: Array<Entity>;
}

export type GetEntityAssigneeListEndpoint = Endpoint<
  BaseContextType,
  IGetEntityAssigneeListEndpointParameters,
  IGetEntityAssigneeListEndpointResult
>;
