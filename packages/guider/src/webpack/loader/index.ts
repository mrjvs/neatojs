import type { LoaderContext } from 'webpack';
import { mdLoader } from './md-loader';
import { virtualLoader } from './virtual-loader';

export interface LoaderOptions {
  type?: 'meta' | 'mdx';
}

async function loader(
  context: LoaderContext<LoaderOptions>,
  source: string,
): Promise<string> {
  const { type } = context.getOptions();
  context.cacheable(true);

  if (context.resourceQuery === '?virtual') return virtualLoader();
  if (type === 'mdx') return mdLoader(source);

  throw new Error(`Loader used with incorrect type (${type})`);
}

export default function cbLoader(
  this: LoaderContext<LoaderOptions>,
  source: string,
): void {
  const callback = this.async();
  loader(this, source)
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    });
}
