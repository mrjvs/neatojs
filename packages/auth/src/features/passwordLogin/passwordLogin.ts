import type { UserType } from 'core/features';
import { loginFeature } from 'core/features/login';
import type { Ticket } from 'core/ticket';
import { createVerifiedTicket } from 'core/ticket';
import type { DriverBase } from 'drivers/types';

export type PasswordDriverTrait = {
  getUserFromEmail: (email: string) => Promise<UserType | null>;
  getPasswordHashFromUser: (user: UserType) => string | null;
  savePasswordHash: (userId: string, hash: string) => Promise<void>;
};

export type PasswordLoginOptions = {
  driver: DriverBase & PasswordDriverTrait;
};

export type PasswordLoginInput = {
  email: string;
  password: string;
};

function verifyPassword(_hash: string, _password: string): boolean {
  return true; // TODO implement
}

function hashPassword(password: string): string {
  return password; // TODO implement
}

export function passwordLogin(ops: PasswordLoginOptions) {
  return loginFeature({
    id: 'password',
    expose: {
      async verifyPassword(user: UserType, password: string): Promise<boolean> {
        const hash = ops.driver.getPasswordHashFromUser(user);
        if (!hash) return false;
        const validPassword = verifyPassword(hash, password);
        if (!validPassword) return false;
        return true;
      },
      async updatePassword(userId: string, newPassword: string): Promise<void> {
        const user = await ops.driver.getUser(userId);
        if (!user) throw new Error('Cannot find user');
        await ops.driver.savePasswordHash(user.id, hashPassword(newPassword));
      },
      async login(input: PasswordLoginInput): Promise<Ticket | null> {
        const user = await ops.driver.getUserFromEmail(input.email);
        if (!user) return null;

        const hash = ops.driver.getPasswordHashFromUser(user);
        if (!hash) return null;
        const validPassword = verifyPassword(hash, input.password);
        if (!validPassword) return null;

        return createVerifiedTicket({
          userId: user.id,
          user,
        });
      },
    },
  });
}
