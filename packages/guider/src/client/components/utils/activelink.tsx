import { useRouter } from 'next/router';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';

export function useIsRouteActive(ops: {
  as?: string;
  href: string;
  exact?: boolean;
}) {
  const { asPath, isReady } = useRouter();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (!isReady) {
      setIsActive(false);
      return;
    }

    const linkPathname = new URL(ops.href, location.href).pathname;
    const activePathname = new URL(asPath, location.href).pathname;

    const linkPathArr = linkPathname.split('/').filter(Boolean);
    const activePathArr = activePathname.split('/').filter(Boolean);

    if (ops.exact) {
      const exactMatch = linkPathArr.join('/') === activePathArr.join('/');
      setIsActive(exactMatch);
      return;
    }

    let matches = true;
    for (let i = 0; i < linkPathArr.length; i++) {
      if (linkPathArr[i] !== activePathArr[i]) {
        matches = false;
      }
    }

    setIsActive(matches);
  }, [asPath, isReady, ops.href, ops.exact]);

  return isActive;
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
