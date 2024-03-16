import Link from 'next/link';
import gitUrlParse, { stringify } from 'git-url-parse';
import { useGuiderFilePath } from '../../hooks/use-guider-filepath';

export function useEditLink(baseUrl: string | null | undefined): string | null {
  const file = useGuiderFilePath();
  if (!baseUrl) return null;
  if (!file) return null;
  const parsed = gitUrlParse(baseUrl);
  return `${stringify(
    parsed,
  )}/blob/${parsed.ref}/${parsed.filepath}/${file.filePath}`;
}

export function GithubEditLink(props: { href: string }) {
  return (
    <Link
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:gd-opacity-50"
    >
      Edit this page on GitHub
    </Link>
  );
}
