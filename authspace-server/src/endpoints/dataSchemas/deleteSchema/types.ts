import {BaseContextType} from '../../contexts/types';
import {LongRunningJobResult} from '../../jobs/types';
import {Endpoint} from '../../types';

export interface DeleteDataSchemaEndpointParams {
  schemaId: string;
}

export type DeleteDataSchemaEndpoint = Endpoint<
  BaseContextType,
  DeleteDataSchemaEndpointParams,
  LongRunningJobResult
>;
