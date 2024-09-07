import type { UserType } from 'core/features';
import type { PasswordLoginContext } from '../types';

export async function verifyPassword(
  ctx: PasswordLoginContext,
  user: UserType,
  password: string,
): Promise<boolean> {
  const passwordHash = ctx.driver.getPasswordHashFromUser(user);
  if (!passwordHash) return false;
  const validPassword = await ctx.verifyPassword(
    user as any,
    passwordHash,
    password,
  );
  if (!validPassword.success) return false;
  if (validPassword.needsRehash) {
    await ctx.driver.savePasswordHash(
      user.id,
      await ctx.hashPassword(user as any, password),
    );
  }

  return true;
}
