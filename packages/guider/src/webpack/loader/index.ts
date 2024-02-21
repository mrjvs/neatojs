import type { LoaderContext } from 'webpack';
import { findPagesDir } from 'next/dist/lib/find-pages-dir.js';
import { runScanner } from '../plugin/plugin';
import type { GuiderInitConfig } from '../../types';
import { mdLoader } from './md-loader';
import { virtualLoader } from './virtual-loader';

export interface LoaderOptions {
  type?: 'mdx';
  guiderConfig?: GuiderInitConfig;
}

async function loader(
  context: LoaderContext<LoaderOptions>,
  source: string,
): Promise<string> {
  const { type, guiderConfig } = context.getOptions();
  context.cacheable(true);
  if (guiderConfig) await runScanner(guiderConfig);

  const directories = findPagesDir(process.cwd());
  if (directories.pagesDir) context.addContextDependency(directories.pagesDir);

  if (context.resourceQuery === '?virtual') return virtualLoader();
  if (type === 'mdx') return mdLoader(source);

  throw new Error(`Loader used with incorrect type (${type})`);
}

export default function cbLoader(
  this: LoaderContext<LoaderOptions>,
  source: string,
  callback: (err: Error | null, content?: string | undefined) => void,
): void {
  loader(this, source)
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    });
}
