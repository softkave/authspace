import {validate} from '../../../utils/validate';
import {getWorkspaceFromEndpointInput} from '../../workspaces/utils';
import {permissionGroupListExtractor} from '../utils';
import {GetAssigneeListEndpoint} from './types';
import {
  checkReadEntityAssignedPermissionGroups,
  fetchEntityAssignedPermissionGroupList,
} from './utils';
import {getAssigneeListJoiSchema} from './validation';

const getAssigneeList: GetAssigneeListEndpoint = async (context, instData) => {
  const data = validate(instData.data, getAssigneeListJoiSchema);
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

export default getAssigneeList;
