import { randomUUID } from 'node:crypto';
import { ticketFeature } from 'core/features/ticket';
import type { VerifiedTicket } from 'core/ticket';
import { assertVerifiedTicket, createVerifiedTicket } from 'core/ticket';
import type { DriverBase } from 'drivers/types';

const defaultExpiryInSeconds = 60 * 60 * 24 * 7; // a week

export type SessionEntity = {
  id: string;
  userId: string;
  securityStamp: string;
  expiresAt: Date;
  createdAt: Date;
};

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
  disableRollingSessions: boolean;
  expiryInSeconds?: number | undefined | null;
};

export type Session = {
  token: string;
  userId: string;
  id: string;
};

function createSessionToken(session: SessionEntity): string {
  return session.id; // TODO implement
}

function getSessionIdFromToken(token: string): string {
  return token; // TODO implement
}

export function sessionTicket(ops: SessionTicketOptions) {
  const expiryMs = (ops.expiryInSeconds ?? defaultExpiryInSeconds) * 1000;
  return ticketFeature({
    id: 'session',
    expose: {
      async getSessionFromToken(token: string): Promise<SessionEntity> {
        const sessionId = getSessionIdFromToken(token);
        const session = await ops.driver.getSession(sessionId);
        if (!session) throw new Error('session not found');
        return session;
      },
      async readFromSessionToken(
        token: string,
      ): Promise<VerifiedTicket | null> {
        const sessionId = getSessionIdFromToken(token);
        const session = await ops.driver.getSession(sessionId);
        if (!session) return null;
        const user = await ops.driver.getUser(session.userId);
        if (!user) return null;

        return createVerifiedTicket({
          userId: session.userId,
          user,
        });
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
          token: createSessionToken(newSession),
          id: newSession.id,
          userId: newSession.userId,
        };
      },
    },
  });
}
