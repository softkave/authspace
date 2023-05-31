import {DataSchema} from '../../../definitions/dataSchema';
import {Agent, AppResourceType} from '../../../definitions/system';
import {Workspace} from '../../../definitions/workspace';
import {newWorkspaceResource} from '../../../utils/resource';
import {SemanticDataAccessProviderMutationRunOptions} from '../../contexts/semantic/types';
import {BaseContextType} from '../../contexts/types';
import {checkDataSchemaNameUniq} from '../utils';
import {NewDataSchemaInput} from './types';

export const INTERNAL_createDataSchema = async (
  context: BaseContextType,
  agent: Agent,
  workspace: Workspace,
  data: NewDataSchemaInput,
  opts: SemanticDataAccessProviderMutationRunOptions
) => {
  const schema = newWorkspaceResource<DataSchema>(
    agent,
    AppResourceType.DataSchema,
    workspace.resourceId,
    data
  );
  await Promise.all([
    checkDataSchemaNameUniq(context, workspace.resourceId, data.name, opts),
    context.semantic.dataSchema.insertItem(schema, opts),
  ]);
  return schema;
};
