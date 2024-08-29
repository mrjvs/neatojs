import type { UserType } from 'core/features.js';

export type DriverBase = {
  id: string;
  connect: () => Promise<void>;
  getUser: (userId: string) => Promise<UserType | null>;
};

export type TraitDisabledValue = undefined | false | null;

export type MaybeTrait<TField, TTrait> = TField extends TraitDisabledValue
  ? Record<never, never>
  : TTrait;

type DefaultedKeys<T, TOps> = Record<keyof Omit<TOps, keyof T>, undefined> & T;

export type DriverOptions<T extends TOptions, TOptions> = DefaultedKeys<
  T,
  TOptions
>;

export type EnabledKeys<T> = Values<{
  [Key in keyof T]: T[Key] extends TraitDisabledValue ? never : Key;
}>;

export type Values<T> = T extends never ? Record<never, never> : T[keyof T];

export type DriverTraitNoBase<
  TMapping extends Partial<Record<keyof TOptions, any>>,
  TInput extends TOptions,
  TOptions extends Record<string, any>,
> = Values<{
  [Key in Extract<EnabledKeys<TInput>, keyof TMapping>]: TMapping[Key];
}>;

export type DriverTraits<
  TMapping extends Partial<Record<keyof TOptions, any>>,
  TInput extends TOptions,
  TOptions extends Record<string, any>,
> =
  DriverTraitNoBase<TMapping, TInput, TOptions> extends never
    ? DriverBase
    : DriverTraitNoBase<TMapping, TInput, TOptions> & DriverBase;
