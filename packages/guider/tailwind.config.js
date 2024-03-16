/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'gd-',
  content: ['./src/**/*.tsx', './src/**/*.ts'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.563rem',
      '2xl': '2.18rem',
    },
    fontFamily: {
      sans: ['"Rubik"', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
    },
  },
  plugins: [
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: {
          colors: {
            primary: '#50A0EA',
            primaryDark: '#1B65A9',
            primaryLight: '#89C6FF',
            text: '#668896',
            textLight: '#9AB3BD',
            textHeading: '#FFFFFF',
            bg: '#050F13',
            bgLight: '#07171C',
            bgLightest: '#081E24',
            bgDark: '#040C0F',
            line: '#0F2B33',

            codeWarning: '#222D20',
            codeError: '#2B1B1F',
            codeGreen: '#0B2823',
            codeHighlight: '#0E2429',
            codeWordHighlight: '#365C68',

            semanticTip: '#39B864',
            semanticTipLighter: '#75F2B6',
            semanticNote: '#817EF3',
            semanticNoteLighter: '#B9B8FC',
            semanticImportant: '#A958E8',
            semanticImportantLighter: '#D3A2F9',
            semanticWarning: '#C0BC43',
            semanticWarningLighter: '#ECE873',
            semanticCaution: '#FC6359',
            semanticCautionLighter: '#FFA59F',
          },
        },
      },
    }),
  ],
};
