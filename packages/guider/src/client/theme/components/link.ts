import type {
  ExtraLinkOptions,
  LinkBuilder,
  LinkFunctions,
  LinkOptions,
  NestedLinkComponentChildren,
  NestedLinkOptions,
} from './types';

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
    to: url,
    icon: ops?.icon,
    newTab: ops?.newTab ?? false,
  };
};
(linkFunc as LinkBuilder).nested = nestedLink;

export const link = linkFunc;
