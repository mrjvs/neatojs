import { defineTheme, directory, group, link, site } from '@neato/guider/theme';

const template = site('template', {
  github: 'mrjvs/neatojs',
  dropdown: [link('Guider', '/docs/guider'), link('Config', '/docs/config')],
  logo: {
    name: 'NeatoJS',
    to: '/',
  },
});

const starLinks = [
  link('Github', '/docs/guider/docs/a', {
    style: 'star',
    icon: 'akar-icons:github-fill',
  }),
  link('Discord', '/docs/guider/docs/d', {
    style: 'star',
    icon: 'fa6-brands:discord',
  }),
  link('Suggest features', '/docs/guider/docs/c', {
    style: 'star',
    icon: 'streamline:chat-bubble-typing-oval-solid',
  }),
];

export default defineTheme([
  site('guider', {
    extends: [template],
    tabs: [
      link('Guides', '/docs/guider/guides'),
      link('Writing', '/docs/guider/writing'),
      link('API reference', '/docs/guider/api-reference'),
    ],
    settings: {
      backgroundPattern: 'flare',
    },
    directories: [
      directory('guider-docs', {
        sidebar: [
          ...starLinks,
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
            link('Colors & theme', '/docs/guider/docs'),
            link('Redirects', '/docs/guider/docs'),
            link('SEO & Meta tags', '/docs/guider/docs'),
            link('Landing page', '/docs/guider/docs'),
            link('Navigation', '/docs/guider/docs'), // changing tabs, dropdown, sidebar
            link.nested('Common setups', [
              link('Mutliple docs sites', '/docs/guider/docs'),
              link('API reference + docs', '/docs/guider/docs'),
              link('Blog posts + docs', '/docs/guider/docs'),
            ]),
            link('Examples', '/docs/guider/docs'),
          ]),
          group('Advanced', [
            link('Running multiple sites', '/docs/guider/docs'), // How to use _meta.json and multiple dirs/sites
            link('Header', '/docs/guider/docs'), // Changing settings about header (just repo)
            link('Footer', '/docs/guider/docs'), // Changing settings footer
            link('Customising layout', '/docs/guider/docs'), // Custom partials
            link('Deep-dive concepts', '/docs/guider/docs'), // Deep dive into directories, sites and layouts
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
          ...starLinks,
          group('Markdown', [
            link('Making pages', '/docs/guider/docs'), // How to make pages
            link('Basic text', '/docs/guider/docs'), // Text & headings & inlines & links
            link('Lists', '/docs/guider/docs'), // tables
            link('Code blocks', '/docs/guider/docs'), // code blocks & npm2yarn
          ]),

          group('Advanced markdown', [
            link('Tables', '/docs/guider/docs'), // Making tables
            link('Quotes', '/docs/guider/docs'), // quotes
            link('Footnotes', '/docs/guider/docs'), // footnotes
            link('Dividers', '/docs/guider/docs'), // dividers
          ]),

          group('Components', [
            link('Code groups', '/docs/guider/docs'), // <CodeGroup/>
            link('Callouts', '/docs/guider/docs'), // <all tipes of callouts
            link('Tabs', '/docs/guider/docs'), // <Tabs />
            link('Frames', '/docs/guider/docs'), // <Frame />
            link('Custom components', '/docs/guider/docs'), // making custom components
          ]),
        ],
      }),
      directory('guider-api-ref', {
        sidebar: [
          ...starLinks,
          group('Theme configuration', [
            link('defineTheme()', '/docs/guider/docs'),
            link('site()', '/docs/guider/docs'),
            link('directory()', '/docs/guider/docs'),
            link('link()', '/docs/guider/docs'),
            link('group()', '/docs/guider/docs'),
            link('seperator()', '/docs/guider/docs'),
            link('component()', '/docs/guider/docs'),
          ]),

          group('_meta.json', [
            link('Structure of _meta.json', '/docs/guider/docs'),
          ]),

          group('Client functions', [
            link('createRedirect()', '/docs/guider/docs'),
            link('createNotFoundPage()', '/docs/guider/docs'),
            link('useGuider()', '/docs/guider/docs'),
            link('useGuiderPage()', '/docs/guider/docs'),
          ]),

          group('Theme components', [
            link('<GuiderHeader/>', '/docs/guider/docs'),
            link('<GuiderLayout/>', '/docs/guider/docs'),
            link('<GuiderSidebar/>', '/docs/guider/docs'),
            link('<GuiderToc/>', '/docs/guider/docs'),
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
