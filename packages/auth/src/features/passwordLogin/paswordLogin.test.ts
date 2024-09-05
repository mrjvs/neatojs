import { inMemoryDriver } from 'drivers/all/memory/memory';
import { hashPassword, verifyPassword } from './hashing';
import type { PasswordLoginOptions } from './passwordLogin';
import { passwordLogin } from './passwordLogin';

const user = { id: '123' };
const simplePassword = '123456';
const complexPassword = '  CnUfE+D^Q(!;`rH*gu"SK  xJyL{W7Y<ZT#j-=A62v  ';

async function getPasswordFeature(hashing?: PasswordLoginOptions['hashing']) {
  const driver = inMemoryDriver();
  const feat = passwordLogin({
    driver,
    hashing,
  });
  await driver.connect();
  return {
    driver,
    feat,
  };
}

function expectVerify(hash: string, pass: string) {
  const verifySuccess = async () =>
    (await verifyPassword(user, hash, pass)).success;
  return expect(verifySuccess()).resolves;
}

describe('login/password', () => {
  describe('default hashing', () => {
    it('should hash securely', async () => {
      const simpleHash = await hashPassword(user, simplePassword);
      const simpleTwiceHash = await hashPassword(user, simplePassword);
      expect(simpleHash).not.contain(simplePassword);
      expect(simpleHash).not.contain(simpleTwiceHash);

      const complexHash = await hashPassword(user, complexPassword);
      const complexTwiceHash = await hashPassword(user, complexPassword);
      expect(complexHash).not.contain(complexPassword);
      expect(complexHash).not.contain(complexTwiceHash);
    });
    it('should verify correctly', async () => {
      const simpleHash = await hashPassword(user, simplePassword);
      const simpleTwiceHash = await hashPassword(user, simplePassword);
      await expectVerify(simpleHash, simplePassword).toEqual(true);
      await expectVerify(simpleTwiceHash, simplePassword).toEqual(true);
      await expectVerify(simpleHash, complexPassword).toEqual(false);
      await expectVerify(simpleHash, '').toEqual(false);

      const complexHash = await hashPassword(user, complexPassword);
      const complexTwiceHash = await hashPassword(user, complexPassword);
      await expectVerify(complexHash, complexPassword).toEqual(true);
      await expectVerify(complexTwiceHash, complexPassword).toEqual(true);
      await expectVerify(complexHash, simplePassword).toEqual(false);
      await expectVerify(complexHash, '').toEqual(false);
    });
  });

  describe('unsafeForceUpdatePassword', () => {
    it('should update password', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id);

      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('user not found');
      const hashOne = driver.getPasswordHashFromUser(dbUser);
      if (!hashOne) throw new Error('hash not found');
      await expectVerify(hashOne, '123').toEqual(true);
    });
    it('should not allow old password after update', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id);

      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      await feat.expose.unsafeForceUpdatePassword(user.id, '456');
      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('user not found');
      const hash = driver.getPasswordHashFromUser(dbUser);
      if (!hash) throw new Error('hash not found');
      await expectVerify(hash, '123').toEqual(false);
      await expectVerify(hash, '456').toEqual(true);
    });
    it('should throw if user doesnt exist', async () => {
      const { feat } = await getPasswordFeature();
      await expect(
        feat.expose.unsafeForceUpdatePassword(user.id, '123'),
      ).rejects.toBeInstanceOf(Error);
    });
    it('should use specified hashing functions', async () => {
      const verifyMock = vi
        .fn()
        .mockImplementation((_u, _passwordHash, _password) => ({
          success: true,
          needsRehash: false,
        }));
      const hashMock = vi.fn().mockImplementation((_u, _password) => 'HASHED');
      const { feat, driver } = await getPasswordFeature({
        async verifyPassword(u, passwordHash, password) {
          return verifyMock(u, passwordHash, password);
        },
        async hashPassword(u, password) {
          return hashMock(u, password);
        },
      });
      await driver.createUser(user.id);

      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('user not found');
      const hash = driver.getPasswordHashFromUser(dbUser);
      expect(hash).toEqual('HASHED');
      expect(hashMock).toHaveBeenCalledTimes(1);
    });

    it('should update security stamp after update', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id);

      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const dbUserBefore = await driver.getUser(user.id);
      if (!dbUserBefore) throw new Error('user not found');

      await feat.expose.unsafeForceUpdatePassword(user.id, '456');
      const dbUserAfter = await driver.getUser(user.id);
      if (!dbUserAfter) throw new Error('user not found');
      expect(dbUserBefore.securityStamp).not.toEqual(dbUserAfter.securityStamp);
    });
  });

  describe('verifyPassword', () => {
    it('should return false when no password set', async () => {
      const { feat, driver } = await getPasswordFeature();
      const dbUser = await driver.createUser(user.id);
      expect(await feat.expose.verifyPassword(dbUser, '123')).toEqual(false);
    });

    it('should return false with incorrect password', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id);
      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('couldnt find user');
      expect(await feat.expose.verifyPassword(dbUser, '456')).toEqual(false);
      expect(await feat.expose.verifyPassword(dbUser, '')).toEqual(false);
      expect(await feat.expose.verifyPassword(dbUser, '123 ')).toEqual(false);
    });

    it('should return true with correct password', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id);
      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('couldnt find user');
      expect(await feat.expose.verifyPassword(dbUser, '123')).toEqual(true);
    });

    it('should use specified hashing functions', async () => {
      const verifyMock = vi
        .fn()
        .mockImplementation((_u, _passwordHash, _password) => ({
          success: true,
          needsRehash: false,
        }));
      const hashMock = vi.fn().mockImplementation((_u, _password) => 'HASHED');
      const { feat, driver } = await getPasswordFeature({
        async verifyPassword(u, passwordHash, password) {
          return verifyMock(u, passwordHash, password);
        },
        async hashPassword(u, password) {
          return hashMock(u, password);
        },
      });

      await driver.createUser(user.id);
      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('couldnt find user');
      expect(await feat.expose.verifyPassword(dbUser, '12123612363')).toEqual(
        true,
      );
      expect(verifyMock).toHaveBeenCalledTimes(1);
    });

    it('should rehash only when needed', async () => {
      const verifyMock = vi.fn().mockResolvedValue({
        success: true,
        needsRehash: false,
      });
      const hashMock = vi.fn().mockResolvedValue('OLDHASH');
      const { feat, driver } = await getPasswordFeature({
        async verifyPassword(u, passwordHash, password) {
          return verifyMock(u, passwordHash, password);
        },
        async hashPassword(u, password) {
          return hashMock(u, password);
        },
      });
      await driver.createUser(user.id);
      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('couldnt find user');
      expect(hashMock).toHaveBeenCalledTimes(1);

      expect(await feat.expose.verifyPassword(dbUser, '123')).toEqual(true);
      expect(hashMock).toHaveBeenCalledTimes(1);
      expect(verifyMock).toHaveBeenCalledTimes(1);

      verifyMock.mockResolvedValueOnce({
        success: true,
        needsRehash: true,
      });
      hashMock.mockResolvedValueOnce('NEWHASH');
      expect(await feat.expose.verifyPassword(dbUser, '123')).toEqual(true);
      expect(hashMock).toHaveBeenCalledTimes(2);
      expect(verifyMock).toHaveBeenCalledTimes(2);
      const newDbUser = await driver.getUser(user.id);
      if (!newDbUser) throw new Error('couldnt find user');
      expect(driver.getPasswordHashFromUser(newDbUser)).toEqual('NEWHASH');
    });
  });

  describe('login', () => {
    it('should reject if user not found', async () => {
      const { feat } = await getPasswordFeature();
      expect(await feat.expose.login({ email: 'hi', password: '123' })).toEqual(
        null,
      );
    });
    it('should reject if there is no password hash on user', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id, { email: 'gmail' });
      expect(
        await feat.expose.login({ email: `gmail`, password: '123' }),
      ).toEqual(null);
    });
    it('should reject if password is incorrect', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id, { email: 'gmail' });
      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      expect(
        await feat.expose.login({ email: 'gmail', password: '456' }),
      ).toEqual(null);
    });
    it('should allow if password is correct', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id, { email: 'gmail' });
      await feat.expose.unsafeForceUpdatePassword(user.id, '456');
      expect(
        await feat.expose.login({ email: 'gmail', password: '456' }),
      ).toBeTruthy();
    });
    test.todo('test if ticket response is correct');
    it('should rehash when needed', async () => {
      const verifyMock = vi.fn().mockResolvedValue({
        success: true,
        needsRehash: false,
      });
      const hashMock = vi.fn().mockResolvedValue('OLDHASH');
      const { feat, driver } = await getPasswordFeature({
        async verifyPassword(u, passwordHash, password) {
          return verifyMock(u, passwordHash, password);
        },
        async hashPassword(u, password) {
          return hashMock(u, password);
        },
      });
      await driver.createUser(user.id, { email: 'gmail' });
      await feat.expose.unsafeForceUpdatePassword(user.id, '456');
      expect(
        await feat.expose.login({ email: 'gmail', password: '456' }),
      ).toBeTruthy();
      expect(verifyMock).toBeCalledTimes(1);
      expect(hashMock).toBeCalledTimes(1);

      const dbUserBefore = await driver.getUser(user.id);
      verifyMock.mockResolvedValueOnce({
        success: true,
        needsRehash: true,
      });
      hashMock.mockResolvedValueOnce('NEWHASH');
      expect(
        await feat.expose.login({ email: 'gmail', password: '456' }),
      ).toBeTruthy();
      expect(verifyMock).toBeCalledTimes(2);
      expect(hashMock).toBeCalledTimes(2);
      expect(hashMock).toHaveBeenCalledWith(dbUserBefore, '456');
      const dbUserAfter = await driver.getUser(user.id);
      expect(driver.getPasswordHashFromUser(dbUserAfter as any)).toBe(
        'NEWHASH',
      );
    });
  });

  describe('updatePassword', () => {
    it('should fail with incorrect old password', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id);

      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const result = await feat.expose.updatePassword(user.id, '456', '999');
      expect(result).toEqual(false);

      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('user not found');
      const hashOne = driver.getPasswordHashFromUser(dbUser);
      if (!hashOne) throw new Error('hash not found');
      await expectVerify(hashOne, '123').toEqual(true);
    });

    it('should throw if no password set', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id);

      await expect(
        feat.expose.updatePassword(user.id, '456', '999'),
      ).rejects.toBeInstanceOf(Error);
    });

    it('should update password', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id);

      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const result = await feat.expose.updatePassword(user.id, '123', '456');
      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('user not found');
      const hashOne = driver.getPasswordHashFromUser(dbUser);
      if (!hashOne) throw new Error('hash not found');
      await expectVerify(hashOne, '456').toEqual(true);
      expect(result).toEqual(true);
    });

    it('should update security stamp after update', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id);

      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const dbUserBefore = await driver.getUser(user.id);
      if (!dbUserBefore) throw new Error('user not found');

      const resOne = await feat.expose.updatePassword(user.id, '1', '456');
      expect(resOne).toEqual(false);
      const dbUserUnchanged = await driver.getUser(user.id);
      if (!dbUserUnchanged) throw new Error('user not found');
      expect(dbUserBefore.securityStamp).toEqual(dbUserUnchanged.securityStamp);

      const result = await feat.expose.updatePassword(user.id, '123', '456');
      expect(result).toEqual(true);
      const dbUserAfter = await driver.getUser(user.id);
      if (!dbUserAfter) throw new Error('user not found');
      expect(dbUserBefore.securityStamp).not.toEqual(dbUserAfter.securityStamp);
    });

    it('should not allow old password after update', async () => {
      const { feat, driver } = await getPasswordFeature();
      await driver.createUser(user.id);

      await feat.expose.unsafeForceUpdatePassword(user.id, '123');
      const result = await feat.expose.updatePassword(user.id, '123', '456');
      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('user not found');
      const hash = driver.getPasswordHashFromUser(dbUser);
      if (!hash) throw new Error('hash not found');
      await expectVerify(hash, '123').toEqual(false);
      await expectVerify(hash, '456').toEqual(true);
      expect(result).toEqual(true);
    });

    it('should throw if user doesnt exist', async () => {
      const { feat } = await getPasswordFeature();
      await expect(
        feat.expose.updatePassword(user.id, '123', '123'),
      ).rejects.toBeInstanceOf(Error);
    });

    it('should use specified hashing functions', async () => {
      const verifyMock = vi
        .fn()
        .mockImplementation((_u, _passwordHash, _password) => ({
          success: true,
          needsRehash: false,
        }));
      const hashMock = vi.fn().mockImplementation((_u, _password) => 'NEWHASH');
      const { feat, driver } = await getPasswordFeature({
        async verifyPassword(u, passwordHash, password) {
          return verifyMock(u, passwordHash, password);
        },
        async hashPassword(u, password) {
          return hashMock(u, password);
        },
      });
      await driver.createUser(user.id);
      hashMock.mockResolvedValueOnce('OLDHASH');
      await feat.expose.unsafeForceUpdatePassword(user.id, '123');

      await feat.expose.updatePassword(user.id, '123', '456');
      const dbUser = await driver.getUser(user.id);
      if (!dbUser) throw new Error('user not found');
      const hash = driver.getPasswordHashFromUser(dbUser);
      expect(hash).toEqual('NEWHASH');
      expect(hashMock).toHaveBeenCalledTimes(2);
    });
  });
});
