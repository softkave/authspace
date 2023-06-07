import {validate} from '../../../utils/validate';
import {executeWithTxn} from '../../contexts/semantic/utils';
import {getWorkspaceFromEndpointInput} from '../../workspaces/utils';
import {entityExtractor} from '../utils';
import {AddEntityEndpoint} from './types';
import {INTERNAL_createEntity} from './utils';
import {addEntityJoiSchema} from './validation';

const addEntityEndpoint: AddEntityEndpoint = async (context, instData) => {
  const data = validate(instData.data, addEntityJoiSchema);
  const agent = await context.session.getAgent(context, instData);
  const {workspace} = await getWorkspaceFromEndpointInput(context, agent, data);
  const schema = await executeWithTxn(context, async opts => {
    return await INTERNAL_createEntity(
      context,
      agent,
      workspace,
      data.schema,
      opts
    );
  });
  return {schema: entityExtractor(context, schema)};
};

export default addEntityEndpoint;
