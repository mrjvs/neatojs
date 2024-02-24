import type { GroupComponent } from '../../theme/components';
import { SidebarLink } from './link';
import { SidebarCustomComponent } from './component';
import { SidebarSeperator } from './seperator';

export function SidebarGroup(props: { group: GroupComponent }) {
  return (
    <>
      <h3 className="gd-text-sm neato-guider-sidebar-group gd-text-textHeading gd-px-4 gd-font-medium !gd-mb-2 !gd-mt-10">
        {props.group.title}
      </h3>
      {props.group.items.map((link, i) => {
        const key = `--${i}`;
        if (link.type === 'link') return <SidebarLink key={key} link={link} />;
        if (link.type === 'component')
          return <SidebarCustomComponent key={key} component={link} />;
        if (link.type === 'seperator') return <SidebarSeperator key={key} />;
        return null;
      })}
    </>
  );
}
