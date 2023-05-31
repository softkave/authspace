import {PublicDataSchema} from '../../../definitions/dataSchema';
import {BaseContextType} from '../../contexts/types';
import {Endpoint} from '../../types';

export interface GetDataSchemaEndpointParams {
  schemaId: string;
}

export interface GetDataSchemaEndpointResult {
  schema: PublicDataSchema;
}

export type GetDataSchemaEndpoint = Endpoint<
  BaseContextType,
  GetDataSchemaEndpointParams,
  GetDataSchemaEndpointResult
>;
