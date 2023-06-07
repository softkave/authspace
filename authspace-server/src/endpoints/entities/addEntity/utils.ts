import {Entity} from '../../../definitions/entity';
import {ActionAgent, AppResourceType} from '../../../definitions/system';
import {Workspace} from '../../../definitions/workspace';
import {newWorkspaceResource} from '../../../utils/resource';
import {SemanticDataAccessProviderMutationRunOptions} from '../../contexts/semantic/types';
import {BaseContextType} from '../../contexts/types';
import {checkEntityNameUniq} from '../utils';
import {NewEntityInput} from './types';

export const INTERNAL_createEntity = async (
  context: BaseContextType,
  agent: ActionAgent,
  workspace: Workspace,
  data: NewEntityInput,
  opts: SemanticDataAccessProviderMutationRunOptions
) => {
  const schema = newWorkspaceResource<Entity>(
    agent,
    AppResourceType.Entity,
    workspace.resourceId,
    data
  );
  await Promise.all([
    checkEntityNameUniq(context, workspace.resourceId, data.name, opts),
    context.semantic.entity.insertItem(schema, opts),
  ]);
  return schema;
};
