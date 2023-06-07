import {
  DataSchemaMatcher,
  DataSchemaViewMatcher,
} from '@/endpoints/dataSchemas/types';
import {PublicEntity} from '../../../definitions/entity';
import {BaseContextType} from '../../contexts/types';
import {Endpoint, PaginatedResult, PaginationQuery} from '../../types';

export interface GetWorkspaceEntitysEndpointParamsBase
  extends DataSchemaMatcher,
    DataSchemaViewMatcher {}

export interface GetWorkspaceEntitysEndpointParams
  extends GetWorkspaceEntitysEndpointParamsBase,
    PaginationQuery {}

export interface GetWorkspaceEntitysEndpointResult extends PaginatedResult {
  schemas: PublicEntity[];
}

export type GetWorkspaceEntitysEndpoint = Endpoint<
  BaseContextType,
  GetWorkspaceEntitysEndpointParams,
  GetWorkspaceEntitysEndpointResult
>;
