import { redirect } from 'next/navigation';

export type CreateRedirectOptions = {
  to: string;
};

export function createRedirect(opts: CreateRedirectOptions) {
  return () => redirect(opts.to);
}
