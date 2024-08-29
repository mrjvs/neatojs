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
