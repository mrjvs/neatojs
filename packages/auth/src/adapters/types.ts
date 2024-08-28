export interface SessionAdapterComponent {
  getPopulatedSession: (id: string) => Promise<{ user: any; session: any }>;
  getPopulatedSessionAndBump: (
    id: string,
  ) => Promise<{ user: any; session: any }>;
  createSession: (session: any) => Promise<{ user: any; session: any }>;
  updateSession: (id: string, newSession: any) => Promise<void>;
  removeSession: (id: string) => Promise<void>;
  removeUserSessions: (userId: string) => Promise<void>;
  cleanExpiredSessions: () => Promise<void>;
}

export interface CoreAdapterComponent {
  getUserById: (id: string) => Promise<{ user: any }>;
}

/*
TODO, support the following:
 - session: rolling sessions
 - session: tie to request information, expire if changed
 - user: security stamp
 - login/password: password hashing
 - login/password: email verification links
 - login/password: email verification codes
 - login/password: password reset links
 - login/oauth: oauth providers
 - login/passkeys: store public key
 - login/saml: implement saml (idk how it works yet)
 - provider/oauth: client storage/creation
 - provider/oauth: access/refresh token generation
 - provider/oauth: endpoints
 - mfa: recovery codes
 - mfa: regenerate recovery codes
 - mfa/totp: secret generation and storage
 - mfa/totp: checking code
 - mfa/sms: sms codes (same as email verification codes)
 - mfa/passkeys: store public key
*/

export interface AuthAdapter {
  components: {
    core: CoreAdapterComponent;
    session?: SessionAdapterComponent;
  };
}
