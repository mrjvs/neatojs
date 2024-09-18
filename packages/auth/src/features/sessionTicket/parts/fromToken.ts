import { createVerifiedTicket, type VerifiedTicket } from 'core/ticket';
import { getSessionIdFromToken } from '../utils/tokens';
import type { SessionTicketContext } from '../types';
import { makeExpiryDateFromNow } from '../utils/expiry';
import { isSessionValid } from '../utils/validity';

export async function fromAuthHeader(
  ctx: SessionTicketContext,
  header: string,
): Promise<VerifiedTicket | null> {
  const results = header.split(' ');
  const [type, token] = results;
  if (results.length !== 2) return null;
  if (type.toLowerCase() !== 'bearer') return null;
  if (typeof token !== 'string') return null;
  return fromToken(ctx, token);
}

export async function fromToken(
  ctx: SessionTicketContext,
  token: string,
): Promise<VerifiedTicket | null> {
  const sessionId = getSessionIdFromToken(ctx.secret, token);
  if (!sessionId) return null;

  const session = ctx.disableRollingSessions
    ? await ctx.driver.getSession(sessionId)
    : await ctx.driver.getSessionAndUpdateExpiry(
        sessionId,
        makeExpiryDateFromNow(ctx.expiryMs),
      );
  if (!session) return null;

  const user = await ctx.driver.getUser(session.userId);
  if (!user) return null;

  if (!isSessionValid(user, session)) return null;

  return createVerifiedTicket({
    userId: session.userId,
    securityStamp: session.securityStamp, // TODO add session id to ticket
    async updateSecurityStamp(newStamp) {
      await ctx.driver.updateSessionSecurityStamp(session.id, newStamp);
    },
  });
}
