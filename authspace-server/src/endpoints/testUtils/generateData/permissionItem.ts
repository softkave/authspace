import {faker} from '@faker-js/faker';
import {
  PermissionItem,
  PermissionItemAppliesTo,
} from '../../../definitions/permissionItem';
import {ActionAgent, AppResourceType} from '../../../definitions/system';
import {getTimestamp} from '../../../utils/dateFns';
import {
  getNewIdForResource,
  getResourceTypeFromId,
} from '../../../utils/resource';
import {executeWithTxn} from '../../contexts/semantic/utils';
import {BaseContextType} from '../../contexts/types';
import {randomAction, randomResourceType} from './utils';

export function generatePermissionItemForTest(
  seed: Partial<PermissionItem> = {}
) {
  const createdAt = getTimestamp();
  const createdBy: ActionAgent = {
    agentId: getNewIdForResource(AppResourceType.User),
    agentType: AppResourceType.User,
    agentTokenId: getNewIdForResource(AppResourceType.AgentToken),
  };
  const workspaceId = getNewIdForResource(AppResourceType.Workspace);
  const itemType = randomResourceType();
  const item: PermissionItem = {
    createdAt,
    createdBy,
    workspaceId,
    lastUpdatedAt: createdAt,
    lastUpdatedBy: createdBy,
    targetParentId: workspaceId,
    targetParentType: AppResourceType.Workspace,
    resourceId: getNewIdForResource(AppResourceType.PermissionItem),
    entityId: createdBy.agentId,
    entityType: seed.entityId
      ? getResourceTypeFromId(seed.entityId)
      : AppResourceType.User,
    targetId: getNewIdForResource(itemType),
    targetType: seed.targetId ? getResourceTypeFromId(seed.targetId) : itemType,
    action: randomAction(),
    grantAccess: faker.datatype.boolean(),
    appliesTo: PermissionItemAppliesTo.SelfAndChildrenOfType,
    ...seed,
  };
  return item;
}

export function generatePermissionItemListForTest(
  count = 20,
  seed: Partial<PermissionItem> = {}
) {
  const items: PermissionItem[] = [];
  for (let i = 0; i < count; i++) {
    items.push(generatePermissionItemForTest(seed));
  }
  return items;
}

export async function generateAndInsertPermissionItemListForTest(
  ctx: BaseContextType,
  count = 20,
  seed: Partial<PermissionItem> = {}
) {
  const items = generatePermissionItemListForTest(count, seed);
  await executeWithTxn(ctx, async opts =>
    ctx.semantic.permissionItem.insertItem(items, opts)
  );
  return items;
}
