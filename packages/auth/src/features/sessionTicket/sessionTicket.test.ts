describe('ticket/session', () => {
  describe('createSession', () => {
    test.todo('assert verification ticket');
    test.todo('creates an actual session');
    test.todo('creates proper token that can be read again');
  });
  describe('fromToken', () => {
    test.todo('handles expired sessions');
    test.todo('handles removed sessions');
    test.todo('does rolling session');
    test.todo('stops doing rolling session when disabled');
    test.todo('handles invalid user id');
    test.todo('only allow verified sessions');
    test.todo('creates proper verified ticket');
  });
  describe('fromAuthHeader', () => {
    test.todo('handles invalid auth header type');
    test.todo('handles case sensitivity');
    test.todo('handles invalid auth header syntax');
    test.todo('creates ticket if valid');
  });
  describe('getSessionIdFromToken', () => {
    test.todo('handles invalid token');
    test.todo('handles insecure token');
    test.todo('handles correct token');
  });
  describe('createSessionToken', () => {
    test.todo('creates proper token that can be read again');
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
