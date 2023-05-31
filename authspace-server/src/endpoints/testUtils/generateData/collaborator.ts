import {Agent} from '../../../definitions/system';
import {assignWorkspaceToUser} from '../../assignedItems/addAssignedItems';
import {executeWithTxn} from '../../contexts/semantic/utils';
import {BaseContextType} from '../../contexts/types';
import {generateAndInsertUserListForTest} from './user';

export async function generateAndInsertCollaboratorListForTest(
  ctx: BaseContextType,
  agent: Agent,
  workspaceId: string,
  count = 20
) {
  const users = await generateAndInsertUserListForTest(ctx, count);
  await executeWithTxn(ctx, opts =>
    Promise.all(
      users.map(user =>
        assignWorkspaceToUser(ctx, agent, workspaceId, user.resourceId, opts)
      )
    )
  );
  return users;
}
