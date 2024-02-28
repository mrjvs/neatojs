import { Icon as IconifyIcon } from '@iconify-icon/react';
import classNames from 'classnames';

export function Icon(props: { icon: string; className?: string }) {
  return (
    <span
      className={classNames(
        'gd-inline-flex gd-items-center gd-justify-center gd-size-[1em]',
        props.className,
      )}
    >
      <IconifyIcon icon={props.icon as any} />
    </span>
  );
}
