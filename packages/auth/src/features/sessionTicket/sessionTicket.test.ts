import { sign } from 'jsonwebtoken';
import { inMemoryDriver } from 'drivers/all/memory/memory';
import { createUnverifiedTicket, createVerifiedTicket } from 'core/ticket';
import type { SessionTicketOptions } from './sessionTicket';
import { defaultExpiryInSeconds, sessionTicket } from './sessionTicket';
import { createSessionToken, getSessionIdFromToken } from './tokens';

const user = { id: '123', securityStamp: 'a-stamp' };

const secret = 'myTestSecret';
async function getSessionFeature(ops: Partial<SessionTicketOptions> = {}) {
  const driver = inMemoryDriver();
  const feat = sessionTicket({
    secret,
    driver,
    ...ops,
  });
  await driver.connect();
  return {
    driver,
    feat,
  };
}

describe('ticket/session', () => {
  describe('createSession', () => {
    it('should only accept verified tickets', async () => {
      const { feat } = await getSessionFeature();
      const unverifiedTicket = createUnverifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const verifiedTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      await expect(
        feat.expose.createSession(unverifiedTicket as any),
      ).rejects.toBeInstanceOf(Error);
      await expect(
        feat.expose.createSession(verifiedTicket),
      ).resolves.toBeTruthy();
    });

    it('should create a session', async () => {
      const { feat, driver } = await getSessionFeature();
      const ticket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(ticket);
      expect(session.id).toBeTruthy();
      expect(session.userId).toEqual(user.id);
      const foundSession = await driver.getSession(session.id);
      expect(foundSession).toMatchObject({
        userId: user.id,
        id: session.id,
        securityStamp: user.securityStamp,
      });
      if (!foundSession) throw new Error('Session not found');

      // within 10 seconds of the expected expiry and creation time
      assert.closeTo(foundSession.createdAt.getTime(), Date.now(), 10000);
      assert.closeTo(
        foundSession.expiresAt.getTime(),
        Date.now() + defaultExpiryInSeconds * 1000,
        10000,
      );
    });

    it('should use configured expiry', async () => {
      const expiry = 120;
      const { feat, driver } = await getSessionFeature({
        expiryInSeconds: expiry,
      });
      const ticket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(ticket);
      const foundSession = await driver.getSession(session.id);
      if (!foundSession) throw new Error('Session not found');

      // within 10 seconds of the expected expiry and creation time
      assert.closeTo(foundSession.createdAt.getTime(), Date.now(), 10000);
      assert.closeTo(
        foundSession.expiresAt.getTime(),
        Date.now() + expiry * 1000,
        10000,
      );
    });

    it('should create a valid token', async () => {
      const { feat, driver } = await getSessionFeature();
      const ticket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(ticket);
      const extractedSessionId = getSessionIdFromToken(
        { jwtSigning: secret },
        session.token,
      );
      const foundSession = await driver.getSession(extractedSessionId ?? '');
      expect(foundSession).toMatchObject({
        id: session.id,
        securityStamp: ticket.securityStamp,
      });
    });
  });

  describe('fromToken', () => {
    it('should not allow expired sessions with rolling sessions', async () => {
      const { feat, driver } = await getSessionFeature({ expiryInSeconds: 0 });
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);

      const newTicket = await feat.expose.fromToken(session.token);
      expect(newTicket).toBe(null);
    });

    it('should not allow expired sessions with static sessions', async () => {
      const { feat, driver } = await getSessionFeature({
        expiryInSeconds: 0,
        disableRollingSessions: true,
      });
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);

      const newTicket = await feat.expose.fromToken(session.token);
      expect(newTicket).toBe(null);
    });

    it.todo('should not allow expired sessions expired through security stamp');

    it('should handle removed sessions', async () => {
      const { feat, driver } = await getSessionFeature();
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);
      await driver.removeSession(session.id);

      const newTicket = await feat.expose.fromToken(session.token);
      expect(newTicket).toBe(null);
    });

    it('should handle removed users', async () => {
      const { feat } = await getSessionFeature();
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);

      const newTicket = await feat.expose.fromToken(session.token);
      expect(newTicket).toBe(null);
    });

    it('should use rolling sessions', async () => {
      const { feat, driver } = await getSessionFeature();
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);
      const dbSessionBefore = await driver.getSession(session.id);
      await feat.expose.fromToken(session.token);
      const dbSessionAfter = await driver.getSession(session.id);
      if (!dbSessionBefore || !dbSessionAfter)
        throw new Error('session dont exist');
      expect(dbSessionAfter.expiresAt.getTime()).toBeGreaterThan(
        dbSessionBefore.expiresAt.getTime(),
      );
    });

    it('should not use rolling session if disabled', async () => {
      const { feat, driver } = await getSessionFeature({
        disableRollingSessions: true,
      });
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);
      const dbSessionBefore = await driver.getSession(session.id);
      await feat.expose.fromToken(session.token);
      const dbSessionAfter = await driver.getSession(session.id);
      if (!dbSessionBefore || !dbSessionAfter)
        throw new Error('session dont exist');
      expect(dbSessionAfter.expiresAt).toEqual(dbSessionBefore.expiresAt);
    });

    it('should not use rolling session if disabled', async () => {
      const { feat, driver } = await getSessionFeature({
        disableRollingSessions: true,
      });
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);
      const dbSessionBefore = await driver.getSession(session.id);
      await feat.expose.fromToken(session.token);
      const dbSessionAfter = await driver.getSession(session.id);
      if (!dbSessionBefore || !dbSessionAfter)
        throw new Error('session dont exist');
      expect(dbSessionAfter.expiresAt).toEqual(dbSessionBefore.expiresAt);
    });

    it('should use configured expiry', async () => {
      const expiry = 120;
      const { feat, driver } = await getSessionFeature({
        expiryInSeconds: expiry,
      });
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);
      const dbSessionBefore = await driver.getSessionAndUpdateExpiry(
        session.id,
        new Date(Date.now() + 1000),
      );
      await feat.expose.fromToken(session.token);
      const dbSession = await driver.getSession(session.id);
      if (!dbSession || !dbSessionBefore)
        throw new Error('session doesnt exist');

      // within 10 seconds of the expected expiry times
      assert.closeTo(
        dbSessionBefore.expiresAt.getTime(),
        Date.now() + 1000,
        10000,
      );
      assert.closeTo(
        dbSession.expiresAt.getTime(),
        Date.now() + expiry * 1000,
        10000,
      );
    });

    it('should give a verified ticket as output', async () => {
      const { feat, driver } = await getSessionFeature();
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);
      const ticket = await feat.expose.fromToken(session.token);
      expect(ticket).toBeTruthy();
      if (!ticket) throw new Error('No ticket');
      expect(ticket.verified).toEqual(true);
      expect(ticket.securityStamp).toEqual(user.securityStamp);
      expect(ticket.userId).toEqual(user.id);
    });

    it.todo('should only make session from verified/complete sessions');
  });

  describe('fromAuthHeader', () => {
    it('should parse auth header correctly', async () => {
      const { feat, driver } = await getSessionFeature();
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);

      const ticket = await feat.expose.fromAuthHeader(
        `Bearer ${session.token}`,
      );
      expect(ticket).toBeTruthy();
    });
    it('should parse header case-insensitive', async () => {
      const { feat, driver } = await getSessionFeature();
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);

      const ticket = await feat.expose.fromAuthHeader(
        `BeaReR ${session.token}`,
      );
      expect(ticket).toBeTruthy();
    });
    it('should not allow invalid auth header types', async () => {
      const { feat, driver } = await getSessionFeature();
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);

      const ticket = await feat.expose.fromAuthHeader(`Basic ${session.token}`);
      expect(ticket).toBeFalsy();
    });
    it('should not throw even with invalid syntax', async () => {
      const { feat, driver } = await getSessionFeature();
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);

      const expectFailure = async (header: string) => {
        expect(await feat.expose.fromAuthHeader(header)).toBeFalsy();
      };

      await expectFailure(`Bearer   ${session.token}`);
      await expectFailure(session.token);
      await expectFailure(`Token ${session.token}`);
      await expectFailure(`Bearer example.com ${session.token}`);
      await expectFailure(`Bearer:${session.token}`);
      await expectFailure(`  Bearer ${session.token}   `);
      await expectFailure(`Bearer ${session.token} test`);
    });

    it('should create a verified ticket if valid', async () => {
      const { feat, driver } = await getSessionFeature();
      await driver.createUser(user.id, { stamp: user.securityStamp });
      const startTicket = createVerifiedTicket({
        securityStamp: user.securityStamp,
        userId: user.id,
      });
      const session = await feat.expose.createSession(startTicket);

      const ticket = await feat.expose.fromAuthHeader(
        `Bearer ${session.token}`,
      );
      expect(ticket).toBeTruthy();
      if (!ticket) throw new Error('No ticket');
      expect(ticket.verified).toEqual(true);
      expect(ticket.securityStamp).toEqual(user.securityStamp);
      expect(ticket.userId).toEqual(user.id);
      expect(ticket).toBeTruthy();
    });
  });

  describe('getSessionIdFromToken', () => {
    it('should parse valid token correctly', async () => {
      const token = createSessionToken({ jwtSigning: secret }, {
        id: 'hi',
      } as any);
      const id = getSessionIdFromToken({ jwtSigning: secret }, token);
      expect(id).toEqual('hi');
    });

    it('should return null with an invalid token', async () => {
      const invalidType = sign({ t: 'wrong' }, secret, {
        algorithm: 'HS512',
      });
      const missingType = sign({ hi: 42 }, secret, {
        algorithm: 'HS512',
      });
      const brokenToken = 'this.is.wrong';

      const secrets = { jwtSigning: secret };
      expect(getSessionIdFromToken(secrets, invalidType)).toBeFalsy();
      expect(getSessionIdFromToken(secrets, missingType)).toBeFalsy();
      expect(getSessionIdFromToken(secrets, brokenToken)).toBeFalsy();
      expect(getSessionIdFromToken(secrets, '')).toBeFalsy();
    });

    it('should return null with insecure token', async () => {
      const wrongSecretToken = createSessionToken(
        { jwtSigning: 'NotTheRightSecret' },
        {
          id: 'hi',
        } as any,
      );
      const noSecretToken = sign({ t: 's1', sid: 'hi' }, secret, {
        algorithm: 'none',
      });
      const wrongAlgToken = sign({ t: 's1', sid: 'hi' }, secret, {
        algorithm: 'HS384',
      });

      const secrets = { jwtSigning: secret };
      expect(getSessionIdFromToken(secrets, wrongAlgToken)).toBeFalsy();
      expect(getSessionIdFromToken(secrets, noSecretToken)).toBeFalsy();
      expect(getSessionIdFromToken(secrets, wrongSecretToken)).toBeFalsy();
    });
  });

  describe('createSessionToken', () => {
    it('should make valid token', async () => {
      const token = createSessionToken({ jwtSigning: secret }, {
        id: 'hi',
      } as any);
      const id = getSessionIdFromToken({ jwtSigning: secret }, token);
      expect(id).toEqual('hi');
    });
  });

  describe('getSessionInfoById', () => {
    test.todo('handles expired session');
    test.todo('handles removed session');
    test.todo('doesnt return session if not verified');
    test.todo('returns session');
  });
  describe('removeExpiredSessions', () => {
    test.todo('removes expired sessions');
    test.todo('doesnt remove valid sessions');
  });
  describe('removeSessionById', () => {
    test.todo('removes session completely');
    test.todo('handles invalid session id');
  });
  describe('getUserSessionInfos', () => {
    test.todo('handles expired sessions');
    test.todo('doesnt return not verified sessions');
    test.todo('returns user sessions');
    test.todo('doesnt return sessions from other users');
  });
});
