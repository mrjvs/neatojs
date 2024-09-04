import { randomUUID } from 'node:crypto';
import type { DriverBase } from 'drivers/types.js';
import type { SessionDriverTrait } from 'features/sessionTicket/sessionTicket.js';
import type { PasswordDriverTrait } from 'features/passwordLogin/passwordLogin';

export function testDriver(
  makeDb: () => Promise<{
    driver: DriverBase & SessionDriverTrait & PasswordDriverTrait;
  }>,
  userIds: [string, string, string],
) {
  const [userA, userB, userC] = userIds;
  describe('driver', async () => {
    let driver = (await makeDb()).driver;

    beforeEach(async () => {
      driver = (await makeDb()).driver;
    });

    it('should connect', () => {
      expect(async () => {
        await driver.connect();
      }).not.toThrowError();
    });

    it('should return user', async () => {
      const userEntityA = await driver.getUser(userIds[0]);
      expect(userEntityA).toBeTruthy();
      const userZ = await driver.getUser(randomUUID());
      expect(userZ).toBeFalsy();
    });
  });

  describe('session', async () => {
    let driver = (await makeDb()).driver;

    beforeEach(async () => {
      driver = (await makeDb()).driver;
    });

    it('should create a session', async () => {
      const expiry = new Date();
      const id = randomUUID();
      const stamp = '__stamp';
      const session = await driver.createSession({
        userId: userA,
        expiresAt: expiry,
        id,
        securityStamp: stamp,
      });
      expect(session).toBeTruthy();
      expect(session).toEqual({
        userId: userA,
        expiresAt: expiry,
        id,
        securityStamp: stamp,
        createdAt: session.createdAt,
      });
    });

    it('should find a session', async () => {
      const session = await driver.createSession({
        userId: userA,
        expiresAt: new Date(),
        id: randomUUID(),
        securityStamp: 'stamp',
      });
      const foundSession = await driver.getSession(session.id);
      expect(foundSession).toBeTruthy();
      if (!foundSession) throw new Error();
      expect(foundSession.id).toBe(session.id);
      expect(foundSession.userId).toBe(session.userId);
    });

    it('should not find invalid session', async () => {
      await driver.createSession({
        userId: userA,
        expiresAt: new Date(),
        id: randomUUID(),
        securityStamp: 'stamp',
      });
      const foundSession = await driver.getSession(randomUUID());
      expect(foundSession).toBeFalsy();
    });

    it('should update expiry', async () => {
      const newExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const session = await driver.createSession({
        userId: userA,
        expiresAt: new Date(Date.now() + 5000),
        id: randomUUID(),
        securityStamp: 'stamp',
      });
      const newSession = await driver.getSessionAndUpdateExpiry(
        session.id,
        newExpiry,
      );

      expect(newSession).toEqual({
        userId: session.userId,
        expiresAt: newExpiry,
        id: session.id,
        securityStamp: session.securityStamp,
        createdAt: session.createdAt,
      });
    });

    it('should not update expiry if not found', async () => {
      const session = await driver.createSession({
        userId: userA,
        expiresAt: new Date(Date.now() + 5000),
        id: randomUUID(),
        securityStamp: 'stamp',
      });
      const notFoundSession = await driver.getSessionAndUpdateExpiry(
        `${session.id}hi!`,
        new Date(Date.now() + 24 * 60 * 60 * 1000),
      );
      expect(notFoundSession).toEqual(null);
    });

    it('should not update expiry if already expired', async () => {
      const newExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const session = await driver.createSession({
        userId: userA,
        expiresAt: new Date(Date.now() - 1000),
        id: randomUUID(),
        securityStamp: 'stamp',
      });
      const expiredSession = await driver.getSessionAndUpdateExpiry(
        session.id,
        newExpiry,
      );
      expect(expiredSession).toEqual(null);
    });

    it('should remove session', async () => {
      const session = await driver.createSession({
        userId: userA,
        expiresAt: new Date(Date.now() - 1000),
        id: randomUUID(),
        securityStamp: 'stamp',
      });
      await driver.removeSession(session.id);
      const foundSession = await driver.getSession(session.id);
      expect(foundSession).toEqual(null);
    });

    it('should remove session', async () => {
      const session = await driver.createSession({
        userId: userA,
        expiresAt: new Date(Date.now() - 1000),
        id: randomUUID(),
        securityStamp: 'stamp',
      });
      await driver.removeSession(session.id);
      const foundSession = await driver.getSession(session.id);
      expect(foundSession).toEqual(null);
    });

    it('should remove expired sessions', async () => {
      const newSessionA = await driver.createSession({
        userId: userA,
        expiresAt: new Date(Date.now() - 1000),
        id: randomUUID(),
        securityStamp: 'stamp',
      });

      await driver.removeExpiredSessions();
      const sessionA = await driver.getSession(newSessionA.id);

      expect(sessionA).toEqual(null);
    });

    it('should not remove normal sessions', async () => {
      const newSessionA = await driver.createSession({
        userId: userA,
        expiresAt: new Date(Date.now() - 1000),
        id: randomUUID(),
        securityStamp: 'stamp',
      });
      const newSessionB = await driver.createSession({
        userId: userB,
        expiresAt: new Date(Date.now() + 25000),
        id: randomUUID(),
        securityStamp: 'stamp',
      });

      await driver.removeExpiredSessions();
      const sessionA = await driver.getSession(newSessionA.id);
      const sessionB = await driver.getSession(newSessionB.id);

      expect(sessionA).toEqual(null);
      expect(sessionB).toEqual(newSessionB);
    });

    it('should get all users sessions', async () => {
      const sessionA = await driver.createSession({
        userId: userA,
        expiresAt: new Date(),
        id: randomUUID(),
        securityStamp: 'stamp',
      });
      const sessionB = await driver.createSession({
        userId: userA,
        expiresAt: new Date(),
        id: randomUUID(),
        securityStamp: 'stamp',
      });
      const sessionC = await driver.createSession({
        userId: userB,
        expiresAt: new Date(),
        id: randomUUID(),
        securityStamp: 'stamp',
      });

      const sessionsA = (await driver.getUserSessions(userA)).map((v) => v.id);
      const sessionsB = (await driver.getUserSessions(userB)).map((v) => v.id);
      const sessionsC = (await driver.getUserSessions(userC)).map((v) => v.id);

      expect(sessionsA.length).toBe(2);
      expect(sessionsB.length).toBe(1);
      expect(sessionsC.length).toBe(0);
      expect(sessionsA.sort()).toStrictEqual([sessionA.id, sessionB.id].sort());
      expect(sessionsB.sort()).toStrictEqual([sessionC.id].sort());
    });
  });

  describe('password', async () => {
    let driver = (await makeDb()).driver;

    beforeEach(async () => {
      driver = (await makeDb()).driver;
    });

    it('should find user by email', async () => {
      const dbUserA = await driver.getUserFromEmail(`${userA}@example.com`);
      expect(dbUserA).toBeTruthy();

      const dbUserZ = await driver.getUserFromEmail(`hello@example.com`);
      expect(dbUserZ).toBeNull();
    });

    it('should get password hash from user', async () => {
      await driver.savePasswordHash(userA, 'HASH');
      const dbUserA = await driver.getUser(userA);
      if (!dbUserA) throw new Error('could not find user');
      expect(driver.getPasswordHashFromUser(dbUserA)).toEqual('HASH');

      const dbUserB = await driver.getUser(userB);
      if (!dbUserB) throw new Error('could not find user');
      expect(driver.getPasswordHashFromUser(dbUserB)).toEqual(null);
    });

    it('should save password hash on user', async () => {
      const dbUserA = await driver.getUser(userA);
      expect((dbUserA as any).passwordHash).toBeFalsy();

      await driver.savePasswordHash(userA, 'HASH');
      const dbUserARefetched = await driver.getUser(userA);
      expect((dbUserARefetched as any).passwordHash).toEqual('HASH');
    });
  });
}
