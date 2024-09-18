import { generateSecurityStamp } from 'core/generators';
import type { Ticket } from 'core/ticket';
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

export type UpdatePasswordOptions = {
  ticket?: Ticket;
  userId: string;
  oldPassword: string;
  newPassword: string;
};

export async function updatePassword(
  ctx: PasswordLoginContext,
  ops: UpdatePasswordOptions,
): Promise<boolean> {
  const user = await ctx.driver.getUser(ops.userId);
  if (!user) throw new Error('Cannot find user');

  const passwordHash = ctx.driver.getPasswordHashFromUser(user);
  if (!passwordHash) throw new Error('No existing password');
  const validPassword = await ctx.verifyPassword(
    user as any,
    passwordHash,
    ops.oldPassword,
  );
  if (!validPassword.success) return false;

  const newSecurityStamp = generateSecurityStamp();
  await ctx.driver.setUserSecurityStamp(user.id, newSecurityStamp);
  await ctx.driver.savePasswordHash(
    user.id,
    await ctx.hashPassword(user as any, ops.newPassword),
  );

  await ops.ticket?.updateSecurityStamp(newSecurityStamp);

  return true;
}
