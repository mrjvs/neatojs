import type { DriverBase } from 'drivers/types';
import type { ExtractedFeatures, GuardFeatureExtracted } from './features';
import type { MfaGuardFeature } from './features/mfa';
import type { TicketCreateOptions } from './ticket';
import { createUnverifiedTicket, createVerifiedTicket } from './ticket';

export type GuardMfaMethod = {
  id: string;
  type: string;
  enabled: boolean;
};

export async function getEnabledMfaMethodsForUser(
  features: GuardFeatureExtracted[],
  driver: DriverBase,
  userId: string,
): Promise<GuardMfaMethod[] | null> {
  const user = await driver.getUser(userId);
  if (!user) return null;
  const output: GuardMfaMethod[] = [];

  features.forEach((feat) => {
    if (feat.type !== 'mfa') return;
    const castedFeat = feat as ExtractedFeatures<[MfaGuardFeature]>[0];
    if (castedFeat.extracted.mfa.isEnabledForUser(user))
      output.push({
        enabled: true,
        id: castedFeat.id,
        type: castedFeat.extracted.mfa.getMfaType(),
      });
  });
  return output;
}

export async function getMfaDependentTicket(
  features: GuardFeatureExtracted[],
  driver: DriverBase,
  ticketOps: TicketCreateOptions,
) {
  const methods = await getEnabledMfaMethodsForUser(
    features,
    driver,
    ticketOps.userId,
  );
  if (methods === null) throw new Error('Could not get MFA status for user');

  if (methods.length > 0) return createUnverifiedTicket(ticketOps);
  return createVerifiedTicket(ticketOps);
}
