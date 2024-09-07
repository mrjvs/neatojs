import { ticketFeature } from 'core/features/ticket';
import type { VerifiedTicket } from 'core/ticket';
import type {
  SessionEntity,
  SessionTicketContext,
  SessionTicketOptions,
} from './types';
import { defaultExpiryInSeconds } from './utils/expiry';
import { fromAuthHeader, fromToken } from './parts/fromToken';
import { createSession } from './parts/create';

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
          async getUserSessionInfos(_userId: string): Promise<SessionEntity[]> {
            // TODO implement
            return [];
          },
          async getSessionInfoById(
            _sessionId: string,
          ): Promise<SessionEntity | null> {
            // TODO implement
            return null;
          },
          async removeExpiredSessions(): Promise<void> {
            // TODO implement
          },
          async removeSessionById(_sessionId: string): Promise<void> {
            // TODO implement
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
