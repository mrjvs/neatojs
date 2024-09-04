/* core */
export type { GuardOptions, Guard } from './core/index';
export { createGuard } from './core/index';

export type {
  GuardFeatureType,
  ExposedFunctionMap,
  GuardFeature,
  CreateGuardFeatureOptions,
} from './core/features';
export { alias } from './core/features';

export type {
  TicketBase,
  Ticket,
  UnverifiedTicket,
  VerifiedTicket,
} from './core/ticket';
export { isVerifiedTicket, assertVerifiedTicket } from './core/ticket';

export type {
  LoginGuardFeature,
  LoginGuardFeatureComponents,
} from './core/features/login';
export { loginFeature } from './core/features/login';

export type {
  MfaGuardFeature,
  MfaGuardFeatureComponents,
} from './core/features/mfa';
export { mfaFeature } from './core/features/mfa';

export type {
  TicketGuardFeature,
  TicketGuardFeatureComponents,
} from './core/features/ticket';
export { ticketFeature } from './core/features/ticket';

/* features */
export type {
  TotpMfaOptions,
  TotpPreperationDetails,
  TotpDriverTrait,
} from './features/totpMfa/totpMfa';
export { totpMfa } from './features/totpMfa/totpMfa';

export type {
  SessionTicketOptions,
  SessionDriverTrait,
  SessionEntityCreate,
  Session,
} from './features/sessionTicket/sessionTicket';
export { sessionTicket } from './features/sessionTicket/sessionTicket';
export type { SessionEntity } from './features/sessionTicket/types';

export type {
  PasswordLoginOptions,
  PasswordLoginInput,
  PasswordDriverTrait,
} from './features/passwordLogin/passwordLogin';
export { passwordLogin } from './features/passwordLogin/passwordLogin';

/* drivers */
export type {
  DriverBase,
  TraitDisabledValue,
  DriverTraits,
  DriverTraitNoBase,
  MaybeTrait,
} from './drivers/types';
export { extendDriver } from './drivers/extending';

export type {
  SqliteDriverOptions,
  SqliteDriver,
} from './drivers/all/sqlite/sqlite';
export { sqliteDriver } from './drivers/all/sqlite/sqlite';
