import { Icon as IconifyIcon } from '@iconify-icon/react';
import classNames from 'classnames';

export function Icon(props: { icon: string; className?: string }) {
  return (
    <span className={classNames(props.className)}>
      <IconifyIcon inline height="1em" width="1em" icon={props.icon as any} />
    </span>
  );
}
