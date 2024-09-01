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
    .insert([{ id: userIds[0] }, { id: userIds[1] }, { id: userIds[2] }]);
}
