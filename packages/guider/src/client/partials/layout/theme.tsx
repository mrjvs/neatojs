import Color from 'color';
import { useContext, useMemo } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { GuiderLayoutContext } from '../../page/context';
import { useGuider } from '../../hooks/use-guider';

const helmetData = new HelmetData({});

function convertColor(color: string): string {
  return Color(color).rgb().array().join(' ');
}

export function ThemeProvider() {
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
