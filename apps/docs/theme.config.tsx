import { defineTheme, directory, group, link, site } from '@neato/guider/theme';

const template = site('template', {
  github: 'mrjvs/neatojs',
  dropdown: [link('Guider', '/docs/guider'), link('Config', '/docs/config')],
  settings: {
    backgroundPattern: 'flare',
  },
  logo: {
    name: 'NeatoJS',
    to: '/',
  },
});

const gdGuides = (url: string) => `/docs/guider/guides${url}`;
const gdWriting = (url: string) => `/docs/guider/writing${url}`;

const starLinks = [
  link('Github', 'https://github.com/mrjvs/neatojs', {
    style: 'star',
    newTab: true,
    icon: 'akar-icons:github-fill',
  }),
  link('Discord', 'https://discord.gg/cGd5pKxWyK', {
    style: 'star',
    newTab: true,
    icon: 'fa6-brands:discord',
  }),
  link('Suggest features', 'https://github.com/mrjvs/neatojs/issues', {
    style: 'star',
    newTab: true,
    icon: 'streamline:chat-bubble-typing-oval-solid',
  }),
];

export default defineTheme([
  site('main', {
    extends: [template],
    directories: [
      directory('main', {
        sidebar: [],
      }),
    ],
  }),
  site('guider', {
    extends: [template],
    tabs: [
      link('Guides', '/docs/guider/guides'),
      link('Writing', '/docs/guider/writing'),
      link('API reference', '/docs/guider/api-reference'),
    ],
    directories: [
      directory('guider-docs', {
        sidebar: [
          ...starLinks,
          group('Getting started', [
            link('Installation', gdGuides('/getting-started/installation')),
            link.nested('Migrating to Guider', [
              link(
                'From Nextra',
                gdGuides('/getting-started/migration/from-nextra'),
              ),
              link(
                'From Docus',
                gdGuides('/getting-started/migration/from-docus'),
              ),
              link(
                'From Mintlify',
                gdGuides('/getting-started/migration/from-mintlify'),
              ),
            ]),
          ]),
          group('Configuration', [
            link('Colors & theme', gdGuides('/config/theming')),
            link('Redirects', gdGuides('/config/redirects')),
            link('SEO & Meta tags', gdGuides('/config/seo')),
            link('Landing page', gdGuides('/config/landing')),
            link('Navigation', gdGuides('/config/navigation')),
            link.nested('Common setups', [
              link(
                'Mutliple docs sites',
                gdGuides('/config/common/multi-docs'),
              ),
              link('API reference + docs', gdGuides('/config/common/api-ref')),
              link('Blog posts + docs', gdGuides('/config/common/blog')),
            ]),
            link('Examples', gdGuides('/config/examples')),
          ]),
          group('Advanced', [
            link('Running multiple sites', gdGuides('/advanced/multi-site')),
            link('Header', gdGuides('/advanced/header')),
            link('Footer', gdGuides('/advanced/footer')),
            link(
              'Customizing layout',
              gdGuides('/advanced/customizing-layout'),
            ),
            link('Deep-dive concepts', gdGuides('/advanced/deep-dive')),
          ]),
          group('Deploying', [
            link('Github Pages', gdGuides('/deploy/github-pages')),
            link('Netlify', gdGuides('/deploy/netlify')),
            link('Vercel', gdGuides('/deploy/vercel')),
            link('Cloudflare pages', gdGuides('/deploy/cloudflare')),
          ]),
        ],
      }),
      directory('guider-writing', {
        sidebar: [
          ...starLinks,
          group('Markdown', [
            link('Making pages', gdWriting('/markdown/making-pages')),
            link('Basic text', gdWriting('/markdown/basic-text')),
            link('Lists', gdWriting('/markdown/lists')),
            link('Code blocks', gdWriting('/markdown/code-blocks')),
          ]),

          group('Advanced markdown', [
            link('Tables', gdWriting('/advanced/tables')),
            link('Quotes', gdWriting('/advanced/quotes')),
            link('Footnotes', gdWriting('/advanced/footnotes')),
            link('Dividers', gdWriting('/advanced/dividers')),
          ]),

          group('Components', [
            link('Code groups', gdWriting('/components/code-groups')),
            link('Callouts', gdWriting('/components/callouts')),
            link('Tabs', gdWriting('/components/tabs')),
            link('Steps', gdWriting('/components/steps')),
            link('Frames', gdWriting('/components/frames')),
            link('Custom components', gdWriting('/components/custom')),
          ]),
        ],
      }),
      directory('guider-api-ref', {
        sidebar: [
          ...starLinks,
          group('Theme configuration', [
            link('defineTheme()', gdWriting('/writing/markdown')),
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
