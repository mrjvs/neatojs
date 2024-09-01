import type { UserType } from 'core/features';
import { mfaFeature } from 'core/features/mfa';
import type { UnverifiedTicket, VerifiedTicket } from 'core/ticket';
import { createVerifiedTicket } from 'core/ticket';
import type { DriverBase } from 'drivers/types';

export type TotpDriverTrait = {
  getTotpSettingsFromUser: (user: UserType) => {
    secret?: string;
    enabled: boolean;
  };
  saveTotpSecretAndDisable: (userId: string, secret: string) => Promise<string>;
  removeTotp: (userId: string) => Promise<void>;
  enableTotp: (userId: string) => Promise<void>;
};

export type TotpMfaOptions = {
  driver: DriverBase & TotpDriverTrait;
  issuer: string;
};

export type TotpPreperationDetails = {
  url: string;
};

function verifyTotpCode(_secret: string, _code: string): boolean {
  return true; // TODO check for real
}

export function totpMfa(ops: TotpMfaOptions) {
  return mfaFeature({
    id: 'totp',
    mfa: {
      isEnabledForUser(user) {
        const settings = ops.driver.getTotpSettingsFromUser(user);
        return settings.enabled;
      },
    },
    expose: {
      async remove(userId: string) {
        await ops.driver.removeTotp(userId);
      },

      async prepareUser(
        userId: string,
        accountName: string,
      ): Promise<TotpPreperationDetails> {
        const user = await ops.driver.getUser(userId);
        if (!user) throw new Error('Cannot find user');

        const secret = '1234'; // TODO generate secret
        await ops.driver.saveTotpSecretAndDisable(userId, secret);

        return {
          url: secret + accountName + ops.issuer, // TODO generate url
        };
      },

      async enable(userId: string, code: string): Promise<boolean> {
        const user = await ops.driver.getUser(userId);
        if (!user) throw new Error('Cannot find user');

        const settings = ops.driver.getTotpSettingsFromUser(user);
        if (!settings.secret) return false;

        if (!verifyTotpCode(settings.secret, code)) return false;
        await ops.driver.enableTotp(userId);
        return true;
      },

      sign(code: string, ticket: UnverifiedTicket): VerifiedTicket {
        const settings = ops.driver.getTotpSettingsFromUser(ticket.user);
        if (!settings.secret) throw new Error('Totp not configured for user');

        if (!verifyTotpCode(settings.secret, code))
          throw new Error('totp code wrong');

        return createVerifiedTicket({
          userId: ticket.userId,
          user: ticket.user,
        });
      },
    },
  });
}