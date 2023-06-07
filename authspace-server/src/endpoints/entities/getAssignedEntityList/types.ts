import {PublicEntity} from '@/definitions/entity';
import {BaseContextType} from '@/endpoints/contexts/types';
import {Endpoint} from '../../types';

export interface IGetAssignedEntityListEndpointParameters {
  entityId: string;
}

export interface IGetAssignedEntityListEndpointResult {
  entityList: Array<PublicEntity>;
}

export type GetAssignedEntityListEndpoint = Endpoint<
  BaseContextType,
  IGetAssignedEntityListEndpointParameters,
  IGetAssignedEntityListEndpointResult
>;
