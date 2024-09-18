import type { Database } from 'better-sqlite3';
import { knex } from 'knex';
import type {
  DriverBase,
  DriverTraits,
  TraitDisabledValue,
} from 'drivers/types';
import type { UserType } from 'core/features';
import type {
  SessionDriverTrait,
  SessionEntity,
} from 'features/sessionTicket/types';
import type { PasswordDriverTrait } from 'features/passwordLogin/types';

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
  const dbInstance = knex({ client: 'better-sqlite3', useNullAsDefault: true });
  const db = <TTable extends Record<never, never>>(table: string) =>
    dbInstance<TTable>(table).connection(ops.database);

  const base: DriverBase = {
    id: 'sqlite',
    async connect() {
      // todo: verify database connection
      // todo: check whether the table types are proper
      // sqlite is already connected since its file based
    },
    async getUser(userId) {
      const user = await db<UserType>(ops.userTable)
        .select()
        .where({ id: userId })
        .first();
      return user ?? null;
    },
    async setUserSecurityStamp(id, securityStamp) {
      await db<UserType>(ops.userTable).where({ id }).update({
        securityStamp,
      });
    },
  };

  let sessionTrait: SessionDriverTrait | undefined;
  if (ops.sessionTable) {
    const sessionTable = ops.sessionTable;
    sessionTrait = {
      async createSession(data) {
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
        const session = await db<SessionTable>(sessionTable)
          .where({ id })
          .first();
        return session ? mapSessionEntity(session) : null;
      },
      async updateSessionSecurityStamp(id, newStamp) {
        await db<SessionTable>(sessionTable).where({ id }).update({
          securityStamp: newStamp,
        });
      },
      async getSessionAndUpdateExpiry(id, expiry) {
        const updatedSessions = await db<SessionTable>(sessionTable)
          .where({ id })
          .andWhere('expiresAt', '>', new Date(Date.now()).getTime())
          .update({
            expiresAt: expiry.getTime(),
          })
          .returning('*');
        return updatedSessions[0] ? mapSessionEntity(updatedSessions[0]) : null;
      },
      async getUserSessions(userId) {
        const sessions = await db<SessionTable>(sessionTable)
          .where({ userId })
          .select();
        return sessions.map((session) => mapSessionEntity(session));
      },
      async removeExpiredSessions() {
        await db<SessionTable>(sessionTable)
          .where('expiresAt', '<=', new Date(Date.now()))
          .delete();
      },
      async removeSession(id) {
        await db<SessionTable>(sessionTable).where({ id }).delete();
      },
    };
  }

  let passwordTrait: PasswordDriverTrait | undefined;
  if (ops.passwordFields) {
    const passwordFields = ops.passwordFields;
    passwordTrait = {
      async getUserFromEmail(email) {
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
