import {PublicUsersConfig} from '@definitions/user';
import {BaseContextType} from '../../contexts/types';
import {Endpoint} from '../../types';

export interface GetUsersConfigEndpointParams {
  configId: string;
}

export interface GetUsersConfigEndpointResult {
  config: PublicUsersConfig | null;
}

export type GetUsersConfigEndpoint = Endpoint<
  BaseContextType,
  GetUsersConfigEndpointParams,
  GetUsersConfigEndpointResult
>;
