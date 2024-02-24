import { useContext, type ReactNode, useMemo } from 'react';
import Color from 'color';
import { Helmet, HelmetData } from 'react-helmet-async';
import type { MetaConf } from '../../types';
import { GuiderLayoutContext, type MdxHeadings } from '../../page/context';
import { useGuider } from '../../hooks/use-guider';
import { LayoutInternal } from './layout';

export type InternalGuiderLayoutProps = {
  children?: ReactNode;
  meta?: MetaConf;
  headings?: MdxHeadings[];
};

const helmetData = new HelmetData({});

function convertColor(color: string): string {
  return Color(color).rgb().array().join(' ');
}

function ThemeProvider() {
  const ctx = useContext(GuiderLayoutContext);
  const { layoutSettings } = useGuider(ctx?.meta);
  const serializedSettings = JSON.stringify(layoutSettings.colors);
  const style = useMemo(() => {
    const colors = layoutSettings.colors;
    return {
      '--colors-primary': convertColor(colors.primary),
      '--colors-primaryDark': convertColor(colors.primaryDarker),
      '--colors-primaryLight': convertColor(colors.primaryLighter),
      '--colors-text': convertColor(colors.text),
      '--colors-textLight': convertColor(colors.textLighter),
      '--colors-textHeading': convertColor(colors.textHighlight),
      '--colors-bg': convertColor(colors.background),
      '--colors-bgLight': convertColor(colors.backgroundLighter),
      '--colors-bgLightest': convertColor(colors.backgroundLightest),
    };
  }, [serializedSettings]);
  return (
    <Helmet helmetData={helmetData}>
      <body
        style={
          Object.entries(style)
            .map((v) => v.join(': '))
            .join(';') as any
        }
      />
    </Helmet>
  );
}

export function GuiderLayout(props: InternalGuiderLayoutProps) {
  return (
    <GuiderLayoutContext.Provider
      value={{ meta: props.meta ?? {}, headings: props.headings ?? [] }}
    >
      <ThemeProvider />
      <LayoutInternal {...props} />
    </GuiderLayoutContext.Provider>
  );
}
