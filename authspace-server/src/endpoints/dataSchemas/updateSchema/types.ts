import {PublicDataSchema} from '../../../definitions/dataSchema';
import {BaseContextType} from '../../contexts/types';
import {Endpoint} from '../../types';
import {NewDataSchemaInput} from '../addSchema/types';

export type UpdateDataSchemaInput = Partial<NewDataSchemaInput>;

export interface UpdateDataSchemaEndpointParams {
  schemaId: string;
  schema: UpdateDataSchemaInput;
}

export interface UpdateDataSchemaEndpointResult {
  schema: PublicDataSchema;
}

export type UpdateDataSchemaEndpoint = Endpoint<
  BaseContextType,
  UpdateDataSchemaEndpointParams,
  UpdateDataSchemaEndpointResult
>;
