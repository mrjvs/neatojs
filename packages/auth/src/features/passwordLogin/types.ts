import type { GuardFeatureContext, UserType } from 'core/features';
import type { DriverBase } from 'drivers/types';
import type { VerifyPasswordResult } from './utils/hashing';

export type PasswordDriverTrait = {
  getUserFromEmail: (email: string) => Promise<UserType | null>;
  getPasswordHashFromUser: (user: UserType) => string | null;
  savePasswordHash: (userId: string, hash: string) => Promise<void>;
};

export type PasswordLoginOptions = {
  driver: DriverBase & PasswordDriverTrait;
  hashing?:
    | {
        verifyPassword: <TUser = UserType>(
          user: TUser,
          passwordHash: string,
          password: string,
        ) => Promise<VerifyPasswordResult>;
        hashPassword: <TUser = UserType>(
          user: TUser,
          password: string,
        ) => Promise<string>;
      }
    | undefined
    | null;
};

export type PasswordLoginContext = {
  ctx: GuardFeatureContext;
  driver: DriverBase & PasswordDriverTrait;
  verifyPassword: <TUser = UserType>(
    user: TUser,
    passwordHash: string,
    password: string,
  ) => Promise<VerifyPasswordResult>;
  hashPassword: <TUser = UserType>(
    user: TUser,
    password: string,
  ) => Promise<string>;
};
