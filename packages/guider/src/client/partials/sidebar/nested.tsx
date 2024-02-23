import { useState } from 'react';
import { Icon } from '../../components/icon';
import type { NestableLinkComponent } from '../../theme/components';
import { SidebarLink } from './link';
import { SidebarSeperator } from './seperator';

export function SidebarNested(props: { link: NestableLinkComponent }) {
  const [open, setOpen] = useState(false);

  const nestedLink = props.link;
  return (
    <>
      <div
        className="gd-block gd-w-full gd-py-2 gd-px-4 gd-rounded-lg"
        onClick={() => {
          setOpen((v) => !v);
        }}
      >
        {nestedLink.icon ? (
          <Icon
            className="gd-inline-block text-[1.3rem] gd-mr-2"
            icon={nestedLink.icon}
          />
        ) : null}
        {nestedLink.title}
      </div>
      {(open ? nestedLink.items : []).map((link, i) => {
        const key = `--${i}`;
        if (link.type === 'link') return <SidebarLink key={key} link={link} />;
        if (link.type === 'seperator') return <SidebarSeperator key={key} />;
        return null;
      })}
    </>
  );
}
