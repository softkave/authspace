import {PublicDataSchema} from '../../../definitions/dataSchema';
import {BaseContextType} from '../../contexts/types';
import {
  Endpoint,
  EndpointOptionalWorkspaceIDParam,
  PaginatedResult,
  PaginationQuery,
} from '../../types';

export interface GetWorkspaceDataSchemasEndpointParamsBase
  extends EndpointOptionalWorkspaceIDParam {}

export interface GetWorkspaceDataSchemasEndpointParams
  extends GetWorkspaceDataSchemasEndpointParamsBase,
    PaginationQuery {}

export interface GetWorkspaceDataSchemasEndpointResult extends PaginatedResult {
  schemas: PublicDataSchema[];
}

export type GetWorkspaceDataSchemasEndpoint = Endpoint<
  BaseContextType,
  GetWorkspaceDataSchemasEndpointParams,
  GetWorkspaceDataSchemasEndpointResult
>;
