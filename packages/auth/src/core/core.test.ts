import { createGuard } from 'core';
import { loginFeature } from './features/login';
import { mfaFeature } from './features/mfa';
import { ticketFeature } from './features/ticket';
import { alias } from './features';

function testLoginFeature() {
  return loginFeature({
    id: 'testlogin',
    drivers: [],
    builder: (_ctx) => ({
      expose: {
        testLogin() {
          return true;
        },
      },
    }),
  });
}
function testTicketFeature() {
  return ticketFeature({
    id: 'testticket',
    drivers: [],
    builder: (_ctx) => ({
      expose: {
        testTicket() {
          return true;
        },
      },
    }),
  });
}
function testMfaFeature() {
  return mfaFeature({
    id: 'testmfa',
    drivers: [],
    builder: (_ctx) => ({
      mfa: {
        isEnabledForUser(_user) {
          return true;
        },
        getMfaType() {
          return 'passkey';
        },
      },
      expose: {
        testMfa() {
          return true;
        },
      },
    }),
  });
}

describe('core', async () => {
  it('should add exposed feature functions', () => {
    const guard: any = createGuard({
      driver: 42 as any,
      features: [testLoginFeature(), testMfaFeature(), testTicketFeature()],
    });
    expect(guard.testlogin.testLogin).toBeTypeOf('function');
    expect(guard.testticket.testTicket).toBeTypeOf('function');
    expect(guard.mfa.testmfa.testMfa).toBeTypeOf('function');
    expect(guard.testlogin.other).toBeFalsy();
  });

  it('should properly work with aliases', () => {
    const guard: any = createGuard({
      driver: 42 as any,
      features: [alias('hello', testLoginFeature())],
    });
    expect(guard.hello.testLogin).toBeTypeOf('function');
  });

  it.todo('should connect drivers on initialize()');
});
