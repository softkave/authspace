import {AnyObject} from '@/utils/types';
import {PublicEntity} from '../../../definitions/entity';
import {BaseContextType} from '../../contexts/types';
import {Endpoint} from '../../types';

export interface UpdateEntityEndpointParams {
  entityId: string;
  entity: AnyObject;
}

export interface UpdateEntityEndpointResult {
  entity: PublicEntity;
}

export type UpdateEntityEndpoint = Endpoint<
  BaseContextType,
  UpdateEntityEndpointParams,
  UpdateEntityEndpointResult
>;
