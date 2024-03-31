import Link from 'next/link.js';
import gitUrlParse, { stringify } from 'git-url-parse';
import { useGuiderFilePath } from '../../hooks/use-guider-filepath';

export function useEditLink(baseUrl: string | null | undefined): string | null {
  const file = useGuiderFilePath();
  if (!baseUrl) return null;
  if (!file) return null;
  const parsed = gitUrlParse(baseUrl);
  let filePath = parsed.filepath;
  filePath += filePath.length > 0 ? '/' : '';
  filePath += file.urlSafeFilePath;

  // Resets the filepath as we want to manually construct it
  parsed.filepath = '';
  const ref = parsed.ref.length > 0 ? parsed.ref : 'main';
  return `${stringify(parsed)}/blob/${ref}/${filePath}`;
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
