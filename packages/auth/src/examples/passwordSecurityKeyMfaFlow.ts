export async function loginPasswordWithSecurityKey(
  guard: any,
  body: any,
  req: any,
) {
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

export async function securityKeyChallenge(guard: any) {
  return {
    challenge: await guard.mfa.securitykey.challenge(),
  };
}

export async function securityKeyAuthenticate(guard: any, body: any, req: any) {
  const tempTicket = await guard.getTemporaryTicket(body.token);
  const ticket = await guard.mfa.securitykey.verify({
    ticket: tempTicket,
    username: body.username,
    signedChallenge: body.challenge,
    credential: body.credential,
  });

  return {
    token: (await guard.createSession(req, ticket)).token,
  };
}
