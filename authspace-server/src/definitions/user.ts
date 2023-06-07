import {Resource} from './system';

export interface User extends Resource {
  hash: string;
}

export interface UserEmailInfo {
  email: string;
  isEmailVerified: boolean;
  emailVerifiedAt?: number | null;
  emailVerificationEmailSentAt?: number | null;
}

export interface UserPasswordInfo {
  passwordLastChangedAt: number;
  requiresPasswordChange?: boolean;
}

export interface UserWorkspace {
  workspaceId: string;
  joinedAt: number;
}

export type PublicUser = {};
