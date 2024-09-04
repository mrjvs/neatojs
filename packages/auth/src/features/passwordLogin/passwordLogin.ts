import type { UserType } from 'core/features';
import { loginFeature } from 'core/features/login';
import type { Ticket } from 'core/ticket';
import { createVerifiedTicket } from 'core/ticket';
import type { DriverBase } from 'drivers/types';
import type { VerifyPasswordResult } from './hashing';
import { hashPassword, verifyPassword } from './hashing';

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

export type PasswordLoginInput = {
  email: string;
  password: string;
};

// TODO password reset links
// TODO email verification
export function passwordLogin(ops: PasswordLoginOptions) {
  const populatedHashPassword = ops.hashing?.hashPassword ?? hashPassword;
  const populatedVerifyPasswordHash =
    ops.hashing?.verifyPassword ?? verifyPassword;

  return loginFeature({
    id: 'password',
    expose: {
      async verifyPassword(user: UserType, password: string): Promise<boolean> {
        // TODO should this rehash?
        const passwordHash = ops.driver.getPasswordHashFromUser(user);
        if (!passwordHash) return false;
        const validPassword = await populatedVerifyPasswordHash(
          user as any,
          passwordHash,
          password,
        );
        if (!validPassword.success) return false;
        return true;
      },
      async updatePassword(userId: string, newPassword: string): Promise<void> {
        // TODO should this check existing password?
        const user = await ops.driver.getUser(userId);
        if (!user) throw new Error('Cannot find user');
        await ops.driver.savePasswordHash(
          user.id,
          await populatedHashPassword(user as any, newPassword),
        );
      },
      async login(input: PasswordLoginInput): Promise<Ticket | null> {
        const user = await ops.driver.getUserFromEmail(input.email);
        if (!user) return null;

        const passwordHash = ops.driver.getPasswordHashFromUser(user);
        if (!passwordHash) return null;
        const validPassword = await populatedVerifyPasswordHash(
          user as any,
          passwordHash,
          input.password,
        );
        if (!validPassword.success) return null;
        if (validPassword.needsRehash) {
          await ops.driver.savePasswordHash(
            user.id,
            await populatedHashPassword(user as any, input.password),
          );
        }

        return createVerifiedTicket({
          userId: user.id,
          user,
        });
      },
    },
  });
}
