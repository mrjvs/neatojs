import { cancel, isCancel } from '@clack/prompts';

export function assertCancel(value: unknown) {
  if (isCancel(value)) {
    cancel('Cancelled installation.');
    process.exit(1);
  }
}
