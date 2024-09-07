import type { Ticket } from 'core/ticket';
import { createVerifiedTicket } from 'core/ticket';
import type { PasswordLoginContext } from '../types';

export type PasswordLoginInput = {
  email: string;
  password: string;
};

export async function login(
  ctx: PasswordLoginContext,
  input: PasswordLoginInput,
): Promise<Ticket | null> {
  const user = await ctx.driver.getUserFromEmail(input.email);
  if (!user) return null;

  const passwordHash = ctx.driver.getPasswordHashFromUser(user);
  if (!passwordHash) return null;
  const validPassword = await ctx.verifyPassword(
    user,
    passwordHash,
    input.password,
  );
  if (!validPassword.success) return null;
  if (validPassword.needsRehash) {
    await ctx.driver.savePasswordHash(
      user.id,
      await ctx.hashPassword(user, input.password),
    );
  }

  // TODO only create verified ticket if no MFA
  return createVerifiedTicket({
    userId: user.id,
    securityStamp: user.securityStamp,
  });
}
