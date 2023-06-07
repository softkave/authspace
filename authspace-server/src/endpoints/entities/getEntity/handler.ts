import {validate} from '../../../utils/validate';
import {checkDataSchemaAuthorization02, dataSchemaExtractor} from '../utils';
import {GetDataSchemaEndpoint} from './types';
import {getDataSchemaJoiSchema} from './validation';

const getDataSchema: GetDataSchemaEndpoint = async (context, instData) => {
  const data = validate(instData.data, getDataSchemaJoiSchema);
  const agent = await context.session.getAgent(context, instData);
  const {schema} = await checkDataSchemaAuthorization02(
    context,
    agent,
    data.schemaId
  );
  return {schema: dataSchemaExtractor(schema)};
};

export default getDataSchema;
