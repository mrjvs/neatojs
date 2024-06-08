import {
  defineTheme,
  directory,
  group,
  link,
  site,
  siteTemplate,
  social,
  type SiteComponent,
} from '@neato/guider/theme';
import { Logo } from 'components/logo';

const template = siteTemplate({
  github: 'mrjvs/neatojs',
  dropdown: [link('Guider', '/docs/guider'), link('Config', '/docs/config')],
  navigation: [link('Showcase', '/showcase')],
  settings: {
    colors: {
      primary: '#A880FF',
      primaryDarker: '#6C3DD0',
      primaryLighter: '#D0BAFF',
    },
    backgroundPattern: 'flare',
    logo: () => <Logo />,
  },
  contentFooter: {
    editRepositoryBase: 'https://github.com/mrjvs/neatojs/tree/dev/apps/docs',
    socials: [
      social.discord('https://discord.gg/cGd5pKxWyK'),
      social.github('https://github.com/mrjvs/neatojs'),
    ],
  },
  meta: {
    titleTemplate: '%s - NeatoJS',
    additionalLinkTags: [
      {
        rel: 'icon',
        href: '/favicon.png',
      },
    ],
  },
});

const gdGuides = (url: string) => `/docs/guider/guides${url}`;
const gdWriting = (url: string) => `/docs/guider/writing${url}`;
const gdApi = (url: string) => `/docs/guider/api-reference${url}`;

const starLinks = [
  link('GitHub', 'https://github.com/mrjvs/neatojs', {
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
            link('Installation', gdGuides('/getting-started/installation'), {
              icon: 'fa6-solid:download',
            }),
            link('Development', gdGuides('/getting-started/development'), {
              icon: 'icon-park-solid:cpu',
            }),
            link.nested({
              title: 'Migrating to Guider',
              icon: 'fa6-solid:sailboat',
              items: [
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
              ],
            }),
          ]),
          group('Configuration', [
            link('Colors & theme', gdGuides('/config/theming')),
            link('Redirects', gdGuides('/config/redirects')),
            link('SEO & Meta tags', gdGuides('/config/seo')),
            link('Landing page', gdGuides('/config/landing')),
            link('Navigation', gdGuides('/config/navigation')),
            link.nested('Common setups', [
              link(
                'Multiple docs sites',
                gdGuides('/config/common/multi-docs'),
              ),
              link('API reference + docs', gdGuides('/config/common/api-ref')),
            ]),
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
            link('GitHub Pages', gdGuides('/deploy/github-pages')),
            link('Netlify', gdGuides('/deploy/netlify')),
            link('Vercel', gdGuides('/deploy/vercel')),
            link('Cloudflare Pages', gdGuides('/deploy/cloudflare')),
            link('Docker', gdGuides('/deploy/docker')),
          ]),
        ],
      }),
      directory('guider-writing', {
        sidebar: [
          ...starLinks,
          group('Markdown', [
            link('Making pages', gdWriting('/markdown/making-pages'), {
              icon: 'fa6-solid:file-lines',
            }),
            link('Basic text', gdWriting('/markdown/basic-text'), {
              icon: 'fa6-solid:font',
            }),
            link('Lists', gdWriting('/markdown/lists'), {
              icon: 'fa6-solid:list-ul',
            }),
            link('Code blocks', gdWriting('/markdown/code-blocks'), {
              icon: 'fa6-solid:code',
            }),
          ]),

          group('Advanced markdown', [
            link('Tables', gdWriting('/advanced/tables'), {
              icon: 'fa6-solid:table',
            }),
            link('Quotes', gdWriting('/advanced/quotes'), {
              icon: 'fa6-solid:quote-left',
            }),
            link('Footnotes', gdWriting('/advanced/footnotes'), {
              icon: 'fa6-solid:note-sticky',
            }),
            link('Dividers', gdWriting('/advanced/dividers'), {
              icon: 'fa6-solid:grip-lines',
            }),
          ]),

          group('Components', [
            link('Code groups', gdWriting('/components/code-groups'), {
              icon: 'fa6-solid:layer-group',
            }),
            link('Callouts', gdWriting('/components/callouts'), {
              icon: 'fa6-solid:bell-concierge',
            }),
            link('Tabs', gdWriting('/components/tabs'), {
              icon: 'fa6-solid:window-restore',
            }),
            link('Fields', gdWriting('/components/fields'), {
              icon: 'fa6-solid:rectangle-list',
            }),
            link('Steps', gdWriting('/components/steps'), {
              icon: 'fa6-solid:list-ol',
            }),
            link('Frames', gdWriting('/components/frames'), {
              icon: 'fa6-solid:image',
            }),
            link('Custom components', gdWriting('/components/custom'), {
              icon: 'fa6-solid:boxes-stacked',
            }),
          ]),
        ],
      }),
      directory('guider-api-ref', {
        sidebar: [
          ...starLinks,
          group('Theme configuration', [
            link('defineTheme()', gdApi('/theme/define-theme')),
            link('site()', gdApi('/theme/site')),
            link('siteTemplate()', gdApi('/theme/site-template')),
            link('directory()', gdApi('/theme/directory')),
            link('link()', gdApi('/theme/link')),
            link('group()', gdApi('/theme/group')),
            link('separator()', gdApi('/theme/separator')),
            link('component()', gdApi('/theme/component')),
            link('social()', gdApi('/theme/social')),
            link('Layout settings', gdApi('/theme/settings')),
          ]),

          group('Setup', [link('guider()', gdApi('/setup/guider'))]),

          group('_meta.json', [
            link('Structure of _meta.json', gdApi('/meta/structure')),
          ]),

          group('Client functions', [
            link('createRedirect()', gdApi('/functions/create-redirect')),
            link(
              'createNotFoundPage()',
              gdApi('/functions/create-not-found-page'),
            ),
            link('useGuider()', gdApi('/functions/use-guider')),
            link('useGuiderPage()', gdApi('/functions/use-guider-page')),
          ]),

          group('Theme components', [
            link('<GuiderHeader/>', gdApi('/components/guider-header')),
            link('<GuiderLayout/>', gdApi('/components/guider-layout')),
            link('<GuiderSidebar/>', gdApi('/components/guider-sidebar')),
            link('<GuiderToc/>', gdApi('/components/guider-toc')),
            link('<GuiderLogo/>', gdApi('/components/guider-logo')),
            link(
              '<GuiderContentFooter/>',
              gdApi('/components/guider-content-footer'),
            ),
            link(
              '<GuiderPageFooter/>',
              gdApi('/components/guider-page-footer'),
            ),
            link('<GuiderPageEnd/>', gdApi('/components/guider-page-end')),
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
          ...starLinks,
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
]) satisfies SiteComponent[];
