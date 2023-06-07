import {DataSchemaViewMatcher} from '@/endpoints/dataSchemas/types';
import {PublicEntity} from '../../../definitions/entity';
import {BaseContextType} from '../../contexts/types';
import {Endpoint} from '../../types';

export interface GetEntityEndpointParams extends DataSchemaViewMatcher {
  entityId: string;
}

export interface GetEntityEndpointResult {
  entity: PublicEntity;
}

export type GetEntityEndpoint = Endpoint<
  BaseContextType,
  GetEntityEndpointParams,
  GetEntityEndpointResult
>;
