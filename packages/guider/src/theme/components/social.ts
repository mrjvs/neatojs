export type SocialTypes =
  | 'slack'
  | 'mastodon'
  | 'twitter'
  | 'discord'
  | 'github';

interface SocialOptions {
  type: SocialTypes;
  url: string;
}

export interface SocialComponent {
  type: SocialTypes;
  url: string;
}

function makeSocialBuilder(
  type: SocialTypes,
): (url: string) => SocialComponent {
  return (url: string) => {
    return {
      type,
      url,
    };
  };
}

export type SocialBuilder = {
  twitter: (url: string) => SocialComponent;
  mastodon: (url: string) => SocialComponent;
  slack: (url: string) => SocialComponent;
  discord: (url: string) => SocialComponent;
  x: (url: string) => SocialComponent;
  github: (url: string) => SocialComponent;
  (options: SocialOptions): SocialComponent;
};

const socialFunc = (ops: SocialOptions) => {
  return ops;
};

(socialFunc as SocialBuilder).discord = makeSocialBuilder('discord');
(socialFunc as SocialBuilder).twitter = makeSocialBuilder('twitter');
(socialFunc as SocialBuilder).mastodon = makeSocialBuilder('mastodon');
(socialFunc as SocialBuilder).slack = makeSocialBuilder('slack');
(socialFunc as SocialBuilder).x = makeSocialBuilder('twitter');
(socialFunc as SocialBuilder).github = makeSocialBuilder('github');

export const social = socialFunc as SocialBuilder;
