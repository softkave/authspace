import {BaseContextType} from '../../contexts/types';
import {CountItemsEndpointResult, Endpoint} from '../../types';
import {GetWorkspaceDataSchemasEndpointParamsBase} from '../getWorkspaceSchemas/types';

export type CountWorkspaceDataSchemasEndpointParams =
  GetWorkspaceDataSchemasEndpointParamsBase;

export type CountWorkspaceDataSchemasEndpoint = Endpoint<
  BaseContextType,
  CountWorkspaceDataSchemasEndpointParams,
  CountItemsEndpointResult
>;
