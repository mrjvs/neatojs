import type { SessionDriverTrait } from 'features/sessionTicket.js';
import type { DriverBase, DriverTraits } from './types.js';

type SqliteDriverOptions = {
  path?: string;
  userTable: string;
  sessionTable?: string | undefined | false;
};

type SqliteDriverTraits = {
  sessionTable: SessionDriverTrait;
};

type SqliteDriver<T extends SqliteDriverOptions> = DriverTraits<
  SqliteDriverTraits,
  T,
  SqliteDriverOptions
>;

export function sqliteDriver<T extends SqliteDriverOptions>(
  ops: T,
): SqliteDriver<T> {
  const _defaultedPath = ops.path ?? './auth.db';
  const base: DriverBase = {
    id: 'sqlite',
    async connect() {
      throw new Error('tried to connect to sqlite');
    },
    async getUser(_userId) {
      throw new Error('User getting not implemented');
    },
  };

  let sessionTrait: SessionDriverTrait | undefined;
  if (ops.sessionTable) {
    sessionTrait = {
      createSession(_data) {
        throw new Error('not implemented');
      },
      getSession(_id) {
        throw new Error('not implemented');
      },
      getSessionAndUpdateExpiry(_id, _expiry) {
        throw new Error('not implemented');
      },
      getUserSessions(_userId) {
        throw new Error('not implemented');
      },
      removeExpiredSessions() {
        throw new Error('not implemented');
      },
      removeSession(_id) {
        throw new Error('not implemented');
      },
    };
  }

  return {
    ...base,
    ...sessionTrait,
  } as SqliteDriver<T>;
}
