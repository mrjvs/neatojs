import type { DriverBase } from 'drivers/types';
import type {
  CombineFeatures,
  ExposedFunctionMap,
  ExposedGuardFeatures,
  GuardFeature,
  GuardFeatureContext,
  GuardFeatureExtracted,
  GuardFeatureType,
} from './features';

// TODO function to get enabled MFA methods for user
// TODO make error class for all errors thrown by the features
// TODO global logging configuration or use custom logger
// TODO global backup code system for MFA
// TODO global way to make a temporary ticket and temporary token for ticket
// TODO global setup function (that calls connect on driver and all features)

type ExtractedFeatures<TFeatures extends GuardFeature[]> = TFeatures extends [
  infer L extends GuardFeature,
  ...infer R extends GuardFeature[],
]
  ? [
      L & {
        extracted: ReturnType<L['builder']>;
      },
      ...ExtractedFeatures<R>,
    ]
  : [];

export type GuardOptions<TFeatures extends GuardFeature[]> = {
  driver: DriverBase;
  features: TFeatures;
};

export type Guard<TFeatures extends GuardFeatureExtracted[]> =
  ExposedGuardFeatures<'login', TFeatures> &
    ExposedGuardFeatures<'ticket', TFeatures> & {
      mfa: ExposedGuardFeatures<'mfa', TFeatures>;
      initialize: () => Promise<void>;
    };

function combineFeatures<TFeatures extends GuardFeatureExtracted[]>(
  features: TFeatures,
): CombineFeatures<TFeatures> {
  return features.reduce<Partial<Record<string, ExposedFunctionMap>>>(
    (acc, val) => {
      acc[val.id] = val.extracted.expose;
      return acc;
    },
    {},
  ) as CombineFeatures<TFeatures>;
}

function filterAndCombineFeatures<
  const TType extends GuardFeatureType,
  TFeatures extends GuardFeatureExtracted[],
>(type: TType, features: TFeatures): ExposedGuardFeatures<TType, TFeatures> {
  return combineFeatures(
    features.filter((v) => v.type === type),
  ) as ExposedGuardFeatures<TType, TFeatures>;
}

export function createGuard<const TFeatures extends GuardFeature[]>(
  ops: GuardOptions<TFeatures>,
): Guard<ExtractedFeatures<TFeatures>> {
  const ctx: GuardFeatureContext = {
    logger: 42,
  };
  const features = ops.features.map((v: TFeatures[number]) => ({
    ...v,
    extracted: v.builder(ctx),
  })) as ExtractedFeatures<TFeatures>;
  const drivers = [...new Set(ops.features.map((v) => v.drivers).flat())];

  return {
    ...filterAndCombineFeatures('login', features),
    ...filterAndCombineFeatures('ticket', features),
    mfa: filterAndCombineFeatures('mfa', features),
    async initialize() {
      for (const driver of drivers) {
        await driver.connect();
      }
    },
  };
}
