import {BaseContextType} from '../../contexts/types';
import {CountItemsEndpointResult, Endpoint} from '../../types';
import {GetWorkspaceEntitysEndpointParamsBase} from '../getEntityList/types';

export type CountWorkspaceEntitiesEndpointParams =
  GetWorkspaceEntitysEndpointParamsBase;

export type CountWorkspaceEntitiesEndpoint = Endpoint<
  BaseContextType,
  CountWorkspaceEntitiesEndpointParams,
  CountItemsEndpointResult
>;
