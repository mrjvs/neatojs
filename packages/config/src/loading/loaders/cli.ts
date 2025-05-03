import type { KeyCollection, KeyLoader } from 'loading/types';
import { LoaderInputError } from 'utils/errors';

export type CliLoaderOptions = {
  prefix?: string;
};

export function getKeysFromCLI(prefix: string): KeyCollection {
  const keys: KeyCollection = [];

  let findNext: { key: string }[] = [];
  process.argv.forEach((v) => {
    // if its waiting for next argument, parse that argument
    if (findNext.length > 0) {
      findNext.forEach((awaiting) => {
        keys.push({
          key: awaiting.key,
          value: v,
        });
      });
      findNext = [];
      return;
    }

    // arguments must start with --
    if (!v.startsWith(`--${prefix}`)) return;
    const key = v.slice(2 + prefix.length);

    // "--KEY" "VALUE"
    if (!key.includes('=')) {
      findNext.push({
        key,
      });
      return;
    }

    // --KEY=VALUE
    const [argKey, ...rest] = key.split('=');
    const value = rest.join('=');
    keys.push({
      key: argKey,
      value,
    });
  });

  // if still awaiting, its invalid arguments
  if (findNext.length > 0) {
    throw new LoaderInputError(
      'Expected value for configuration key but found nothing',
    );
  }

  return keys;
}

export function cliLoader(ops?: CliLoaderOptions): KeyLoader {
  return {
    name: 'cli',
    load(_ctx) {
      return getKeysFromCLI(ops?.prefix ?? '');
    },
  };
}
