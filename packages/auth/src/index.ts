/* core */
export type { GuardOptions, Guard } from './core/index.js';
export { createGuard } from './core/index.js';

export type {
  GuardFeatureType,
  ExposedFunctionMap,
  GuardFeature,
  CreateGuardFeatureOptions,
} from './core/features.js';
export { alias } from './core/features.js';

export type {
  TicketBase,
  Ticket,
  UnverifiedTicket,
  VerifiedTicket,
} from './core/ticket.js';
export { isVerifiedTicket, assertVerifiedTicket } from './core/ticket.js';

export type {
  LoginGuardFeature,
  LoginGuardFeatureComponents,
} from './core/features/login.js';
export { loginFeature } from './core/features/login.js';

export type {
  MfaGuardFeature,
  MfaGuardFeatureComponents,
} from './core/features/mfa.js';
export { mfaFeature } from './core/features/mfa.js';

export type {
  TicketGuardFeature,
  TicketGuardFeatureComponents,
} from './core/features/ticket.js';
export { ticketFeature } from './core/features/ticket.js';

/* features */
export type {
  TotpMfaOptions,
  TotpPreperationDetails,
  TotpDriverTrait,
} from './features/totpMfa.js';
export { totpMfa } from './features/totpMfa.js';

export type {
  SessionTicketOptions,
  SessionDriverTrait,
  SessionEntity,
  SessionEntityCreate,
  Session,
} from './features/sessionTicket.js';
export { sessionTicket } from './features/sessionTicket.js';

export type {
  PasswordLoginOptions,
  PasswordLoginInput,
  PasswordDriverTrait,
} from './features/passwordLogin.js';
export { passwordLogin } from './features/passwordLogin.js';

/* drivers */
export type {
  DriverBase,
  TraitDisabledValue,
  DriverTraits,
  DriverTraitNoBase,
  MaybeTrait,
} from './drivers/types.js';
export { extendDriver } from './drivers/extending.js';

export type { SqliteDriverOptions, SqliteDriver } from './drivers/sqlite.js';
export { sqliteDriver } from './drivers/sqlite.js';
