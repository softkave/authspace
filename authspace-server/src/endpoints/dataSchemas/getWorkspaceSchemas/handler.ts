import {validate} from '../../../utils/validate';
import {
  applyDefaultEndpointPaginationOptions,
  getEndpointPageFromInput,
} from '../../utils';
import {getWorkspaceFromEndpointInput} from '../../workspaces/utils';
import {dataSchemaExtractor} from '../utils';
import {GetWorkspaceDataSchemasEndpoint} from './types';
import {getWorkspaceDataSchemasQuery} from './utils';
import {getWorkspaceDataSchemaJoiSchema} from './validation';

const getWorkspaceDataSchemas: GetWorkspaceDataSchemasEndpoint = async (
  context,
  instData
) => {
  const data = validate(instData.data, getWorkspaceDataSchemaJoiSchema);
  const agent = await context.session.getAgent(context, instData);
  const {workspace} = await getWorkspaceFromEndpointInput(context, agent, data);
  const q = await getWorkspaceDataSchemasQuery(context, agent, workspace);
  applyDefaultEndpointPaginationOptions(data);
  const schemas = await context.semantic.dataSchema.getManyByWorkspaceAndIdList(
    q,
    data
  );
  return {
    page: getEndpointPageFromInput(data),
    schemas: schemas.map(schema => dataSchemaExtractor(schema)),
  };
};

export default getWorkspaceDataSchemas;
