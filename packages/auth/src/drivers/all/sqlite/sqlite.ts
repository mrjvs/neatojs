import { randomUUID } from 'node:crypto';
import type { Database } from 'better-sqlite3';
import { knex } from 'knex';
import type {
  SessionDriverTrait,
  SessionEntity,
} from 'features/sessionTicket/sessionTicket';
import { logger } from 'core/logger';
import type {
  DriverBase,
  DriverTraits,
  TraitDisabledValue,
} from 'drivers/types';
import type { UserType } from 'core/features';

export type SqliteDriverOptions = {
  database: Database;
  userTable: string;
  sessionTable?: string | TraitDisabledValue;
};

type SqliteDriverTraits = {
  sessionTable: SessionDriverTrait;
};

export type SqliteDriver<T extends SqliteDriverOptions> = DriverTraits<
  SqliteDriverTraits,
  T,
  SqliteDriverOptions
>;

type SessionTable = {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
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
        .select(['id'])
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
            id: randomUUID(),
            createdAt: new Date(),
            expiresAt: new Date(), // TODO proper expiry
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
        // TODO only update if not expired already
        const updatedSessions = await db<SessionTable>(sessionTable)
          .where({ id })
          .update({
            expiresAt: expiry,
            createdAt: new Date(),
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

  return {
    ...base,
    ...sessionTrait,
  } as SqliteDriver<T>;
}

function mapSessionEntity(table: SessionTable): SessionEntity {
  return {
    id: table.id,
    userId: table.userId,
  };
}
