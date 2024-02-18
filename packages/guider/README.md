# @neato/guider

Documentation site generator.

## Features
- Easy to write in, its just markdown
- Use react components in your markdown through MDX, with support for global components.
- customizable layouts, use layouts both in mdx files and outside
- Multiple documentations in one Next.JS app

## The internal structure
- webpack plugin
  - Loads map metadata files to a path, puts it in a cache (webpack context)
  - Load correct path to the theme file, stores it in cache (webpack context)
  - Make virtual module to import theme file
  - Make virtual module for serialized metadata cache
  - These virtual modules are importable from app context
- webpack loader
  - Loads all mdx and md files (webpack context), transforms into JS
  - The JS will be an object and a call to `createGuiderPage(obj)`
  - The JS will be transfered to the app context
- `guider.config.tsx`
  - It contains all app-side configuration for guider
  - It is exclusively on the app context, it doesn't go into compilation territory
  - Configurable per layout:
    - Replace Header, Footer, Sidebar
    - HeaderOptions - options for the default header
- `useGuider()` hook
  - It will resolve the full metadata based on path and return it
  - It will get the theme configuration and return it
  - It will resolve the current layout based on metadata+theme and return it
- `<GuiderLayout />` component
  - It will use `useGuider()` to get the current layout and display it

So in short
1. **WEBPACK:** plugin loads metadata files
2. **WEBPACK:** loader compiles md/mdx files into JS
3. **WEBPACK->APP:** webpack transfers JS code to app context
4. **WEBPACK->APP:** webpack virtual modules to inject metadata cache
4. **WEBPACK->APP:** webpack virtual modules to import theme file
6. **APP:** Resolve layout per page in `useGuider()`
