import type { BaseLogger } from 'pino';
import type { DriverBase } from 'drivers/types';

type AnyFunction = (...args: any) => any;
export type UserType = { id: string; securityStamp: string };
export type ExposedFunctionMap = Record<string, AnyFunction>;

export type GuardFeatureType = 'mfa' | 'login' | 'ticket';

export type GuardFeatureContext = {
  logger: BaseLogger;
};

export type GuardFeature<
  TId extends string = string,
  TType extends GuardFeatureType = GuardFeatureType,
  TExposed extends ExposedFunctionMap = Record<never, never>,
  TComponents extends Record<never, never> = Record<never, never>,
> = {
  type: TType;
  id: TId;
  drivers: DriverBase[];
  builder: (ctx: GuardFeatureContext) => {
    expose: TExposed;
  } & TComponents;
};

export type GuardFeatureExtracted<
  TId extends string = string,
  TType extends GuardFeatureType = GuardFeatureType,
  TExposed extends ExposedFunctionMap = Record<never, never>,
  TComponents extends Record<never, never> = Record<never, never>,
> = {
  type: TType;
  id: TId;
  drivers: DriverBase[];
  builder: (ctx: GuardFeatureContext) => {
    expose: TExposed;
  } & TComponents;
  extracted: {
    expose: TExposed;
  } & TComponents;
};

export type ExposedFeatureFunctions<TFeature extends GuardFeature<any, any>> =
  TFeature extends GuardFeature<any, infer TExposed>
    ? TExposed
    : Record<never, never>;

export type CreateGuardFeatureOptions<
  TId extends string,
  TExposed extends ExposedFunctionMap,
  TComponents,
> = {
  id: TId;
  drivers: DriverBase[];
  builder: (ctx: GuardFeatureContext) => {
    expose: TExposed;
  } & TComponents;
};

export type FilterArray<TArray extends any[], TConstraint> = TArray extends [
  infer L,
  ...infer R,
]
  ? L extends TConstraint
    ? [L, ...FilterArray<R, TConstraint>]
    : FilterArray<R, TConstraint>
  : [];

export type CombineFeatures<TArray extends any[]> = TArray extends [
  {
    id: infer TId extends string;
    extracted: {
      expose: infer TExposed extends ExposedFunctionMap;
    };
  },
  ...infer R,
]
  ? Record<TId, TExposed> & CombineFeatures<R>
  : Record<never, never>;

export type FilterGuardFeatureType<
  TType extends GuardFeatureType,
  TFeatures extends GuardFeatureExtracted[],
> = FilterArray<TFeatures, { type: TType }>;

export type ExposedGuardFeatures<
  TType extends GuardFeatureType,
  TFeatures extends GuardFeatureExtracted[],
> = CombineFeatures<FilterGuardFeatureType<TType, TFeatures>>;

export function alias<
  const TId extends string,
  TType extends GuardFeatureType,
  TExposed extends ExposedFunctionMap,
>(
  id: TId,
  feature: GuardFeature<any, TType, TExposed>,
): GuardFeature<TId, TType, TExposed> {
  return { ...feature, id };
}
