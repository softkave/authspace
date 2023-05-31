import addDataSchemaEndpoint from './addSchema/handler';
import countWorkspaceDataSchemas from './countWorkspaceSchemas/handler';
import deleteDataSchema from './deleteSchema/handler';
import {
  addDataSchemaEndpointDefinition,
  countWorkspaceDataSchemasEndpointDefinition,
  deleteDataSchemaEndpointDefinition,
  getDataSchemaEndpointDefinition,
  getWorkspaceDataSchemasEndpointDefinition,
  updateDataSchemaEndpointDefinition,
} from './endpoints.mddoc';
import getDataSchema from './getSchema/handler';
import getWorkspaceDataSchemas from './getWorkspaceSchemas/handler';
import {DataSchemasExportedEndpoints} from './types';
import updateDataSchema from './updateSchema/handler';

export function getDataSchemaPublicHttpEndpoints() {
  const dataSchemasExportedEndpoints: DataSchemasExportedEndpoints = {
    addSchema: {
      fn: addDataSchemaEndpoint,
      mddocHttpDefinition: addDataSchemaEndpointDefinition,
    },
    deleteSchema: {
      fn: deleteDataSchema,
      mddocHttpDefinition: deleteDataSchemaEndpointDefinition,
    },
    getSchema: {
      fn: getDataSchema,
      mddocHttpDefinition: getDataSchemaEndpointDefinition,
    },
    getWorkspaceSchemas: {
      fn: getWorkspaceDataSchemas,
      mddocHttpDefinition: getWorkspaceDataSchemasEndpointDefinition,
    },
    countWorkspaceSchemas: {
      fn: countWorkspaceDataSchemas,
      mddocHttpDefinition: countWorkspaceDataSchemasEndpointDefinition,
    },
    updateSchema: {
      fn: updateDataSchema,
      mddocHttpDefinition: updateDataSchemaEndpointDefinition,
    },
  };
  return dataSchemasExportedEndpoints;
}
