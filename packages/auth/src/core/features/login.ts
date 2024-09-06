import type {
  CreateGuardFeatureOptions,
  ExposedFunctionMap,
  GuardFeature,
} from 'core/features';

export type LoginGuardFeatureComponents = Record<never, never>;

export type LoginGuardFeature<
  TId extends string = string,
  TExposed extends ExposedFunctionMap = Record<never, never>,
> = GuardFeature<TId, 'login', TExposed, LoginGuardFeatureComponents>;

export function loginFeature<
  const TId extends string,
  TExposed extends ExposedFunctionMap,
>(
  ops: CreateGuardFeatureOptions<TId, TExposed, LoginGuardFeatureComponents>,
): LoginGuardFeature<TId, TExposed> {
  return {
    id: ops.id,
    drivers: ops.drivers,
    type: 'login',
    builder: ops.builder,
  };
}
