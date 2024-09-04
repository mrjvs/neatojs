import { randomUUID } from 'node:crypto';
import { ticketFeature } from 'core/features/ticket';
import type { VerifiedTicket } from 'core/ticket';
import { assertVerifiedTicket, createVerifiedTicket } from 'core/ticket';
import type { DriverBase } from 'drivers/types';
import type { SessionEntity, SessionSecretOptions } from './types';
import { createSessionToken, getSessionIdFromToken } from './tokens';

const defaultExpiryInSeconds = 60 * 60 * 24 * 7; // a week

export type SessionEntityCreate = {
  id: string;
  userId: string;
  expiresAt: Date;
  securityStamp: string;
};

export type SessionDriverTrait = {
  removeSession: (id: string) => Promise<void>;
  removeExpiredSessions: () => Promise<void>;
  createSession: (data: SessionEntityCreate) => Promise<SessionEntity>;
  getSession: (id: string) => Promise<SessionEntity | null>;
  getSessionAndUpdateExpiry: (
    id: string,
    expiry: Date,
  ) => Promise<SessionEntity | null>;
  getUserSessions: (userId: string) => Promise<SessionEntity[]>;
};

export type SessionTicketOptions = {
  driver: DriverBase & SessionDriverTrait;
  secret: string | SessionSecretOptions;
  disableRollingSessions?: boolean;
  expiryInSeconds?: number | undefined | null;
};

export type Session = {
  token: string;
  userId: string;
  id: string;
};

// TODO check security stamp before allowing session
// TODO check expiry before allowing session
export function sessionTicket(ops: SessionTicketOptions) {
  const expiryMs = (ops.expiryInSeconds ?? defaultExpiryInSeconds) * 1000;
  const secrets: SessionSecretOptions =
    typeof ops.secret === 'string'
      ? {
          jwtSigning: ops.secret,
        }
      : ops.secret;

  async function fromToken(token: string): Promise<VerifiedTicket | null> {
    const sessionId = getSessionIdFromToken(secrets, token);
    if (!sessionId) return null;

    const session = ops.disableRollingSessions
      ? await ops.driver.getSession(sessionId)
      : await ops.driver.getSessionAndUpdateExpiry(
          sessionId,
          new Date(Date.now() + expiryMs),
        );
    if (!session) return null;

    const user = await ops.driver.getUser(session.userId);
    if (!user) return null;

    return createVerifiedTicket({
      userId: session.userId,
      user,
    });
  }

  return ticketFeature({
    id: 'session',
    expose: {
      async getSessionFromToken(token: string): Promise<SessionEntity> {
        const sessionId = getSessionIdFromToken(secrets, token);
        if (!sessionId) throw new Error('session not found');

        const session = await ops.driver.getSession(sessionId);
        if (!session) throw new Error('session not found');

        return session;
      },
      async fromAuthHeader(header: string): Promise<VerifiedTicket | null> {
        const [type, token] = header.split(' ', 2);
        if (type.toLowerCase() !== 'bearer') return null;
        if (typeof token !== 'string') return null;
        return fromToken(token);
      },
      async fromToken(token: string): Promise<VerifiedTicket | null> {
        return fromToken(token);
      },
      async createSession(ticket: VerifiedTicket): Promise<Session> {
        assertVerifiedTicket(ticket);
        const newSession = await ops.driver.createSession({
          userId: ticket.userId,
          expiresAt: new Date(Date.now() + expiryMs),
          id: randomUUID(),
          securityStamp: ticket.user.securityStamp,
        });

        return {
          token: createSessionToken(secrets, newSession),
          id: newSession.id,
          userId: newSession.userId,
        };
      },
    },
  });
}
