export async function loginPasswordDelayedMfa(guard: any, body: any, req: any) {
  const ticket = await guard.password.login({
    password: body.password,
    email: body.email,
  });

  if (ticket.needsMfa()) {
    return {
      message: 'Needs mfa',
      token: await guard.getTemporaryToken(ticket),
      methods: guard.mfa.getMethodsForUser(ticket.getUser()),
    };
  }

  return {
    token: (await guard.createSession(req, ticket)).token,
  };
}

export async function _delayedMfaStep2(guard: any, body: any, req: any) {
  const tempTicket = await guard.getTemporaryTicket(body.token);
  const ticket = await guard.mfa.totp.sign(body.totpCode, tempTicket);

  return {
    token: (await guard.createSession(req, ticket)).token,
  };
}
