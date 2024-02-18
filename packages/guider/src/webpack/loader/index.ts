import type { LoaderContext } from 'webpack';
import { metaLoader } from './meta-loader';
import { mdLoader } from './md-loader';
import { virtualLoader } from './virtual-loader';

export interface LoaderOptions {
  type?: 'meta' | 'mdx';
}

async function loader(
  context: LoaderContext<LoaderOptions>,
  _source: string,
): Promise<string> {
  const { type } = context.getOptions();
  context.cacheable(true);

  if (context.resourceQuery === '?virtual') return virtualLoader();
  if (type === 'meta') return metaLoader();
  if (type === 'mdx') return mdLoader();

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
