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
} from './addEntity/types';
import {
  CountWorkspaceDataSchemasEndpoint,
  CountWorkspaceDataSchemasEndpointParams,
} from './countEntities/types';
import {
  DeleteDataSchemaEndpoint,
  DeleteDataSchemaEndpointParams,
} from './deleteEntity/types';
import {
  GetDataSchemaEndpoint,
  GetDataSchemaEndpointParams,
  GetDataSchemaEndpointResult,
} from './getEntity/types';
import {
  GetWorkspaceDataSchemasEndpoint,
  GetWorkspaceDataSchemasEndpointParams,
  GetWorkspaceDataSchemasEndpointResult,
} from './getEntityList/types';
import {
  UpdateDataSchemaEndpoint,
  UpdateDataSchemaEndpointParams,
  UpdateDataSchemaEndpointResult,
} from './updateEntity/types';

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
