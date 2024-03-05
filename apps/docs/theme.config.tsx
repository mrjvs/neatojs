import { defineTheme, directory, group, link, site } from '@neato/guider/theme';

const template = site('template', {
  github: 'mrjvs/neatojs',
  dropdown: [link('Guider', '/docs/guider'), link('Config', '/docs/config')],
});

export default defineTheme([
  site('guider', {
    extends: [template],
    tabs: [
      link('Guides', '/docs/guider/docs'),
      link('Writing', '/docs/guider/writing'),
      link('API reference', '/docs/guider/api-reference'),
    ],
    directories: [
      directory('guider-docs', {
        sidebar: [
          // TODO
          //  -> SEO + meta tags
          //  -> register global components
          //  -> Changing markdown to custom components
          //  -> Common setups:
          //      -> Multiple documentation sites
          //      -> API reference + documentation
          //      -> Blog posts + documentation
          //  -> Redirects
          //  -> landing page
          //  -> examples
          //  -> API reference of theme file and _meta.json files
          group('Getting started', [
            link('Installation', '/docs/guider/docs/test'), // making a new project
            link('Setting up', '/docs/guider/docs'), // basic of configuring a project
            link.nested('Migrating to Guider', [
              link('From Nextra', '/docs/guider/docs'), // nextra -> guider
              link('From Docus', '/docs/guider/docs'), // docus -> guider
              link('From Mintlify', '/docs/guider/docs'), // mintlify -> guider
            ]),
          ]),
          group('Configuration', [
            link('Colors & theme', '/docs/guider/docs'), // background pattern + colors
            link('Header', '/docs/guider/docs'), // top nav links + dropdown + github repo
            link('Tabs', '/docs/guider/docs'), // top nav tabs
            link('Sidebar', '/docs/guider/docs'), // sidebar links
            link('Footer', '/docs/guider/docs'), // footer
            link('Changing the parts', '/docs/guider/docs'), // custom partials
            link('Deep-dive concepts', '/docs/guider/docs'), // Deep dive into directories, sites and more
          ]),
          group('Deploying', [
            link('Github Pages', '/docs/guider/docs'), // deploy on github pages
            link('Netlify', '/docs/guider/docs'), // Deploy on netlify
            link('Vercel', '/docs/guider/docs'), // Deploy on Vercel
            link('Cloudflare pages', '/docs/guider/docs'), // Deploy on CF pages
          ]),
        ],
      }),
      directory('guider-writing', {
        sidebar: [
          // all markdown basics
          group('Markdown', [
            link('Making pages', '/docs/guider/docs'), // How to make pages
            link('Basic text', '/docs/guider/docs'), // Text & headings & inlines & links
            link('Lists', '/docs/guider/docs'), // tables
            link('Code blocks', '/docs/guider/docs'), // code blocks & npm2yarn
          ]),

          // more specific markdown
          group('Advanced markdown', [
            link('Tables', '/docs/guider/docs'), // Making tables
            link('Quotes', '/docs/guider/docs'), // quotes
            link('Footnotes', '/docs/guider/docs'), // footnotes
            link('Dividers', '/docs/guider/docs'), // dividers
          ]),

          // Built-in components and making your own
          group('Components', [
            link('Code groups', '/docs/guider/docs'), // <CodeGroup/>
            link('Callouts', '/docs/guider/docs'), // <all tipes of callouts
            link('Tabs', '/docs/guider/docs'), // <Tabs />
            link('Frames', '/docs/guider/docs'), // <Frame />
            link('Custom components', '/docs/guider/docs'), // making custom components
          ]),
        ],
      }),
    ],
  }),
  site('config', {
    extends: [template],
    directories: [
      directory('main', {
        sidebar: [
          group('Guide', [
            link('Why use @neato/config', '/docs/config/guide/why-neat-config'),
            link('Installation', '/docs/config/guide/installation'),
            link('Usage', '/docs/config/guide/usage'),
            link('Basic example', '/docs/config/guide/basic-example'),
          ]),
          group('API', [
            link('Loaders', '/docs/config/api/loaders'),
            link('Schemas', '/docs/config/api/schemas'),
            link('Formatting', '/docs/config/api/formatting'),
            link('Fragments', '/docs/config/api/fragments'),
            link('Error handling', '/docs/config/api/errors'),
            link('Utilities', '/docs/config/api/utils'),
          ]),
          group('Miscellaneous', [
            link('Security', '/docs/config/misc/security'),
            link('Changelog', '/docs/config/misc/changelog'),
          ]),
        ],
      }),
    ],
  }),
]);
