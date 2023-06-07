import addDataSchemaEndpoint from './addEntity/handler';
import countWorkspaceDataSchemas from './countEntities/handler';
import deleteDataSchema from './deleteEntity/handler';
import {
  addDataSchemaEndpointDefinition,
  countWorkspaceDataSchemasEndpointDefinition,
  deleteDataSchemaEndpointDefinition,
  getDataSchemaEndpointDefinition,
  getWorkspaceDataSchemasEndpointDefinition,
  updateDataSchemaEndpointDefinition,
} from './endpoints.mddoc';
import getDataSchema from './getEntity/handler';
import getWorkspaceDataSchemas from './getEntityList/handler';
import {DataSchemasExportedEndpoints} from './types';
import updateDataSchema from './updateEntity/handler';

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
