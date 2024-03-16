import type { SocialComponent } from './social';

export type ContentFooterOptions = {
  socials?: SocialComponent[];
  text?: string;
  editRepositoryBase?: string;
};

export type PageFooterOptions = {
  text?: string;
};

export type ContentFooterComponent = {
  socials?: SocialComponent[];
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
