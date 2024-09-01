import { ticketFeature } from 'core/features/ticket';
import type { VerifiedTicket } from 'core/ticket';
import { assertVerifiedTicket, createVerifiedTicket } from 'core/ticket';
import type { DriverBase } from 'drivers/types';

export type SessionEntity = {
  id: string;
  userId: string;
};

export type SessionEntityCreate = {
  userId: string;
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
