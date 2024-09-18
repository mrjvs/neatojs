import type { UserType } from 'core/features';
import { loginFeature } from 'core/features/login';
import * as hashing from './utils/hashing';
import type { PasswordLoginContext, PasswordLoginOptions } from './types';
import { verifyPassword } from './parts/verifyPassword';
import type { UpdatePasswordOptions } from './parts/updatePassword';
import {
  unsafeForceUpdatePassword,
  updatePassword,
} from './parts/updatePassword';
import type { PasswordLoginInput } from './parts/login';
import { login } from './parts/login';

// TODO password reset links
// TODO email verification - seperate feature
export function passwordLogin(ops: PasswordLoginOptions) {
  return loginFeature({
    id: 'password',
    drivers: [ops.driver],
    builder: (ctx) => {
      const passwordContext: PasswordLoginContext = {
        ctx,
        driver: ops.driver,
        verifyPassword: ops.hashing?.verifyPassword ?? hashing.verifyPassword,
        hashPassword: ops.hashing?.hashPassword ?? hashing.hashPassword,
      };
      return {
        expose: {
          verifyPassword(user: UserType, password: string) {
            return verifyPassword(passwordContext, user, password);
          },
          async unsafeForceUpdatePassword(userId: string, newPassword: string) {
            return unsafeForceUpdatePassword(
              passwordContext,
              userId,
              newPassword,
            );
          },
          async updatePassword(options: UpdatePasswordOptions) {
            return updatePassword(passwordContext, options);
          },
          async login(input: PasswordLoginInput) {
            return login(passwordContext, input);
          },
        },
      };
    },
  });
}
