import { hash, verify } from 'argon2';

export type VerifyPasswordResult = {
  success: boolean;
  needsRehash: boolean;
};

export async function verifyPassword(
  _user: any,
  passwordHash: string,
  password: string,
): Promise<VerifyPasswordResult> {
  return {
    success: await verify(passwordHash, password),
    needsRehash: false,
  };
}

export function hashPassword(_user: any, password: string): Promise<string> {
  return hash(password);
}
