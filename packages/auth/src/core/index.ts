import type { DriverBase } from 'drivers/types.js';
import { type ExposedGuardFeatures, type GuardFeature } from './features.js';

export type GuardOptions<TFeatures extends GuardFeature[]> = {
  driver: DriverBase;
  features: TFeatures;
};

export type Guard<TFeatures extends GuardFeature[]> = {
  mfa: ExposedGuardFeatures<'mfa', TFeatures>;
} & ExposedGuardFeatures<'login', TFeatures>;

export function createGuard<const TFeatures extends GuardFeature[]>(
  _ops: GuardOptions<TFeatures>,
): Guard<TFeatures> {
  return {} as any; // TODO
}
