export async function loginPasswordWithTotp(guard: any, body: any, req: any) {
  let ticket = await guard.password.login({
    password: body.password,
    email: body.email,
  });

  if (ticket.needsMfa()) {
    if (!body.totpCode) throw new Error('Need totp code');
    ticket = await guard.mfa.totp.sign(body.totpCode, ticket);
  }

  return {
    token: (await guard.createSession(req, ticket)).token,
  };
}
