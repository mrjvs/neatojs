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

export type Values<T extends Record<any, any>> = T[keyof T];

export type DriverTraits<
  TMapping extends Record<keyof TOptions, any>,
  TInput extends TOptions,
  TOptions,
> = DriverBase &
  Values<{
    [Key in Exclude<keyof TMapping, keyof TInput>]: TMapping[Key];
  }>;
