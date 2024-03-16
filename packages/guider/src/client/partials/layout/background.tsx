import { useGuiderPage } from '../../hooks/use-guider-page';

function Shard() {
  return (
    <div className="gd-opacity-25 gd-absolute gd-inset-0 gd-overflow-hidden gd-pointer-events-none">
      <div className="gd-absolute -gd-top-[50vh] gd-right-1/3 gd-bg-primary gd-w-[270px] gd-h-[750px] gd-rotate-[-50deg] gd-blur-[200px]"></div>
      <div className="gd-opacity-50 gd-absolute -gd-top-[25vh] gd-right-1/4 gd-bg-primaryDark gd-w-[214px] gd-h-[884px] gd-rotate-[-22.1deg] gd-blur-[200px]"></div>
    </div>
  );
}

export function LayoutBackground() {
  const { settings } = useGuiderPage();

  if (!settings.backgroundPatternState) return null;
  if (settings.backgroundPatternSetting === 'flare') return <Shard />;
  return null;
}
