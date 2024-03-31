import type { SeparatorComponent } from './separator';

export type NestedLinkComponentChildren = LinkComponent | SeparatorComponent;

export interface ExtraLinkOptions {
  icon?: string;
  newTab?: boolean;
  exact?: boolean;
  style?: 'star' | 'default';
}

export interface LinkOptions {
  title: string;
  to: string;
  exact?: boolean;
  icon?: string;
  newTab?: boolean;
}

export interface NestedLinkOptions {
  title: string;
  to?: string;
  exact?: boolean;
  icon?: string;
  newTab?: boolean;
  items: LinkComponent[];
}

export interface LinkComponent {
  type: 'link';
  title: string;
  to: string;
  newTab: boolean;
  exact?: boolean;
  icon?: string;
  style: 'star' | 'default';
}

export interface NestableLinkComponent {
  type: 'nested-link';
  title: string;
  to?: string;
  exact?: boolean;
  newTab: boolean;
  icon?: string;
  items: NestedLinkComponentChildren[];
}

export interface LinkFunctions {
  (title: string, url: string, ops?: ExtraLinkOptions): LinkComponent;
  (options: LinkOptions): LinkComponent;
}

export interface LinkBuilder extends LinkFunctions {
  nested: {
    (
      title: string,
      url: string,
      items: NestedLinkComponentChildren[],
    ): NestableLinkComponent;
    (
      title: string,
      items: NestedLinkComponentChildren[],
    ): NestableLinkComponent;
    (options: NestedLinkOptions): NestableLinkComponent;
  };
}

const nestedLink: LinkBuilder['nested'] = function (
  titleOrOptions: any,
  urlOrItems?: any,
  maybeItems?: any,
) {
  if (typeof titleOrOptions !== 'string') {
    const options: NestedLinkOptions = titleOrOptions;
    return {
      newTab: false,
      ...options,
      type: 'nested-link',
    };
  }
  if (typeof urlOrItems !== 'string') {
    const title: string = titleOrOptions;
    const items: NestedLinkComponentChildren[] = urlOrItems;
    return {
      items,
      newTab: false,
      title,
      type: 'nested-link',
    };
  }

  const items: NestedLinkComponentChildren[] = maybeItems;
  const title: string = titleOrOptions;
  const url: string = urlOrItems;
  return {
    items,
    newTab: false,
    title,
    type: 'nested-link',
    to: url,
  };
};

const linkFunc: LinkFunctions = function (
  titleOrOptions: any,
  maybeUrl?: any,
  maybeOps?: any,
) {
  if (typeof titleOrOptions !== 'string') {
    const options: LinkOptions = titleOrOptions;
    return {
      newTab: false,
      style: 'default',
      ...options,
      type: 'link',
    };
  }

  const title: string = titleOrOptions;
  const url: string = maybeUrl;
  const ops: ExtraLinkOptions | undefined = maybeOps;
  return {
    title,
    type: 'link',
    style: ops?.style ?? 'default',
    to: url,
    exact: ops?.exact,
    icon: ops?.icon,
    newTab: ops?.newTab ?? false,
  };
};
(linkFunc as LinkBuilder).nested = nestedLink;

export const link = linkFunc as LinkBuilder;
