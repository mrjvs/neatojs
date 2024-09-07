import { randomUUID } from 'node:crypto';
import type { VerifiedTicket } from 'core/ticket';
import { assertVerifiedTicket } from 'core/ticket';
import type { SessionTicketContext } from '../types';
import { makeExpiryDateFromNow } from '../utils/expiry';
import { createSessionToken } from '../utils/tokens';

export type Session = {
  token: string;
  userId: string;
  id: string;
};

export async function createSession(
  ctx: SessionTicketContext,
  ticket: VerifiedTicket,
): Promise<Session> {
  assertVerifiedTicket(ticket);
  const newSession = await ctx.driver.createSession({
    userId: ticket.userId,
    expiresAt: makeExpiryDateFromNow(ctx.expiryMs),
    id: randomUUID(),
    securityStamp: ticket.securityStamp,
  });

  return {
    token: createSessionToken(ctx.secret, newSession),
    id: newSession.id,
    userId: newSession.userId,
  };
}
