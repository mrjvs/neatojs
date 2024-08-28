export async function loginPasskeyChallenge(guard: any) {
  return {
    challenge: await guard.passkey.challenge(),
  };
}

export async function loginPasskeyAuthenticate(
  guard: any,
  body: any,
  req: any,
) {
  const ticket = await guard.passkey.verify({
    username: body.username,
    signedChallenge: body.challenge,
    credential: body.credential,
  });

  return {
    token: (await guard.createSession(req, ticket)).token,
  };
}
