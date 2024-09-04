import type { Database } from 'better-sqlite3';
import { knex } from 'knex';
import type { SessionDriverTrait } from 'features/sessionTicket/sessionTicket';
import { logger } from 'core/logger';
import type {
  DriverBase,
  DriverTraits,
  TraitDisabledValue,
} from 'drivers/types';
import type { UserType } from 'core/features';
import type { PasswordDriverTrait } from 'features/passwordLogin/passwordLogin';
import type { SessionEntity } from 'features/sessionTicket/types';

export type SqliteDriverOptions = {
  database: Database;
  userTable: string;
  sessionTable?: string | TraitDisabledValue;
  passwordFields?:
    | {
        email: string;
        passwordHash: string;
      }
    | TraitDisabledValue;
};

type SqliteDriverTraits = {
  sessionTable: SessionDriverTrait;
  passwordFields: PasswordDriverTrait;
};

export type SqliteDriver<T extends SqliteDriverOptions> = DriverTraits<
  SqliteDriverTraits,
  T,
  SqliteDriverOptions
>;

type SessionTable = {
  id: string;
  userId: string;
  expiresAt: number;
  createdAt: number;
  securityStamp: string;
};

export function sqliteDriver<T extends SqliteDriverOptions>(
  ops: T,
): SqliteDriver<T> {
  const log = logger.child({ driver: 'sqlite' });
  log.debug('initializing sqlite driver');
  const dbInstance = knex({ client: 'better-sqlite3', useNullAsDefault: true });
  const db = <TTable extends Record<never, never>>(table: string) =>
    dbInstance<TTable>(table).connection(ops.database);

  const base: DriverBase = {
    id: 'sqlite',
    async connect() {
      log.debug('connecting to sqlite');
      // todo: verify database connection
      // todo: check whether the table types are proper
      // sqlite is already connected since its file based
    },
    async getUser(userId) {
      log.debug(`getting user with id: ${userId}`);
      const user = await db<UserType>(ops.userTable)
        .select()
        .where({ id: userId })
        .first();
      return user ?? null;
    },
  };

  let sessionTrait: SessionDriverTrait | undefined;
  if (ops.sessionTable) {
    const sessionTable = ops.sessionTable;
    sessionTrait = {
      async createSession(data) {
        log.debug(`creating session for user ${data.userId}`);
        const newSession = await db<SessionTable>(sessionTable)
          .insert({
            userId: data.userId,
            id: data.id,
            createdAt: new Date().getTime(),
            expiresAt: data.expiresAt.getTime(),
            securityStamp: data.securityStamp,
          })
          .returning('*');
        return mapSessionEntity(newSession[0]);
      },
      async getSession(id) {
        log.debug(`getting session with id: ${id}`);
        const session = await db<SessionTable>(sessionTable)
          .where({ id })
          .first();
        return session ? mapSessionEntity(session) : null;
      },
      async getSessionAndUpdateExpiry(id, expiry) {
        log.debug(`getting and updating session expiry for user: ${id}`);
        const updatedSessions = await db<SessionTable>(sessionTable)
          .where({ id })
          .andWhere('expiresAt', '>', new Date(Date.now()).getTime())
          .update({
            expiresAt: expiry.getTime(),
            id,
          })
          .returning('*');
        return updatedSessions[0] ? mapSessionEntity(updatedSessions[0]) : null;
      },
      async getUserSessions(userId) {
        log.debug(`getting all user sessions for user: ${userId}`);
        const sessions = await db<SessionTable>(sessionTable)
          .where({ userId })
          .select();
        return sessions.map((session) => mapSessionEntity(session));
      },
      async removeExpiredSessions() {
        log.debug(`removing expired sessions`);
        await db<SessionTable>(sessionTable)
          .where('expiresAt', '<=', new Date(Date.now()))
          .delete();
      },
      async removeSession(id) {
        log.debug(`removing session with id: ${id}`);
        await db<SessionTable>(sessionTable).where({ id }).delete();
      },
    };
  }

  let passwordTrait: PasswordDriverTrait | undefined;
  if (ops.passwordFields) {
    const passwordFields = ops.passwordFields;
    passwordTrait = {
      async getUserFromEmail(email) {
        log.debug(`getting user with email: ${email}`);
        const user = await db<UserType>(ops.userTable)
          .select()
          .where({ [passwordFields.email]: email })
          .first();
        return user ?? null;
      },
      async savePasswordHash(userId, hash) {
        await db<UserType>(ops.userTable)
          .where({ id: userId })
          .update({
            [passwordFields.passwordHash]: hash,
          });
      },
      getPasswordHashFromUser(user) {
        return (user as any)[passwordFields.passwordHash];
      },
    };
  }

  return {
    ...base,
    ...sessionTrait,
    ...passwordTrait,
  } as SqliteDriver<T>;
}

function mapSessionEntity(table: SessionTable): SessionEntity {
  return {
    id: table.id,
    userId: table.userId,
    createdAt: new Date(table.createdAt),
    expiresAt: new Date(table.expiresAt),
    securityStamp: table.securityStamp,
  };
}
