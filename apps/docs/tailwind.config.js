/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
    extend: {
      colors: {
        primary: '#A880FF',
        primaryDark: '#6C3DD0',
        primaryLight: '#D0BAFF',
        text: '#668896',
        textLight: '#9AB3BD',
        textHeading: '#FFFFFF',
        bg: '#050F13',
        bgLight: '#07171C',
        bgLightest: '#081E24',
        bgDark: '#040C0F',
        line: '#0F2B33',
      },
    },
  },
  plugins: [],
};
