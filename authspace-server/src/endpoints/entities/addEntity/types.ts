import {PublicEntity} from '@/definitions/entity';
import {BaseContextType} from '@/endpoints/contexts/types';
import {DataSchemaMatcher} from '@/endpoints/dataSchemas/types';
import {Endpoint} from '@/endpoints/types';
import {AnyObject} from '@/utils/types';

export interface AddEntityEndpointParams extends DataSchemaMatcher {
  entity: AnyObject;
}

export interface AddEntityEndpointResult {
  entity: PublicEntity;
}

export type AddEntityEndpoint = Endpoint<
  BaseContextType,
  AddEntityEndpointParams,
  AddEntityEndpointResult
>;
