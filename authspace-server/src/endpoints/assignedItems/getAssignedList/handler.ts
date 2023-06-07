import {validate} from '../../../utils/validate';
import {getWorkspaceFromEndpointInput} from '../../workspaces/utils';
import {permissionGroupListExtractor} from '../utils';
import {GetAssignedListEndpoint} from './types';
import {
  checkReadEntityAssignedPermissionGroups,
  fetchEntityAssignedPermissionGroupList,
} from './utils';
import {getAssignedListJoiSchema} from './validation';

const getAssignedList: GetAssignedListEndpoint = async (context, instData) => {
  const data = validate(instData.data, getAssignedListJoiSchema);
  const agent = await context.session.getAgent(context, instData);
  const {workspace} = await getWorkspaceFromEndpointInput(context, agent, data);
  await checkReadEntityAssignedPermissionGroups(
    context,
    agent,
    workspace,
    data.entityId
  );
  const result = await fetchEntityAssignedPermissionGroupList(
    context,
    data.entityId,
    data.includeInheritedPermissionGroups ?? false
  );
  return {
    permissionGroups: permissionGroupListExtractor(result.permissionGroups),
    immediateAssignedPermissionGroupsMeta:
      result.inheritanceMap[data.entityId]?.items ?? [],
  };
};

export default getAssignedList;
