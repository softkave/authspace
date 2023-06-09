import {faker} from '@faker-js/faker';
import {ActionAgent, AppResourceType} from '../../../definitions/system';
import {UsageRecordCategory} from '../../../definitions/usageRecord';
import {Workspace, WorkspaceBillStatus} from '../../../definitions/workspace';
import {getTimestamp} from '../../../utils/dateFns';
import {getNewIdForResource} from '../../../utils/resource';
import {executeWithTxn} from '../../contexts/semantic/utils';
import {BaseContextType} from '../../contexts/types';
import {usageRecordConstants} from '../../usageRecords/constants';
import {transformUsageThresholInput} from '../../workspaces/addWorkspace/internalCreateWorkspace';
import {NewWorkspaceInput} from '../../workspaces/addWorkspace/types';
import {makeRootnameFromName} from '../../workspaces/utils';

export function generateTestUsageThresholdInputMap(
  threshold = usageRecordConstants.defaultTotalThresholdInUSD
): Required<NewWorkspaceInput>['usageThresholds'] {
  return {
    [UsageRecordCategory.Storage]: {
      category: UsageRecordCategory.Storage,
      budget: threshold,
    },
    // [UsageRecordCategory.Request]: {
    //   category: UsageRecordCategory.Request,
    //   budget: threshold,
    // },
    [UsageRecordCategory.BandwidthIn]: {
      category: UsageRecordCategory.BandwidthIn,
      budget: threshold,
    },
    [UsageRecordCategory.BandwidthOut]: {
      category: UsageRecordCategory.BandwidthOut,
      budget: threshold,
    },
    // [UsageRecordCategory.DatabaseObject]: {
    //   category: UsageRecordCategory.DatabaseObject,
    //   budget: threshold,
    // },
    [UsageRecordCategory.Total]: {
      category: UsageRecordCategory.Total,
      budget: threshold * Object.keys(UsageRecordCategory).length,
    },
  };
}

export function generateTestWorkspace(seed: Partial<Workspace> = {}) {
  const createdAt = getTimestamp();
  const createdBy: ActionAgent = {
    agentId: getNewIdForResource(AppResourceType.User),
    agentType: AppResourceType.User,
    agentTokenId: getNewIdForResource(AppResourceType.AgentToken),
  };
  const name = faker.company.name();
  const resourceId = getNewIdForResource(AppResourceType.Workspace);
  const workspace: Workspace = {
    createdAt,
    createdBy,
    name,
    resourceId,
    lastUpdatedAt: createdAt,
    lastUpdatedBy: createdBy,
    workspaceId: resourceId,
    rootname: makeRootnameFromName(name),
    description: faker.lorem.sentence(),
    billStatus: WorkspaceBillStatus.Ok,
    billStatusAssignedAt: createdAt,
    usageThresholds: transformUsageThresholInput(
      createdBy,
      generateTestUsageThresholdInputMap()
    ),
    usageThresholdLocks: {},
    publicPermissionGroupId: getNewIdForResource(
      AppResourceType.PermissionGroup
    ),
    ...seed,
  };
  return workspace;
}

export function generateWorkspaceListForTest(
  count = 20,
  seed: Partial<Workspace> = {}
) {
  const workspaces: Workspace[] = [];
  for (let i = 0; i < count; i++) {
    workspaces.push(generateTestWorkspace());
  }
  return workspaces;
}

export async function generateAndInsertWorkspaceListForTest(
  ctx: BaseContextType,
  count = 20,
  extra: Partial<Workspace> = {}
) {
  const items = generateWorkspaceListForTest(count, extra);
  await executeWithTxn(ctx, async opts =>
    ctx.semantic.workspace.insertItem(items, opts)
  );
  return items;
}
