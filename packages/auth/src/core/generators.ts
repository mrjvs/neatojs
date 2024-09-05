import { randomBytes } from 'node:crypto';

export function generateSecurityStamp() {
  return randomBytes(32).toString('hex');
}
