import { useRouter } from 'next/router';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName?: string;
  exactMatchClassName?: string;
  inactiveClassName?: string;
  target?: string;
};

const ActiveLink = ({
  children,
  activeClassName,
  exactMatchClassName,
  inactiveClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const { asPath, isReady } = useRouter();
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    if (isReady) {
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href,
      ).pathname;
      const activePathname = new URL(asPath, location.href).pathname;

      const linkPathArr = linkPathname.split('/').filter(Boolean);
      const activePathArr = activePathname.split('/').filter(Boolean);

      let matches = true;
      for (let i = 0; i < linkPathArr.length; i++) {
        if (linkPathArr[i] !== activePathArr[i]) {
          matches = false;
        }
      }

      const exactMatch = linkPathArr.join('/') === activePathArr.join('/');

      const newClassName = matches
        ? exactMatch
          ? classNames(className, exactMatchClassName || activeClassName)
          : classNames(className, activeClassName)
        : classNames(className, inactiveClassName);

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ]);

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
