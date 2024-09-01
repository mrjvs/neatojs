import { randomUUID } from 'node:crypto';
import type { DriverBase } from 'drivers/types.js';
import type { SessionDriverTrait } from 'features/sessionTicket/sessionTicket.js';

export function testDriver(
  makeDb: () => Promise<{ driver: DriverBase & SessionDriverTrait }>,
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
      const session = await driver.createSession({
        userId: userA,
      });
      expect(session).toBeTruthy();
    });

    it('should find a session', async () => {
      const session = await driver.createSession({
        userId: userA,
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
      });
      const foundSession = await driver.getSession(randomUUID());
      expect(foundSession).toBeFalsy();
    });

    it.todo('should update expiry');
    it.todo('should not update expiry if not found');
    it.todo('should not update expiry if already expired');
    it.todo('should remove session');
    it.todo('should remove expired sessions');
    it.todo('should not remove normal sessions');

    it('should get all users sessions', async () => {
      const sessionA = await driver.createSession({
        userId: userA,
      });
      const sessionB = await driver.createSession({
        userId: userA,
      });
      const sessionC = await driver.createSession({
        userId: userB,
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
}
