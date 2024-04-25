import { compile } from '@mdx-js/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import type { Heading } from '@vcarl/remark-headings';
import remarkHeadings from '@vcarl/remark-headings';
import remarkHeadingId from 'remark-heading-id';
import grayMatter from 'gray-matter';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeExtractExcerpt from 'rehype-extract-excerpt';
import remarkLinkRewrite from 'remark-link-rewrite';
import { remarkNpm2Yarn } from '@theguild/remark-npm2yarn';
import remarkGfm from 'remark-gfm';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
  transformerNotationWordHighlight,
  transformerNotationErrorLevel,
} from '@shikijs/transformers';
import { remarkSearchData } from './search-data';

const EXPORT_FOOTER = 'export default ';

export async function mdLoader(source: string) {
  const meta = grayMatter(source);
  const file = await compile(source, {
    jsx: true,
    outputFormat: 'program',
    format: 'detect',
    providerImportSource: '@neato/guider/client',
    remarkPlugins: [
      remarkFrontmatter,
      [remarkHeadingId, { defaults: true }],
      remarkHeadings,
      [
        remarkNpm2Yarn,
        {
          packageName: '@neato/guider/client',
          tabNamesProp: 'items',
          storageKey: '__guider_packageManager',
        },
      ],
      remarkGfm,
      [
        remarkLinkRewrite,
        {
          replacer: (url: string) => {
            const hasProtocol = Boolean(url.match(/[a-zA-Z]+:/g));
            if (hasProtocol) return url;

            const [path, hash] = url.split('#', 2);

            const pathSections = path.split('/');
            const lastSectionIndex = pathSections.length - 1;

            // We get the last section so that only the last extension is removed
            // e.g. bar.ts.mdx -> bar.ts
            const lastDot = pathSections[lastSectionIndex].lastIndexOf('.');

            // If there is no dot, there is no extension to remove so we can return the url as is
            if (lastDot === -1) return url;

            pathSections[lastSectionIndex] = pathSections[
              lastSectionIndex
            ].slice(0, lastDot);

            const hashPath = hash && hash.length > 0 ? `#${hash}` : '';
            return `${pathSections.join('/')}${hashPath}`;
          },
        },
      ],
      remarkSearchData,
    ],
    rehypePlugins: [
      rehypeExtractExcerpt,
      [
        rehypePrettyCode,
        {
          defaultLang: 'txt',
          keepBackground: false,
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationFocus(),
            transformerNotationWordHighlight(),
            transformerNotationErrorLevel(),
          ],
        },
      ],
    ],
  });

  const mdxCode = file.toString();
  const lastIndexOfFooter = mdxCode.lastIndexOf(EXPORT_FOOTER);
  const finalMdxCode =
    mdxCode.slice(0, lastIndexOfFooter) +
    mdxCode.slice(lastIndexOfFooter + EXPORT_FOOTER.length);

  const pageOpts = {
    meta: meta.data,
    headings: file.data.headings,
    excerpt: file.data.excerpt,
  };

  const firstHeading = (file.data.headings as Heading[]).find(
    (h) => h.depth === 1,
  );

  const script = `
    import { createMdxPage } from "@neato/guider/client";

    ${finalMdxCode}

    const __guiderPageOptions = {
      MDXContent,
      pageOpts: ${JSON.stringify(pageOpts)},
    }

    export default createMdxPage(__guiderPageOptions);
  `;

  return {
    script,
    searchData: {
      sections: file.data.sections,
      pageTitle: meta.data?.title ?? firstHeading?.value ?? undefined,
    },
  };
}
