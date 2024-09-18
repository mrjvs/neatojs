import type { GuardFeatureContext } from 'core/features';
import type { DriverBase } from 'drivers/types';

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

export type SessionSecretOptions = {
  jwtSigning: string;
};

export type SessionDriverTrait = {
  removeSession: (id: string) => Promise<void>;
  removeExpiredSessions: () => Promise<void>;
  createSession: (data: SessionEntityCreate) => Promise<SessionEntity>;
  updateSessionSecurityStamp: (id: string, newStamp: string) => Promise<void>;
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

export type SessionTicketContext = {
  ctx: GuardFeatureContext;
  expiryMs: number;
  driver: DriverBase & SessionDriverTrait;
  secret: SessionSecretOptions;
  disableRollingSessions: boolean;
};
