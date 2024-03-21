import { create } from 'zustand';

export interface ThemeColorStoreColors {
  primary?: string;
  primaryLighter?: string;
  primaryDarker?: string;
  background?: string;
  backgroundLighter?: string;
  backgroundLightest?: string;
  text?: string;
  textLighter?: string;
  textHighlight?: string;
  backgroundDarker?: string;
  line?: string;

  codeWarning?: string;
  codeError?: string;
  codeGreen?: string;
  codeHighlight?: string;
  codeWordHighlight?: string;

  semanticTip?: string;
  semanticTipLighter?: string;
  semanticNote?: string;
  semanticNoteLighter?: string;
  semanticImportant?: string;
  semanticImportantLighter?: string;
  semanticWarning?: string;
  semanticWarningLighter?: string;
  semanticCaution?: string;
  semanticCautionLighter?: string;
}

export interface ThemeColorStore {
  colors: ThemeColorStoreColors;
  setColor: (colors: ThemeColorStoreColors) => void;
  clearColors: () => void;
}

export const useThemeColorsStore = create<ThemeColorStore>((set) => ({
  colors: {},
  setColor: (colors) => {
    set((state) => ({ colors: { ...state.colors, ...colors } }));
  },
  clearColors: () => {
    set({ colors: {} });
  },
}));
