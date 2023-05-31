import {endpointConstants} from '../constants';

export const dataSchemaConstants = {
  routes: {
    addSchema: `${endpointConstants.apiv1}/dataSchemas/addSchema`,
    deleteSchema: `${endpointConstants.apiv1}/dataSchemas/deleteSchema`,
    getWorkspaceSchemas: `${endpointConstants.apiv1}/dataSchemas/getWorkspaceSchemas`,
    countWorkspaceSchemas: `${endpointConstants.apiv1}/dataSchemas/countWorkspaceSchemas`,
    getSchema: `${endpointConstants.apiv1}/dataSchemas/getSchema`,
    updateSchema: `${endpointConstants.apiv1}/dataSchemas/updateSchema`,
  },
};
