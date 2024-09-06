import type {
  CreateGuardFeatureOptions,
  ExposedFunctionMap,
  GuardFeature,
  UserType,
} from 'core/features';

export type MfaGuardFeatureComponents = {
  mfa: {
    isEnabledForUser: (user: UserType) => boolean;
  };
};

export type MfaGuardFeature<
  TId extends string = string,
  TExposed extends ExposedFunctionMap = Record<never, never>,
> = GuardFeature<TId, 'mfa', TExposed, MfaGuardFeatureComponents>;

export function mfaFeature<
  const TId extends string,
  TExposed extends ExposedFunctionMap,
>(
  ops: CreateGuardFeatureOptions<TId, TExposed, MfaGuardFeatureComponents>,
): MfaGuardFeature<TId, TExposed> {
  return {
    id: ops.id,
    drivers: ops.drivers,
    type: 'mfa',
    builder: ops.builder,
  };
}
