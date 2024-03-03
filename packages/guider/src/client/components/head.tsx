import { type ReactNode } from 'react';
import { useGuiderPage } from '@neato/guider/client';

// TODO these meta tags:
// twitter:url
// twitter:site:domain
// twitter:card
// theme-color
// msapplication-TileColor

export interface CommonMetaProps {
  baseUrl: string;
  icon?: string;
  image?: string;
  children?: ReactNode;
}

export function CommonMeta(props: CommonMetaProps) {
  const { page } = useGuiderPage();

  const title = page?.meta?.title ?? page?.headings[0]?.value;
  const desc = page?.meta?.description ?? page?.excerpt;

  return (
    <>
      {title ? (
        <>
          <meta key="gd-ogtitle" name="og:title" content={title} />
          <meta key="gd-twurl" name="twitter:url" content={title} />
          <meta
            key="gd-appletitle"
            name="apple-mobile-web-app-title"
            content={title}
          />
        </>
      ) : null}
      {desc ? (
        <meta key="gd-ogdesc" name="og:description" content={desc} />
      ) : null}
      {props.image ? (
        <>
          <meta key="gd-twimage" name="twitter:image" content={props.image} />
          <meta key="gd-ogimage" name="og:image" content={props.image} />
        </>
      ) : null}
      {props.icon ? <link rel="icon" href={props.icon} /> : null}
    </>
  );
}
