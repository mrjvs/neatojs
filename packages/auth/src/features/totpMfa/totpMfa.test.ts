describe('mfa/totp', () => {
  describe('isEnabledForUser', () => {
    test.todo('returns true when enabled');
    test.todo('returns false when it has a secret but not enabled');
    test.todo('returns false when it doesnt have secret configured');
  });
  describe('remove', () => {
    test.todo('disables and unsets secret for user');
    test.todo('handles missing user');
    test.todo('handles user that hasnt had totp configured');
  });
  describe('prepareUser', () => {
    test.todo('throws error if user cannot be found');
    test.todo('should disable totp');
    test.todo('should generate a new secret');
    test.todo('should return a valid authenticator URL');
    test.todo('should not enable totp');
  });
  describe('enable', () => {
    test.todo('throws error if user cannot be found');
    test.todo('return false if totp secret isnt set');
    test.todo('return false if input code is invalid');
    test.todo('return false if input code is a backup code');
    test.todo('when all correct, it should enable totp');
  });
  describe('sign', () => {
    test.todo('throws error if user not found');
    test.todo('throws error totp not configured for user');
    test.todo('throws error if input code is invalid');
    test.todo('throws error if input code is a backup code');
    test.todo('return a verified ticket if all is correct');
  });
});
