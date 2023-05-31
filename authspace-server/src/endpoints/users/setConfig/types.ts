import {PublicUsersConfig, UsersConfig} from '@definitions/user';
import {BaseContextType} from '../../contexts/types';
import {Endpoint, EndpointRequiredWorkspaceIDParam} from '../../types';

export type SetConfigEndpointParams = EndpointRequiredWorkspaceIDParam & {
  config: Partial<UsersConfig>;
};

export interface SetConfigEndpointResult {
  config: PublicUsersConfig;
}

export type SetConfigEndpoint = Endpoint<
  BaseContextType,
  SetConfigEndpointParams,
  SetConfigEndpointResult
>;
