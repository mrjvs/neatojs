/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'gd-',
  content: ['./src/**/*.tsx'],
  theme: {
    fontSize: {
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
            text: '#4A7181',
            textLight: '#789CAB',
            textHeading: '#FFFFFF',
            bg: '#050F13',
            bgLight: '#07171C',
            bgLightest: '#081E24',
            line: '#0F2B33',
          },
        },
      },
    }),
  ],
};
