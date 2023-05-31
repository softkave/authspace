import {validate} from '../../../utils/validate';
import {getWorkspaceFromEndpointInput} from '../../workspaces/utils';
import {getWorkspaceDataSchemasQuery} from '../getWorkspaceSchemas/utils';
import {CountWorkspaceDataSchemasEndpoint} from './types';
import {countWorkspaceDataSchemaJoiSchema} from './validation';

const countWorkspaceDataSchemas: CountWorkspaceDataSchemasEndpoint = async (
  context,
  instData
) => {
  const data = validate(instData.data, countWorkspaceDataSchemaJoiSchema);
  const agent = await context.session.getAgent(context, instData);
  const {workspace} = await getWorkspaceFromEndpointInput(context, agent, data);
  const q = await getWorkspaceDataSchemasQuery(context, agent, workspace);
  const count = await context.semantic.dataSchema.countManyByWorkspaceAndIdList(
    q
  );
  return {count};
};

export default countWorkspaceDataSchemas;
