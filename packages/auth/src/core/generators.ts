import { randomBytes } from 'node:crypto';

export function generateSecurityStamp() {
  return randomBytes(32).toString('hex');
}

export function generateRandomToken() {
  return randomBytes(20).toString('hex');
}
