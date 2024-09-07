import SqliteDatabase from 'better-sqlite3';
import { knex } from 'knex';
import type { UserType } from 'core/features';
import type { PasswordDriverTrait } from 'features/passwordLogin/types';
import type { SessionDriverTrait } from 'features/sessionTicket/types';
import type { DriverBase } from '../../types';
import { sqliteDriver } from '../sqlite/sqlite';

export type MemoryDriver = DriverBase &
  PasswordDriverTrait &
  SessionDriverTrait & {
    createUser: (
      id: string,
      data?: { email?: string; stamp?: string },
    ) => Promise<UserType>;
  };

export function inMemoryDriver(): MemoryDriver {
  const db = new SqliteDatabase(':memory:');
  const knexInstance = knex({
    client: 'better-sqlite3',
    useNullAsDefault: true,
  });
  const driver = sqliteDriver({
    database: db,
    userTable: 'users',
    sessionTable: 'sessions',
    passwordFields: {
      email: 'email',
      passwordHash: 'passwordHash',
    },
  });
  let alreadyConnected = false;
  return {
    ...driver,
    async connect() {
      if (alreadyConnected) return;
      await driver.connect();
      await createSchema(knexInstance, db);
      alreadyConnected = true;
    },
    async createUser(id: string, data) {
      const result = await knexInstance<UserType & { email?: string }>('users')
        .connection(db)
        .insert([{ id, email: data?.email, securityStamp: data?.stamp }])
        .returning('*');
      if (!result[0]) throw new Error('Could not create user');
      return result[0];
    },
  };
}

async function createSchema(
  dbInstance: knex.Knex,
  db: SqliteDatabase.Database,
) {
  await dbInstance.schema.connection(db).createTable('users', (table) => {
    table.uuid('id', {
      primaryKey: true,
    });
    table.string('securityStamp');
    table.string('passwordHash');
    table.string('email');
  });

  await dbInstance.schema.connection(db).createTable('sessions', (table) => {
    table.uuid('id', {
      primaryKey: true,
    });
    table.string('userId');
    table.string('securityStamp');
    table.datetime('expiresAt');
    table.datetime('createdAt');
  });
}
