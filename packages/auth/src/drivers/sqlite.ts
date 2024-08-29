import type { SessionDriverTrait } from 'features/sessionTicket.js';
import type { DriverBase, MaybeTrait, TraitDisabledValue } from './types.js';

export type SqliteDriverSessionOptions = string;

export type SqliteDriverOptions<
  TSessionOps extends
    | SqliteDriverSessionOptions
    | TraitDisabledValue = undefined,
> = {
  path?: string;
  userTable: string;
  sessionTable?: TSessionOps;
} & (TSessionOps extends TraitDisabledValue
  ? { sessionTable?: TraitDisabledValue }
  : { sessionTable: SqliteDriverSessionOptions });

export type SqliteDriver<
  TOps extends SqliteDriverOptions<TSessionOps>,
  TSessionOps extends SqliteDriverSessionOptions | TraitDisabledValue,
> = DriverBase & MaybeTrait<TOps['sessionTable'], SessionDriverTrait>;

export function sqliteDriver<
  TOps extends SqliteDriverOptions<TSessionOps>,
  TSessionOps extends SqliteDriverSessionOptions | TraitDisabledValue,
>(ops: TOps): SqliteDriver<TOps, TSessionOps> {
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
  } as SqliteDriver<TOps, TSessionOps>;
}

// should be `DriverBase`
const _plainDriver = sqliteDriver({
  userTable: 'users',
});

// should be `DriverBase & SessionDriverTrait`
const _sessionDriver = sqliteDriver({
  userTable: 'users',
  sessionTable: 'sessions',
});
