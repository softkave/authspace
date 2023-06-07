import {LongRunningJobResult} from '../jobs/types';
import {
  CountItemsEndpointResult,
  ExportedHttpEndpointWithMddocDefinition,
  HttpEndpoint,
  HttpEndpointRequestHeaders_AuthRequired_ContentType,
  HttpEndpointResponseHeaders_ContentType_ContentLength,
} from '../types';
import {
  AddDataSchemaEndpoint,
  AddDataSchemaEndpointParams,
  AddDataSchemaEndpointResult,
} from './addSchema/types';
import {
  CountWorkspaceDataSchemasEndpoint,
  CountWorkspaceDataSchemasEndpointParams,
} from './countWorkspaceSchemas/types';
import {
  DeleteDataSchemaEndpoint,
  DeleteDataSchemaEndpointParams,
} from './deleteSchema/types';
import {
  GetDataSchemaEndpoint,
  GetDataSchemaEndpointParams,
  GetDataSchemaEndpointResult,
} from './getSchema/types';
import {
  GetWorkspaceDataSchemasEndpoint,
  GetWorkspaceDataSchemasEndpointParams,
  GetWorkspaceDataSchemasEndpointResult,
} from './getWorkspaceSchemas/types';
import {
  UpdateDataSchemaEndpoint,
  UpdateDataSchemaEndpointParams,
  UpdateDataSchemaEndpointResult,
} from './updateSchema/types';

export type AddDataSchemaHttpEndpoint = HttpEndpoint<
  AddDataSchemaEndpoint,
  AddDataSchemaEndpointParams,
  AddDataSchemaEndpointResult,
  HttpEndpointRequestHeaders_AuthRequired_ContentType,
  HttpEndpointResponseHeaders_ContentType_ContentLength
>;
export type DeleteDataSchemaHttpEndpoint = HttpEndpoint<
  DeleteDataSchemaEndpoint,
  DeleteDataSchemaEndpointParams,
  LongRunningJobResult,
  HttpEndpointRequestHeaders_AuthRequired_ContentType,
  HttpEndpointResponseHeaders_ContentType_ContentLength
>;
export type GetWorkspaceDataSchemasHttpEndpoint = HttpEndpoint<
  GetWorkspaceDataSchemasEndpoint,
  GetWorkspaceDataSchemasEndpointParams,
  GetWorkspaceDataSchemasEndpointResult,
  HttpEndpointRequestHeaders_AuthRequired_ContentType,
  HttpEndpointResponseHeaders_ContentType_ContentLength
>;
export type CountWorkspaceDataSchemasHttpEndpoint = HttpEndpoint<
  CountWorkspaceDataSchemasEndpoint,
  CountWorkspaceDataSchemasEndpointParams,
  CountItemsEndpointResult,
  HttpEndpointRequestHeaders_AuthRequired_ContentType,
  HttpEndpointResponseHeaders_ContentType_ContentLength
>;
export type GetDataSchemaHttpEndpoint = HttpEndpoint<
  GetDataSchemaEndpoint,
  GetDataSchemaEndpointParams,
  GetDataSchemaEndpointResult,
  HttpEndpointRequestHeaders_AuthRequired_ContentType,
  HttpEndpointResponseHeaders_ContentType_ContentLength
>;
export type UpdateDataSchemaHttpEndpoint = HttpEndpoint<
  UpdateDataSchemaEndpoint,
  UpdateDataSchemaEndpointParams,
  UpdateDataSchemaEndpointResult,
  HttpEndpointRequestHeaders_AuthRequired_ContentType,
  HttpEndpointResponseHeaders_ContentType_ContentLength
>;

export type DataSchemasExportedEndpoints = {
  addSchema: ExportedHttpEndpointWithMddocDefinition<AddDataSchemaHttpEndpoint>;
  deleteSchema: ExportedHttpEndpointWithMddocDefinition<DeleteDataSchemaHttpEndpoint>;
  getWorkspaceSchemas: ExportedHttpEndpointWithMddocDefinition<GetWorkspaceDataSchemasHttpEndpoint>;
  countWorkspaceSchemas: ExportedHttpEndpointWithMddocDefinition<CountWorkspaceDataSchemasHttpEndpoint>;
  getSchema: ExportedHttpEndpointWithMddocDefinition<GetDataSchemaHttpEndpoint>;
  updateSchema: ExportedHttpEndpointWithMddocDefinition<UpdateDataSchemaHttpEndpoint>;
};

export type DataSchemaMatcher = {
  schemaId?: string;
  schemaName?: string;
};

export type DataSchemaViewMatcher = {
  schemaViewId?: string;
  schemaViewName?: string;
};
