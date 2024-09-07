import { pino } from 'pino';
import type { BaseLogger, Level } from 'pino';
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
  logger?:
    | BaseLogger
    | {
        level: Level;
      };
  driver: DriverBase;
  features: TFeatures;
};

export type Guard<TFeatures extends GuardFeature[]> = ExposedGuardFeatures<
  'login',
  ExtractedFeatures<TFeatures>
> &
  ExposedGuardFeatures<'ticket', ExtractedFeatures<TFeatures>> & {
    mfa: ExposedGuardFeatures<'mfa', ExtractedFeatures<TFeatures>>;
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
): Guard<TFeatures> {
  const logger =
    ops.logger && 'info' in ops.logger
      ? ops.logger
      : pino({ level: ops.logger?.level ?? 'silent' }).child({ src: 'guard' });
  const ctx: GuardFeatureContext = {
    logger,
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
