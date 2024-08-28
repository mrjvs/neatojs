import type { DriverBase } from './types.js';

export type SqliteDriverOptions = {
  path?: string;
};

export function sqliteDriver(ops: SqliteDriverOptions): DriverBase {
  const _defaultedPath = ops.path ?? './auth.db';
  return {
    id: 'sqlite',
    async connect() {
      throw new Error('tried to connect to sqlite');
    },
    async getUser(_userId) {
      throw new Error('User getting not implemented');
    },
  };
}
