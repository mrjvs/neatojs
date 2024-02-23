import type { GroupComponent } from '../../theme/components';
import { SidebarLink } from './link';
import { SidebarCustomComponent } from './component';
import { SidebarSeperator } from './seperator';

export function SidebarGroup(props: { group: GroupComponent }) {
  return (
    <>
      <h3 className="gd-text-sm gd-text-textHeading gd-font-medium gd-mb-2">
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
