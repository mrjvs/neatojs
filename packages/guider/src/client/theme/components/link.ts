import type { LinkBuilder } from './types';

const nestedLink: LinkBuilder['nested'] = (
  titleOrOptions,
  urlOrItems,
  items,
) => {
  if (typeof titleOrOptions !== 'string') {
    return {
      ...titleOrOptions,
      type: 'nested-link',
    };
  }
  if (typeof urlOrItems !== 'string') {
    return {
      items: urlOrItems,
      newTab: false,
      title: titleOrOptions,
      type: 'nested-link',
    };
  }
  return {
    items,
    newTab: false,
    title: titleOrOptions,
    type: 'nested-link',
    to: urlOrItems,
  };
};

export const link: LinkBuilder = (titleOrOptions, url, ops) => {
  if (typeof titleOrOptions !== 'string') {
    return {
      ...titleOrOptions,
      type: 'nested-link',
    };
  }
  return {
    title: titleOrOptions,
    type: 'link',
    to: url,
    icon: ops?.icon,
    newTab: ops?.newTab ?? false,
  };
};
link.nested = nestedLink;
