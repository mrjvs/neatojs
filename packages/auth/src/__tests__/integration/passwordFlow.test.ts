import { createGuard } from 'core';
import { inMemoryDriver } from 'drivers/all/memory/memory';
import { passwordLogin } from 'features/passwordLogin/passwordLogin';
import { sessionTicket } from 'features/sessionTicket/sessionTicket';

describe('integration / password flow', async () => {
  const driver = inMemoryDriver();
  const guard = createGuard({
    driver,
    features: [
      passwordLogin({ driver }),
      sessionTicket({ driver, secret: 'MySecret' }),
    ],
  });
  await driver.connect();

  it('normal', async () => {
    // setup
    await driver.createUser('123', 'john@example.com');
    await guard.password.unsafeForceUpdatePassword('123', 'MySecretPassword');

    // authenticate
    const ticket = await guard.password.login({
      password: 'MySecretPassword',
      email: 'john@example.com',
    });

    if (!ticket) throw new Error('invalid credentials');
    if (ticket.needsMfa()) throw new Error('invalid credentials');

    const session = await guard.session.createSession(ticket);
    const sessionToken = session.token;
    expect(sessionToken).toBeTruthy();
  });

  it.todo('with direct MFA'); // MFA in same endpoint

  it.todo('with MFA'); // MFA in two separate endpoints
});
