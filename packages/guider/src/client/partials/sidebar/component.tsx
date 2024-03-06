import { Fragment } from 'react';
import type { CustomComponentComponent } from '../../../theme';

export function SidebarCustomComponent(props: {
  component: CustomComponentComponent;
}) {
  return <Fragment>{props.component.component?.() ?? null}</Fragment>;
}
