import type { DriverBase } from 'drivers/types';
import type {
  CombineFeatures,
  ExposedFunctionMap,
  ExposedGuardFeatures,
  GuardFeature,
  GuardFeatureType,
} from './features';

export type GuardOptions<TFeatures extends GuardFeature[]> = {
  driver: DriverBase;
  features: TFeatures;
};

export type Guard<TFeatures extends GuardFeature[]> = ExposedGuardFeatures<
  'login',
  TFeatures
> &
  ExposedGuardFeatures<'ticket', TFeatures> & {
    mfa: ExposedGuardFeatures<'mfa', TFeatures>;
  };

function combineFeatures<TFeatures extends GuardFeature[]>(
  features: TFeatures,
): CombineFeatures<TFeatures> {
  return features.reduce<Partial<Record<string, ExposedFunctionMap>>>(
    (acc, val) => {
      acc[val.id] = val.expose;
      return acc;
    },
    {},
  ) as CombineFeatures<TFeatures>;
}

function filterAndCombineFeatures<
  const TType extends GuardFeatureType,
  TFeatures extends GuardFeature[],
>(type: TType, features: TFeatures): ExposedGuardFeatures<TType, TFeatures> {
  return combineFeatures(
    features.filter((v) => v.type === type),
  ) as ExposedGuardFeatures<TType, TFeatures>;
}

export function createGuard<const TFeatures extends GuardFeature[]>(
  ops: GuardOptions<TFeatures>,
): Guard<TFeatures> {
  return {
    ...filterAndCombineFeatures('login', ops.features),
    ...filterAndCombineFeatures('ticket', ops.features),
    mfa: filterAndCombineFeatures('mfa', ops.features),
  };
}
