import { useRouter } from 'next/router';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  inactiveClassName?: string;
  target?: string;
};

const ActiveLink = ({
  children,
  activeClassName,
  exact,
  inactiveClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const { asPath, isReady } = useRouter();
  const [isActive, setIsActive] = useState(false);
  const computedClassName = useMemo(() => {
    if (isActive) return classNames(className, activeClassName);
    return classNames(className, inactiveClassName);
  }, [className, activeClassName, inactiveClassName, isActive]);

  useEffect(() => {
    if (!isReady) {
      setIsActive(false);
      return;
    }

    const linkPathname = new URL(
      (props.as || props.href) as string,
      location.href,
    ).pathname;
    const activePathname = new URL(asPath, location.href).pathname;

    const linkPathArr = linkPathname.split('/').filter(Boolean);
    const activePathArr = activePathname.split('/').filter(Boolean);

    if (exact) {
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
  }, [asPath, isReady, props.as, props.href, exact]);

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
