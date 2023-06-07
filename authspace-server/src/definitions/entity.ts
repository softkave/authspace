import {AnyObject} from '@/utils/types';
import {
  ConvertAgentToPublicAgent,
  PublicWorkspaceResource,
  WorkspaceResource,
} from './system';

export interface Entity extends WorkspaceResource {
  schemaId?: string;
  schemaVersion?: string | number;
  data: AnyObject;
}

export type PublicEntity = PublicWorkspaceResource &
  Pick<ConvertAgentToPublicAgent<Entity>, 'schemaId' | 'schemaVersion'>;
