import Color from 'color';
import { useContext, useMemo } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';
import { useThemeColorsStore } from 'src/client/stores/colors';
import { GuiderLayoutContext } from '../../page/context';
import { useGuider } from '../../hooks/use-guider';

const helmetData = new HelmetData({});

function convertColor(color: string): string {
  return Color(color).rgb().array().join(' ');
}

export function ThemeProvider() {
  const ctx = useContext(GuiderLayoutContext);
  const { settings } = useGuider(ctx?.meta);
  const serializedSettings = JSON.stringify(settings.colors);
  const overwrittenColors = useThemeColorsStore((s) => s.colors);
  const style = useMemo(() => {
    const colors = { ...settings.colors, ...overwrittenColors };
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
      '--colors-bgDark': convertColor(colors.backgroundDarker),
      '--colors-line': convertColor(colors.line),
      '--colors-codeWarning': convertColor(colors.codeWarning),
      '--colors-codeError': convertColor(colors.codeError),
      '--colors-codeGreen': convertColor(colors.codeGreen),
      '--colors-codeHighlight': convertColor(colors.codeHighlight),
      '--colors-codeWordHighlight': convertColor(colors.codeWordHighlight),
      '--colors-semanticTip': convertColor(colors.semanticTip),
      '--colors-semanticTipLighter': convertColor(colors.semanticTipLighter),
      '--colors-semanticNote': convertColor(colors.semanticNote),
      '--colors-semanticNoteLighter': convertColor(colors.semanticNoteLighter),
      '--colors-semanticImportant': convertColor(colors.semanticImportant),
      '--colors-semanticImportantLighter': convertColor(
        colors.semanticImportantLighter,
      ),
      '--colors-semanticWarning': convertColor(colors.semanticWarning),
      '--colors-semanticWarningLighter': convertColor(
        colors.semanticWarningLighter,
      ),
      '--colors-semanticCaution': convertColor(colors.semanticCaution),
      '--colors-semanticCautionLighter': convertColor(
        colors.semanticCautionLighter,
      ),
    };
  }, [serializedSettings, overwrittenColors]);
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
