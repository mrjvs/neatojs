import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

export type CreateRedirectOptions = {
  to: string;
};

function Redirect(props: { to: string; children?: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    router.push(props.to);
  }, []);

  return props.children;
}

export function createRedirect(opts: CreateRedirectOptions) {
  return () => <Redirect to={opts.to} />;
}