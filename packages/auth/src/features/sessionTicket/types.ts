export type SessionEntity = {
  id: string;
  userId: string;
  securityStamp: string;
  expiresAt: Date;
  createdAt: Date;
};

export type SessionSecretOptions = {
  jwtSigning: string;
};
