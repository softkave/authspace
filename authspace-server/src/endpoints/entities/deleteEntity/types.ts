import {BaseContextType} from '../../contexts/types';
import {LongRunningJobResult} from '../../jobs/types';
import {Endpoint} from '../../types';

export interface DeleteEntityEndpointParams {
  entityId: string;
}

export type DeleteEntityEndpoint = Endpoint<
  BaseContextType,
  DeleteEntityEndpointParams,
  LongRunningJobResult
>;
