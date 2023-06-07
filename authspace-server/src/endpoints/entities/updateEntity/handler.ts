import {DataSchema} from '../../../definitions/dataSchema';
import {getTimestamp} from '../../../utils/dateFns';
import {getActionAgentFromSessionAgent} from '../../../utils/sessionUtils';
import {validate} from '../../../utils/validate';
import {executeWithTxn} from '../../contexts/semantic/utils';
import {
  checkDataSchemaAuthorization02,
  checkDataSchemaNameUniq,
  dataSchemaExtractor,
} from '../utils';
import {UpdateDataSchemaEndpoint} from './types';
import {updateDataSchemaJoiSchema} from './validation';

const updateDataSchema: UpdateDataSchemaEndpoint = async (
  context,
  instData
) => {
  const data = validate(instData.data, updateDataSchemaJoiSchema);
  const agent = await context.session.getAgent(context, instData);
  let {schema} = await checkDataSchemaAuthorization02(
    context,
    agent,
    data.schemaId
  );
  schema = await executeWithTxn(context, async opts => {
    const schemaUpdate: Partial<DataSchema> = {
      ...data.schema,
      lastUpdatedAt: getTimestamp(),
      lastUpdatedBy: getActionAgentFromSessionAgent(agent),
    };
    const isNameChanged =
      schemaUpdate.name &&
      schemaUpdate.name.toLowerCase() !== schema.name?.toLowerCase();
    await Promise.all([
      isNameChanged &&
        checkDataSchemaNameUniq(
          context,
          schema.workspaceId,
          schemaUpdate.name!,
          opts
        ),
      context.semantic.dataSchema.getAndUpdateOneById(
        schema.resourceId,
        schemaUpdate,
        opts
      ),
    ]);
    return schema;
  });

  return {schema: dataSchemaExtractor(schema)};
};

export default updateDataSchema;
