// create your storage driver, with only the tables you need for your features
const driver = prismaDriver({
  userTable: 42,
});

export const guard = createGuard({
  // driver for general user table usage
  driver,

  // add features, the feature functions will do a typecheck if the driver supports the tables
  // some features have multiple drivers, for example for quicker lookup (sessions, blacklisted totp)
  features: [
    passwordLogin({ driver }),
    sessionTicket({ driver }),
    totpMfa({ driver, cacheDriver: driver }),
    alias('secureTotp', totpMfa({ driver, cacheDriver: driver })),
    securityKeyMfa({ driver }),
  ],
});
