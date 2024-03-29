import { makeKey } from 'src/client/utils/make-key';
import type { GroupComponent, GroupComponentChildren } from '../../../theme';
import { SidebarLink } from './link';
import { SidebarCustomComponent } from './component';
import { SidebarSeparator } from './separator';
import { SidebarNested } from './nested';

export function SidebarGroup(props: {
  group: GroupComponent<GroupComponentChildren>;
}) {
  return (
    <>
      <h3 className="gd-text-sm neato-guider-sidebar-group gd-text-textHeading gd-px-4 gd-font-medium !gd-mb-2 !gd-mt-10">
        {props.group.title}
      </h3>
      {props.group.items.map((link, i) => {
        const key = makeKey(i, link);
        if (link.type === 'link') return <SidebarLink key={key} link={link} />;
        if (link.type === 'nested-link')
          return <SidebarNested key={key} link={link} />;
        if (link.type === 'component')
          return <SidebarCustomComponent key={key} component={link} />;
        if (link.type === 'separator') return <SidebarSeparator key={key} />;
        return null;
      })}
    </>
  );
}
