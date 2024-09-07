import type { Algorithm } from 'jsonwebtoken';
import { sign, verify } from 'jsonwebtoken';
import type { SessionEntity, SessionSecretOptions } from '../types';

const algorithm: Algorithm = 'HS512';

// these are intentionally short field names, to keep JWT small
export type SessionTokenContents = {
  t: 's1'; // session v1
  sid: string; // session id
};

export function createSessionToken(
  secrets: SessionSecretOptions,
  session: SessionEntity,
): string {
  const payload: SessionTokenContents = {
    t: 's1',
    sid: session.id,
  };
  return sign(payload, secrets.jwtSigning, {
    algorithm,
  });
}

export function getSessionIdFromToken(
  secrets: SessionSecretOptions,
  token: string,
): string | null {
  try {
    const payload = verify(token, secrets.jwtSigning, {
      algorithms: [algorithm],
      complete: false,
    }) as SessionTokenContents;

    if (payload.t !== 's1') return null;
    return payload.sid;
  } catch {
    return null;
  }
}
