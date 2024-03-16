import type { ReactNode } from 'react';

export function Frame(props: { children?: ReactNode; plain?: boolean }) {
  const content = (
    <div className="gd-relative gd-p-6 gd-min-h-44 gd-flex gd-items-center gd-justify-center">
      {props.children}
    </div>
  );

  if (props.plain) {
    return (
      <div className="neato-guider-frame gd-bg-bgLight/50 gd-mb-5 gd-relative gd-border gd-border-line gd-rounded-2xl gd-overflow-hidden">
        <div className="gd-bg-gradient-to-b gd-from-transparent gd-to-bg/90 gd-absolute gd-inset-0" />
        {content}
      </div>
    );
  }

  return (
    <div className="neato-guider-frame gd-bg-text/5 gd-mb-5 gd-relative gd-border gd-border-line gd-rounded-2xl gd-overflow-hidden">
      <div className="neato-guider-frame-grid gd-absolute gd-inset-0" />
      <div className="gd-bg-gradient-to-b gd-from-transparent gd-to-bg/90 gd-absolute gd-inset-0" />
      {content}
    </div>
  );
}
