import { Icon as IconifyIcon } from '@iconify-icon/react';
import classNames from 'classnames';

export function Icon(props: {
  icon: string;
  className?: string;
  inline?: boolean;
}) {
  return (
    <span
      className={classNames(
        'gd-inline-flex gd-size-[1.1em] gd-items-center gd-justify-center',
        props.inline ? '-gd-mt-[0.125em]' : undefined,
        props.className,
      )}
    >
      <IconifyIcon height="1em" width="1em" icon={props.icon as any} />
    </span>
  );
}
