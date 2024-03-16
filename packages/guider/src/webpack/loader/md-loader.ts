import { parse, format } from 'node:path';
import { compile } from '@mdx-js/mdx';
import remarkFrontmatter from 'remark-frontmatter';
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

const EXPORT_FOOTER = 'export default ';

export async function mdLoader(source: string): Promise<string> {
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

            // must be relative url
            const [path, hash] = url.split('#', 2);
            const parsedPath = parse(path);
            parsedPath.ext = '';
            parsedPath.base = '';
            const hashPath = hash && hash.length > 0 ? `#${hash}` : '';
            return `${format(parsedPath)}${hashPath}`;
          },
        },
      ],
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

  return `
    import { createMdxPage } from "@neato/guider/client";

    ${finalMdxCode}

    const __guiderPageOptions = {
      MDXContent,
      pageOpts: ${JSON.stringify(pageOpts)},
    }

    export default createMdxPage(__guiderPageOptions);
  `;
}
