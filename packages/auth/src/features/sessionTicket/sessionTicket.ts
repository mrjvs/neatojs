import { ticketFeature } from 'core/features/ticket';
import type { VerifiedTicket } from 'core/ticket';
import type { SessionTicketContext, SessionTicketOptions } from './types';
import { defaultExpiryInSeconds } from './utils/expiry';
import { fromAuthHeader, fromToken } from './parts/fromToken';
import { createSession } from './parts/create';
import {
  getSessionInfoById,
  getUserSessionInfos,
  removeExpiredSessions,
  removeSessionById,
} from './parts/sessions';

export function sessionTicket(ops: SessionTicketOptions) {
  return ticketFeature({
    id: 'session',
    drivers: [ops.driver],
    builder: (ctx) => {
      const sessionContext: SessionTicketContext = {
        ctx,
        driver: ops.driver,
        disableRollingSessions: ops.disableRollingSessions ?? false,
        expiryMs: (ops.expiryInSeconds ?? defaultExpiryInSeconds) * 1000,
        secret:
          typeof ops.secret === 'string'
            ? {
                jwtSigning: ops.secret,
              }
            : ops.secret,
      };
      return {
        expose: {
          getUserSessionInfos(userId: string) {
            return getUserSessionInfos(sessionContext, userId);
          },
          getSessionInfoById(sessionId: string) {
            return getSessionInfoById(sessionContext, sessionId);
          },
          removeExpiredSessions() {
            return removeExpiredSessions(sessionContext);
          },
          removeSessionById(sessionId: string) {
            return removeSessionById(sessionContext, sessionId);
          },
          fromAuthHeader(header: string) {
            return fromAuthHeader(sessionContext, header);
          },
          fromToken(token: string) {
            return fromToken(sessionContext, token);
          },
          createSession(ticket: VerifiedTicket) {
            return createSession(sessionContext, ticket);
          },
        },
      };
    },
  });
}
