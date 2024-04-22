import type { LinkProps } from 'next/link.js';
import Link from 'next/link.js';
import type { ReactNode } from 'react';
import { useMemo, useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation.js';

export function isRouteAtive(
  link: string,
  currentPathname: string,
  exact?: boolean,
): boolean {
  const linkPathname = new URL(link, 'https://example.com').pathname;
  const activePathname = new URL(currentPathname, 'https://example.com')
    .pathname;

  const linkPathArr = linkPathname.split('/').filter(Boolean);
  const activePathArr = activePathname.split('/').filter(Boolean);

  if (exact) {
    const exactMatch = linkPathArr.join('/') === activePathArr.join('/');
    return exactMatch;
  }

  let matches = true;
  for (let i = 0; i < linkPathArr.length; i++) {
    if (linkPathArr[i] !== activePathArr[i]) {
      matches = false;
    }
  }

  return matches;
}

export function useAreRoutesActive(
  ops: {
    as?: string;
    href: string;
    exact?: boolean;
  }[],
) {
  const pathName = usePathname();

  const isActiveCheck = useCallback(
    (href: string, exact?: boolean) => {
      return isRouteAtive(href, pathName, exact);
    },
    [pathName],
  );

  const [actives, setActives] = useState<boolean[]>(ops.map(() => false));
  const opsString = JSON.stringify(ops);
  useEffect(() => {
    setActives(ops.map((v) => isActiveCheck(v.href, v.exact)));
  }, [pathName, opsString, isActiveCheck]);

  return actives;
}

export function useIsRouteActive(ops: {
  as?: string;
  href: string;
  exact?: boolean;
}) {
  const actives = useAreRoutesActive([ops]);
  return actives[0];
}

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  inactiveClassName?: string;
  target?: string;
  children?: ReactNode | ((props: { isActive: boolean }) => ReactNode);
};

const ActiveLink = ({
  activeClassName,
  exact,
  inactiveClassName,
  className,
  ...props
}: ActiveLinkProps) => {
  const isActive = useIsRouteActive({ href: props.href as string, exact });
  const computedClassName = useMemo(() => {
    if (isActive)
      return classNames('neato-guider-active-link', className, activeClassName);
    return classNames(className, inactiveClassName);
  }, [className, activeClassName, inactiveClassName, isActive]);

  const children =
    typeof props.children === 'function'
      ? props.children({ isActive })
      : props.children;
  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
