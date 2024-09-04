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

export type EnabledKeys<T> = Values<{
  [Key in keyof T]: T[Key] extends TraitDisabledValue ? never : Key;
}>;

type Values<T> = T extends never ? Record<never, never> : T[keyof T];

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R,
) => any
  ? R
  : never;

export type DriverTraitNoBase<
  TMapping extends Partial<Record<keyof TOptions, any>>,
  TInput extends TOptions,
  TOptions extends Record<string, any>,
> = UnionToIntersection<
  Values<{
    [Key in Extract<EnabledKeys<TInput>, keyof TMapping>]: TMapping[Key];
  }>
>;

export type DriverTraits<
  TMapping extends Partial<Record<keyof TOptions, any>>,
  TInput extends TOptions,
  TOptions extends Record<string, any>,
> =
  DriverTraitNoBase<TMapping, TInput, TOptions> extends never
    ? DriverBase
    : DriverTraitNoBase<TMapping, TInput, TOptions> & DriverBase;
