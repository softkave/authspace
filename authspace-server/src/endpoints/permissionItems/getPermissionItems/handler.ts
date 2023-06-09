import {AppActionType} from '../../../definitions/system';
import {validate} from '../../../utils/validate';
import {
  applyDefaultEndpointPaginationOptions,
  getEndpointPageFromInput,
} from '../../utils';
import {getWorkspaceFromEndpointInput} from '../../workspaces/utils';
import {checkPermissionEntitiesExist} from '../checkPermissionArtifacts';
import {PermissionItemUtils} from '../utils';
import {GetPermissionItemsEndpoint} from './types';
import {getPermissionItemsQuery} from './utils';
import {getPermissionItemsJoiSchema} from './validation';

/**
 * TODO: Support returning a list of permissions an agent/entity can perform
 * TODO: Support returning all permission items belonging to an entity directly
 * or inherited
 */
const getPermissionItems: GetPermissionItemsEndpoint = async (
  context,
  instData
) => {
  const data = validate(instData.data, getPermissionItemsJoiSchema);
  const agent = await context.session.getAgent(context, instData);
  const {workspace} = await getWorkspaceFromEndpointInput(context, agent, data);
  await checkPermissionEntitiesExist(
    context,
    agent,
    workspace.resourceId,
    [data.entityId],
    AppActionType.Read
  );
  await getPermissionItemsQuery(context, agent, workspace, data);
  applyDefaultEndpointPaginationOptions(data);
  const items = await context.semantic.permissionItem.getManyByQuery(
    {entityId: data.entityId},
    data
  );
  return {
    page: getEndpointPageFromInput(data),
    items: PermissionItemUtils.extractPublicPermissionItemList(items),
  };
};

export default getPermissionItems;
