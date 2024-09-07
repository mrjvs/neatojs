import type { SessionEntity, SessionTicketContext } from '../types';
import { isSessionValid } from '../utils/validity';

export async function getUserSessionInfos(
  ctx: SessionTicketContext,
  userId: string,
): Promise<SessionEntity[]> {
  const user = await ctx.driver.getUser(userId);
  if (!user) return [];

  const sessions = await ctx.driver.getUserSessions(userId);
  return sessions.filter((v) => isSessionValid(user, v));
}

export async function getSessionInfoById(
  ctx: SessionTicketContext,
  sessionId: string,
): Promise<SessionEntity | null> {
  const session = await ctx.driver.getSession(sessionId);
  if (!session) return null;

  const user = await ctx.driver.getUser(session.userId);
  if (!user) return null;

  if (!isSessionValid(user, session)) return null;
  return session;
}

export async function removeExpiredSessions(
  ctx: SessionTicketContext,
): Promise<void> {
  await ctx.driver.removeExpiredSessions();
}

export async function removeSessionById(
  ctx: SessionTicketContext,
  sessionId: string,
): Promise<void> {
  await ctx.driver.removeSession(sessionId);
}
