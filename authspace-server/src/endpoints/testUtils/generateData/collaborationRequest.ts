import {faker} from '@faker-js/faker';
import {
  CollaborationRequest,
  CollaborationRequestStatusType,
} from '../../../definitions/collaborationRequest';
import {ActionAgent, AppResourceType} from '../../../definitions/system';
import {getTimestamp} from '../../../utils/dateFns';
import {getNewIdForResource} from '../../../utils/resource';
import {executeWithTxn} from '../../contexts/semantic/utils';
import {BaseContextType} from '../../contexts/types';
import {
  GeneratePartialTestDataFn,
  defaultGeneratePartialTestDataFn,
  generateTestList,
} from './utils';

export function generateCollaborationRequestForTest(
  seed: Partial<CollaborationRequest> = {}
) {
  const createdAt = getTimestamp();
  const createdBy: ActionAgent = {
    agentId: getNewIdForResource(AppResourceType.User),
    agentType: AppResourceType.User,
    agentTokenId: getNewIdForResource(AppResourceType.AgentToken),
  };
  const item: CollaborationRequest = {
    createdAt,
    createdBy,
    lastUpdatedAt: createdAt,
    lastUpdatedBy: createdBy,
    resourceId: getNewIdForResource(AppResourceType.CollaborationRequest),
    workspaceName: faker.company.name(),
    workspaceId: getNewIdForResource(AppResourceType.Workspace),
    recipientEmail: faker.internet.email(),
    message: '',
    status: CollaborationRequestStatusType.Pending,
    statusDate: getTimestamp(),
    ...seed,
  };
  return item;
}

export function generateCollaborationRequestListForTest(
  count = 20,
  genPartial: GeneratePartialTestDataFn<CollaborationRequest> = defaultGeneratePartialTestDataFn
) {
  return generateTestList(
    () => generateCollaborationRequestForTest(),
    count,
    genPartial
  );
}

export async function generateAndInsertCollaborationRequestListForTest(
  ctx: BaseContextType,
  count = 20,
  genPartial: GeneratePartialTestDataFn<CollaborationRequest> = defaultGeneratePartialTestDataFn
) {
  const items = generateCollaborationRequestListForTest(count, genPartial);
  await executeWithTxn(ctx, async opts =>
    ctx.semantic.collaborationRequest.insertItem(items, opts)
  );
  return items;
}
