import {validate} from '../../../utils/validate';
import {executeWithTxn} from '../../contexts/semantic/utils';
import {getWorkspaceFromEndpointInput} from '../../workspaces/utils';
import {dataSchemaExtractor} from '../utils';
import {AddDataSchemaEndpoint} from './types';
import {INTERNAL_createDataSchema} from './utils';
import {addDataSchemaJoiSchema} from './validation';

const addDataSchemaEndpoint: AddDataSchemaEndpoint = async (
  context,
  instData
) => {
  const data = validate(instData.data, addDataSchemaJoiSchema);
  const agent = await context.session.getAgent(context, instData);
  const {workspace} = await getWorkspaceFromEndpointInput(context, agent, data);
  const schema = await executeWithTxn(context, async opts => {
    return await INTERNAL_createDataSchema(
      context,
      agent,
      workspace,
      data.schema,
      opts
    );
  });
  return {schema: dataSchemaExtractor(context, schema)};
};

export default addDataSchemaEndpoint;
