import {DataSchemaItem, PublicDataSchema} from '@definitions/dataSchema';
import {BaseContextType} from '../../contexts/types';
import {Endpoint, EndpointOptionalWorkspaceIDParam} from '../../types';

export interface NewDataSchemaInput {
  name: string;
  description?: string;
  items: Array<DataSchemaItem>;
  multikeyUnique?: string[];
}

export interface AddDataSchemaEndpointParams
  extends EndpointOptionalWorkspaceIDParam {
  schema: NewDataSchemaInput;
}

export interface AddDataSchemaEndpointResult {
  schema: PublicDataSchema;
}

export type AddDataSchemaEndpoint = Endpoint<
  BaseContextType,
  AddDataSchemaEndpointParams,
  AddDataSchemaEndpointResult
>;
