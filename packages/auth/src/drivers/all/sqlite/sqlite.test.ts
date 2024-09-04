import { randomUUID } from 'node:crypto';
import SqliteDatabase from 'better-sqlite3';
import { knex } from 'knex';
import { testDriver } from '../__test__/drivertest';
import { sqliteDriver } from './sqlite';

describe('sqlite', () => {
  const ids: [string, string, string] = [
    randomUUID(),
    randomUUID(),
    randomUUID(),
  ];
  testDriver(async () => {
    const db = new SqliteDatabase(':memory:');
    const driver = sqliteDriver({
      database: db,
      userTable: 'users',
      sessionTable: 'sessions',
      passwordFields: {
        email: 'email',
        passwordHash: 'passwordHash',
      },
    });
    const dbInstance = knex({
      client: 'better-sqlite3',
      useNullAsDefault: true,
    });
    await createDBSchema(dbInstance, db, ids);
    return {
      driver,
    };
  }, ids);
});

async function createDBSchema(
  dbInstance: knex.Knex,
  db: SqliteDatabase.Database,
  userIds: [string, string, string],
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

  await dbInstance('users')
    .connection(db)
    .insert([
      { id: userIds[0], email: `${userIds[0]}@example.com` },
      { id: userIds[1], email: `${userIds[1]}@example.com` },
      { id: userIds[2], email: `${userIds[2]}@example.com` },
    ]);
}
