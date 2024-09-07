import type { UserType } from 'core/features';
import type { SessionEntity } from '../types';

export function isSessionValid(user: UserType, session: SessionEntity) {
  if (session.expiresAt < new Date()) return false;
  if (user.securityStamp !== session.securityStamp) return false;
  return true;
}
