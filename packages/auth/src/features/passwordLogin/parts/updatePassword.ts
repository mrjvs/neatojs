import { generateSecurityStamp } from 'core/generators';
import type { PasswordLoginContext } from '../types';

export async function unsafeForceUpdatePassword(
  ctx: PasswordLoginContext,
  userId: string,
  newPassword: string,
): Promise<void> {
  const user = await ctx.driver.getUser(userId);
  if (!user) throw new Error('Cannot find user');
  await ctx.driver.setUserSecurityStamp(user.id, generateSecurityStamp());
  await ctx.driver.savePasswordHash(
    user.id,
    await ctx.hashPassword(user as any, newPassword),
  );
}

export async function updatePassword(
  ctx: PasswordLoginContext,
  userId: string,
  oldPassword: string,
  newPassword: string,
): Promise<boolean> {
  const user = await ctx.driver.getUser(userId);
  if (!user) throw new Error('Cannot find user');

  const passwordHash = ctx.driver.getPasswordHashFromUser(user);
  if (!passwordHash) throw new Error('No existing password');
  const validPassword = await ctx.verifyPassword(
    user as any,
    passwordHash,
    oldPassword,
  );
  if (!validPassword.success) return false;

  await ctx.driver.setUserSecurityStamp(user.id, generateSecurityStamp());
  await ctx.driver.savePasswordHash(
    user.id,
    await ctx.hashPassword(user as any, newPassword),
  );
  return true;
}
