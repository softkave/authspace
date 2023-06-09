import {NotFoundError, ResourceExistsError} from '../endpoints/errors';
import {
  ChangePasswordError,
  InvalidCredentialsError,
  UserOnWaitlistError,
} from '../endpoints/users/errors';
import {appMessages} from './messages';

export const reuseableErrors = {
  workspace: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.workspace.notFound(id));
    },
  },
  entity: {
    notFound(id: string) {
      return new NotFoundError(appMessages.entity.notFound(id));
    },
  },
  user: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.user.notFound(id));
    },
    configNotFound(id?: string) {
      return new NotFoundError(appMessages.user.configNotFound(id));
    },
    changePassword() {
      return new ChangePasswordError();
    },
    userOnWaitlist() {
      return new UserOnWaitlistError();
    },
  },
  permissionGroup: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.permissionGroup.notFound(id));
    },
  },
  permissionItem: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.permissionItem.notFound(id));
    },
  },
  credentials: {
    invalidCredentials() {
      return new InvalidCredentialsError();
    },
  },
  collaborationRequest: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.collaborationRequest.notFound(id));
    },
  },
  folder: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.folder.notFound(id));
    },
  },
  tag: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.tag.notFound(id));
    },
  },
  usageRecord: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.usageRecord.notFound(id));
    },
  },
  file: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.file.notFound(id));
    },
  },
  appRuntimeState: {
    notFound() {
      return new NotFoundError(appMessages.appRuntimeState.notFound());
    },
  },
  agentToken: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.agentToken.notFound(id));
    },
    withIdExists(id?: string) {
      return new ResourceExistsError(appMessages.agentToken.withIdExists(id));
    },
  },
  dataSchema: {
    notFound(id?: string) {
      return new NotFoundError(appMessages.dataSchema.notFound(id));
    },
    exists() {
      return new ResourceExistsError(appMessages.dataSchema.exists());
    },
    existsWithName(name: string) {
      return new ResourceExistsError(
        appMessages.dataSchema.existsWithName(name)
      );
    },
  },
  common: {
    notImplemented() {
      return new Error(appMessages.common.notImplementedYet());
    },
    notFound(id?: string) {
      return new NotFoundError(appMessages.common.notFound(id));
    },
  },
};
