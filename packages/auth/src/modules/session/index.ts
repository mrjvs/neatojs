interface TotpDriver<T extends { id: string }> {
  saveTotpSecret: () => Promise<void>;
  getTotpSecretFromUser: (user: T) => Promise<string>;
}

interface SessionDriver<T extends { id: string }> {
  getPopulatedSession: (id: string) => Promise<{ user: T; session: any }>;
  getPopulatedSessionAndBump: (
    id: string,
  ) => Promise<{ user: T; session: any }>;
  createSession: (session: any) => Promise<{ user: T; session: any }>;
  updateSession: (id: string, newSession: any) => Promise<void>;
  removeSession: (id: string) => Promise<void>;
  removeUserSessions: (userId: string) => Promise<void>;
  cleanExpiredSessions: () => Promise<void>;
}

type StorageDriverBase = {
  connect: () => Promise<boolean>;
};

function prismaStorageDriver(ops: {
  userTable: number;
}): StorageDriverBase & TotpDriver<{ id: string }> {
  return {
    async connect() {
      return true;
    },
    async getTotpSecretFromUser(user) {
      return user.id + ops.userTable;
    },
    async saveTotpSecret() {
      // do stuff
    },
  };
}

function createNeatoAuth(_ops: any) {
  return {
    features: _ops.features,
  };
}

type BaseFeature<TExposed> = {
  type: string;
  expose: TExposed;
};

type MfaFeature<
  T extends { id: string },
  TId extends string,
  TExposed,
> = BaseFeature<TExposed> & {
  type: 'mfa';
  id: TId;
  mfa: {
    isEnabledForUser: (user: T) => boolean;
  };
};

function mfaFeature<
  T extends { id: string },
  const TId extends string,
  TExposed,
>(
  id: TId,
  ops: { isEnabledForUser: (user: T) => boolean; expose: TExposed },
): MfaFeature<T, TId, TExposed> {
  return {
    type: 'mfa',
    expose: ops.expose,
    id,
    mfa: {
      isEnabledForUser: ops.isEnabledForUser,
    },
  };
}

function totp<T extends { id: string }>(_ops: { driver: TotpDriver<T> }) {
  return mfaFeature('totp', {
    isEnabledForUser(user) {
      return Boolean(user.id);
    },
    expose: {
      asdfasdfa() {
        return 42;
      },
    },
  });
}

function securityKey<T extends { id: string }>(_ops: {
  driver: TotpDriver<T>;
}) {
  return mfaFeature('securityKey', {
    isEnabledForUser(user) {
      return Boolean(user.id);
    },
    expose: {
      asdfasdfa() {
        return 42;
      },
    },
  });
}

function session<T extends { id: string }>(_ops: { driver: SessionDriver<T> }) {
  return 42;
}

const driver = prismaStorageDriver({
  userTable: 42,
});

const t = totp({ driver });

function mapExposed<
  TFeature extends MfaFeature<TUser, TId, TExposed>,
  TUser extends { id: string },
  TId extends string,
  TExposed,
>(
  feature: TFeature,
): {
  mfa: Record<TFeature['id'], TFeature['expose']>;
} {
  return {
    mfa: {
      [feature.id]: feature.expose,
    } as any,
  };
}

const publicStuff = mapExposed(t);

publicStuff.mfa.totp.asdfasdfa();

const mfaFeatures: Record<string, FEature> = {};
mfaFeatures.totp;

const features = [totp({ driver }), securityKey({ driver })];

const guard = createNeatoAuth({
  driver,
  features: [
    passwordLogin({ driver }),
    sessionTicket({ driver }),
    totpMfa({ driver }),
    alias('secureTotp', totpMfa({ driver })),
    securityKeyMfa({ driver }),
  ],
});
