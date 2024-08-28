type AnyFunction = (...args: any) => any;
export type UserType = { id: string };
export type ExposedFunctionMap = Record<string, AnyFunction>;

export type GuardFeatureType = 'mfa' | 'login' | 'ticket';

export type GuardFeature<
  TId extends string = string,
  TType extends GuardFeatureType = GuardFeatureType,
  TExposed extends ExposedFunctionMap = Record<never, never>,
> = {
  type: TType;
  id: TId;
  expose: TExposed;
};

export type ExposedFeatureFunctions<TFeature extends GuardFeature<any, any>> =
  TFeature extends GuardFeature<any, infer TExposed>
    ? TExposed
    : Record<never, never>;

export type CreateGuardFeatureOptions<
  TId extends string,
  TExposed extends ExposedFunctionMap,
  TComponents,
> = TComponents & {
  id: TId;
  expose: TExposed;
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
    expose: infer TExposed extends ExposedFunctionMap;
  },
  ...infer R,
]
  ? Record<TId, TExposed> & CombineFeatures<R>
  : Record<never, never>;

export type FilterGuardFeatureType<
  TType extends GuardFeatureType,
  TFeatures extends GuardFeature[],
> = FilterArray<TFeatures, { type: TType }>;

export type ExposedGuardFeatures<
  TType extends GuardFeatureType,
  TFeatures extends GuardFeature[],
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
