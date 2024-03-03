export type ContentFooterOptions = {
  socials?: any[]; // TODO
  text?: string;
  editRepositoryBase?: string;
};

export type PageFooterOptions = {
  text?: string;
};

export type ContentFooterComponent = {
  socials: any[]; // TODO
  text?: string;
  editRepositoryBase?: string;
};

export type PageFooterComponent = {
  text?: string;
};

export function populateContentFooter(
  ops: ContentFooterOptions,
): ContentFooterComponent {
  return {
    ...ops,
    socials: ops.socials ?? [],
  };
}
