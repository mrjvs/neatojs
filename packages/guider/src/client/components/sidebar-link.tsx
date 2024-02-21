import Link from 'next/link';
import type { NavItemDescriptor } from '../types';
import { Icon } from './icon';

export function GuiderSidebarLink(props: { link: NavItemDescriptor }) {
  const link = props.link;
  return (
    <Link href={link.to} target={link.newTab ? '_blank' : undefined}>
      {link.icon ? <Icon icon={link.icon} /> : null}
      {link.title}
    </Link>
  );
}
