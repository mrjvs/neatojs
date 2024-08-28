import type {
  CreateGuardFeatureOptions,
  ExposedFunctionMap,
  GuardFeature,
} from 'core/features.js';

export type LoginGuardFeatureComponents = Record<never, never>;

export type LoginGuardFeature<
  TId extends string = string,
  TExposed extends ExposedFunctionMap = Record<never, never>,
> = GuardFeature<TId, 'login', TExposed> & LoginGuardFeatureComponents;

export function loginFeature<
  const TId extends string,
  TExposed extends ExposedFunctionMap,
>(
  ops: CreateGuardFeatureOptions<TId, TExposed, LoginGuardFeatureComponents>,
): LoginGuardFeature<TId, TExposed> {
  return {
    id: ops.id,
    type: 'login',
    expose: ops.expose,
  };
}
