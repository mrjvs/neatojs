import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '../../components/icon';
import { useGuiderPage } from '../../hooks/use-guider-page';
import type { SocialTypes } from '../../../theme/components/social';

const iconMap: Record<SocialTypes, string> = {
  discord: 'ic:twotone-discord',
  github: 'mdi:github',
  slack: 'mdi:slack',
  mastodon: 'fa6-brands:mastodon',
  twitter: 'fa6-brands:x-twitter',
};

function FooterSocial(props: { icon: string; url: string }) {
  return (
    <Link
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className="gd-size-7 gd-flex gd-items-center gd-justify-center hover:gd-bg-bgLight gd-rounded"
    >
      <Icon icon={props.icon} className="gd-text-[1.1rem]" />
    </Link>
  );
}

function GithubEditLink(props: { baseUrl: string; pageUrl: string }) {
  // TODO actually implement edit link
  return (
    <Link
      href={props.baseUrl + props.pageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:gd-opacity-50"
    >
      Edit this page on GitHub
    </Link>
  );
}

export function ContentFooterInternal() {
  const year = new Date().getFullYear();
  const { site } = useGuiderPage();
  const { pathname } = useRouter();
  const copyright = <>Copyright &copy; {year}</>;
  const socials = site.contentFooter?.socials ?? [];

  return (
    <footer className="gd-py-3 gd-border-t gd-border-line gd-mt-12 gd-text-text gd-text-sm gd-flex gd-justify-between">
      <div className="gd-flex gd-gap-2 md:gd-gap-4 md:gd-items-center md:gd-flex-row gd-flex-col">
        {socials.length > 0 ? (
          <div className="gd-flex gd-items-center gd-space-x-0.5">
            {(site.contentFooter?.socials ?? []).map((v) => (
              <FooterSocial key={v.type} icon={iconMap[v.type]} url={v.url} />
            ))}
          </div>
        ) : null}
        <div>
          {site.contentFooter?.text ?? copyright}{' '}
          <span className="gd-text-line gd-mx-1">—</span> Powered by Guider
        </div>
      </div>
      {site.contentFooter?.editRepositoryBase ? (
        <div className="gd-w-40 gd-text-right">
          <GithubEditLink
            baseUrl={site.contentFooter.editRepositoryBase}
            pageUrl={pathname}
          />
        </div>
      ) : null}
    </footer>
  );
}
