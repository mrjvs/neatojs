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
import { SKIP, visit } from 'unist-util-visit';
import type { Heading, HeadingData, Root } from 'mdast';
import { phrasing } from 'mdast-util-phrasing';
import type { VFileWithOutput } from 'unified';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
  transformerNotationWordHighlight,
  transformerNotationErrorLevel,
} from '@shikijs/transformers';

const EXPORT_FOOTER = 'export default ';

interface Section {
  heading?: { id: string; depth: Heading['depth']; text: string };
  content: string;
}

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
      () => {
        return (root: Root, vFile: VFileWithOutput<any>) => {
          const sections: Section[] = [];

          let currentSection: Section | undefined;
          let previousParentNode: any;

          visit(root, (node, _, parent) => {
            if (node.type === 'heading') {
              if (currentSection) {
                sections.push(currentSection);
              }

              const heading = node;
              const id = (heading.data as HeadingData & { id: string })?.id;
              const depth = heading.depth;
              let text = '';
              visit(heading, ['text', 'inlineCode'], (hChild: any) => {
                text += hChild.value;
              });

              currentSection = {
                heading: {
                  id,
                  depth,
                  text,
                },
                content: '',
              };

              return SKIP;
            }

            const types = ['text', 'inlineCode'];

            if (types.includes(node.type)) {
              if (!currentSection) {
                currentSection = {
                  heading: undefined,
                  content: '',
                };
              }

              if (
                previousParentNode &&
                previousParentNode !== parent &&
                !phrasing(previousParentNode)
              ) {
                currentSection.content += ' ';
              }
              currentSection.content += (node as any).value;

              previousParentNode = parent;
            }
          });

          if (currentSection) sections.push(currentSection);

          vFile.data = { ...vFile.data, sections };
        };
      },
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
    },
  };
}
