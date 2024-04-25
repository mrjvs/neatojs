import { SKIP, visit } from 'unist-util-visit';
import type { Heading, Root } from 'mdast';
import { phrasing } from 'mdast-util-phrasing';
import type { VFileWithOutput } from 'unified';

interface Section {
  heading?: { id: string; depth: Heading['depth']; text: string };
  content: string;
}

declare module 'mdast' {
  interface HeadingData {
    id: string;
  }
}

export function remarkSearchData() {
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
        const id = heading.data?.id ?? '';
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

      if (node.type === 'text' || node.type === 'inlineCode') {
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
        currentSection.content += node.value;

        previousParentNode = parent;
      }
    });

    if (currentSection) sections.push(currentSection);

    vFile.data = { ...vFile.data, sections };
  };
}
