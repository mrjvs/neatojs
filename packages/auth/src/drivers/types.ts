import type { UserType } from 'core/features.js';

export type DriverBase = {
  id: string;
  connect: () => Promise<void>;
  getUser: (userId: string) => Promise<UserType | null>;
};
