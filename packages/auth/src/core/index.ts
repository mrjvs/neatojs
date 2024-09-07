import { pino } from 'pino';
import type { BaseLogger, Level } from 'pino';
import type { DriverBase } from 'drivers/types';
import type {
  CombineFeatures,
  ExposedFunctionMap,
  ExposedGuardFeatures,
  ExtractedFeatures,
  GuardFeature,
  GuardFeatureContext,
  GuardFeatureExtracted,
  GuardFeatureType,
} from './features';
import type { GuardMfaMethod } from './mfa';
import { getEnabledMfaMethodsForUser, getMfaDependentTicket } from './mfa';

// TODO make error class for all errors thrown by the features
// TODO global backup code system for MFA
// TODO global way to make a temporary ticket and temporary token for ticket

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
    mfa: ExposedGuardFeatures<'mfa', ExtractedFeatures<TFeatures>> & {
      getEnabledMfaMethodsForUser: (
        userId: string,
      ) => Promise<GuardMfaMethod[]>;
    };
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
    getMfaDependentTicket(ticketOps) {
      return getMfaDependentTicket(features, ops.driver, ticketOps);
    },
  };
  const features = ops.features.map((v: TFeatures[number]) => ({
    ...v,
    extracted: v.builder(ctx),
  })) as ExtractedFeatures<TFeatures>;
  const allDrivers = [
    ...ops.features.map((v) => v.drivers),
    [ops.driver],
  ].flat();
  const drivers = [...new Set(allDrivers)];

  return {
    ...filterAndCombineFeatures('login', features),
    ...filterAndCombineFeatures('ticket', features),
    mfa: {
      ...filterAndCombineFeatures('mfa', features),
      async getEnabledMfaMethodsForUser(userId) {
        const methods = await getEnabledMfaMethodsForUser(
          features,
          ops.driver,
          userId,
        );
        return methods ?? [];
      },
    },
    async initialize() {
      for (const driver of drivers) {
        await driver.connect();
      }
    },
  };
}
