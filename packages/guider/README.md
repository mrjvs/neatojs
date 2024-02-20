# @neato/guider

Documentation site generator.

## Features
- Easy to write in, its just markdown
- Use react components in your markdown through MDX, with support for global components.
- customizable layouts, use layouts both in mdx files and outside
- Multiple documentations in one Next.JS app

## How to use it?
1. Make a Next.JS app: https://nextjs.org/docs/getting-started/installation
2. Install guider: `npm i next @neato/guider`
3. Put this in `next.config.js`:
```js
const { guider } = require('@neato/guider');

const withGuider = guider({
  themeConfig: './theme.config.ts',
});

module.exports = withGuider();
```
4. Create a file `theme.config.ts` and put this in it:
```ts
import { defineTheme } from '@neato/guider/client';

export default defineTheme({
  directories: [
    {
      title: 'Directory title',
      sidebarItems: {
        '/a': 'Page A',
        '/b': 'Page B',
      },
    },
  ],
});
```
5. Make a `pages/_app.ts` file and put this in it:
```ts
import type { AppProps } from 'next/app';
import '@neato/guider/style.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```
6. Make your first page by creating a new file `pages/index.mdx`, and put this in it:
```md
# Hello world

Welcome to guider!
```
7. You're all set. Have fun making docs!
