import {
  AppActionType,
  AppResourceType,
  SessionAgent,
} from '../../../definitions/system';
import {Workspace} from '../../../definitions/workspace';
import {checkAuthorization} from '../../contexts/authorizationChecks/checkAuthorizaton';
import {BaseContextType} from '../../contexts/types';
import {GetPermissionItemsEndpointParams} from './types';

export async function getPermissionItemsQuery(
  context: BaseContextType,
  agent: SessionAgent,
  workspace: Workspace,
  data: Pick<GetPermissionItemsEndpointParams, 'entityId'>
) {
  if (agent.agentId !== data.entityId) {
    await checkAuthorization({
      context,
      agent,
      workspace,
      workspaceId: workspace.resourceId,
      action: AppActionType.Read,
      targets: {targetType: AppResourceType.PermissionItem},
    });
  }
}
