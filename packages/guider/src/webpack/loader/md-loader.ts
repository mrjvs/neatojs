import { compile } from '@mdx-js/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import grayMatter from 'gray-matter';

const EXPORT_FOOTER = 'export default ';

export async function mdLoader(source: string): Promise<string> {
  const meta = grayMatter(source);
  const file = await compile(source, {
    jsx: true,
    outputFormat: 'program',
    format: 'detect',
    remarkPlugins: [remarkFrontmatter],
  });

  const mdxCode = file.toString();
  const lastIndexOfFooter = mdxCode.lastIndexOf(EXPORT_FOOTER);
  const finalMdxCode =
    mdxCode.slice(0, lastIndexOfFooter) +
    mdxCode.slice(lastIndexOfFooter + EXPORT_FOOTER.length);

  const pageOpts = {
    meta: meta.data,
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
