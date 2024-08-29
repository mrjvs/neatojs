import type { SessionDriverTrait } from 'features/sessionTicket.js';
import type {
  DriverBase,
  DriverOptions,
  DriverTraits,
  MaybeTrait,
  TraitDisabledValue,
} from './types.js';

// export type SqliteDriverSessionOptions = string;

// export type SqliteDriverOptions<
//   TSessionOps extends
//     | SqliteDriverSessionOptions
//     | TraitDisabledValue = undefined,
// > = {
//   path?: string;
//   userTable: string;
//   sessionTable?: TSessionOps;
// } & (TSessionOps extends TraitDisabledValue
//   ? { sessionTable?: TraitDisabledValue }
//   : { sessionTable: SqliteDriverSessionOptions });

// export type SqliteDriver<
//   TOps extends SqliteDriverOptions<TSessionOps>,
//   TSessionOps extends SqliteDriverSessionOptions | TraitDisabledValue,
// > = DriverBase & MaybeTrait<TOps['sessionTable'], SessionDriverTrait>;

// export function sqliteDriver<
//   TOps extends SqliteDriverOptions<TSessionOps>,
//   TSessionOps extends SqliteDriverSessionOptions | TraitDisabledValue,
// >(ops: TOps): SqliteDriver<TOps, TSessionOps> {
//   const _defaultedPath = ops.path ?? './auth.db';
//   const base: DriverBase = {
//     id: 'sqlite',
//     async connect() {
//       throw new Error('tried to connect to sqlite');
//     },
//     async getUser(_userId) {
//       throw new Error('User getting not implemented');
//     },
//   };

//   let sessionTrait: SessionDriverTrait | undefined;
//   if (ops.sessionTable) {
//     sessionTrait = {
//       createSession(_data) {
//         throw new Error('not implemented');
//       },
//       getSession(_id) {
//         throw new Error('not implemented');
//       },
//       getSessionAndUpdateExpiry(_id, _expiry) {
//         throw new Error('not implemented');
//       },
//       getUserSessions(_userId) {
//         throw new Error('not implemented');
//       },
//       removeExpiredSessions() {
//         throw new Error('not implemented');
//       },
//       removeSession(_id) {
//         throw new Error('not implemented');
//       },
//     };
//   }

//   return {
//     ...base,
//     ...sessionTrait,
//   } as SqliteDriver<TOps, TSessionOps>;
// }

// // should be `DriverBase`
// const _plainDriver = sqliteDriver({
//   userTable: 'users',
// });

// // should be `DriverBase & SessionDriverTrait`
// const _sessionDriver = sqliteDriver({
//   userTable: 'users',
//   sessionTable: 'sessions',
// });

// type TestOps = {
//   userTable: string;
//   sessionTable: string | undefined;
// };

// type DriverReset<
//   TInput extends TOptions,
//   TOptions extends Record<string, any>,
// > = Record<keyof TOptions, undefined> & TInput;

// type TestDriver<T extends TestOps> = DriverBase &
//   MaybeTrait<T['sessionTable'], SessionDriverTrait>;

// type DriverOpsFeatures<
//   T extends Record<string, any>,
//   TMapping extends Partial<Record<keyof T, any>>,
// > = {
//   [Key in keyof TMapping]: T extends Record<Key, any>
//     ? T[Key] extends TraitDisabledValue
//       ? Record<never, never>
//       : TMapping[Key]
//     : Record<never, never>;
// };

// type DriverOps<
//   T extends Record<string, any>,
//   TMappingRaw extends Record<keyof T, any>,
//   TMapping extends Partial<TMappingRaw> = Partial<TMappingRaw>,
// > = DriverOpsFeatures<T, TMapping>[keyof DriverOpsFeatures<T, TMapping>];

// type DriverOpsTwo<T extends TestOps> = DriverOpsFeatures<
//   T,
//   TMapping
// >[keyof DriverOpsFeatures<T, TMapping>];

// // type ConditionalOps<TInput, TOptions> = TInput extends TOptions
// //   ? TInput
// //   : never;

type TestDriverOps = {
  userTable: string;
  sessionTable?: string;
};

type TestDriverMapping = {
  sessionTable: SessionDriverTrait;
};

type TestDriver<T extends TestDriverOps> = DriverTraits<
  TestDriverMapping,
  T,
  TestDriverOps
>;

function testDriver<T extends TestDriverOps>(_ops: T): TestDriver<T> {
  return 42 as any;
}

// plain driver
const plainDriver = testDriver({
  userTable: 'test',
});

plainDriver.createSession; // this should be failing
plainDriver.getUser;

// with sessions
const sessionDriver = testDriver({
  userTable: 'test',
  sessionTable: 'test',
});

sessionDriver.createSession;
sessionDriver.getUser;
