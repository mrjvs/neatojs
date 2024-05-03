import type { ConfigLoader } from 'builder/base';
import type { ConfigKeys } from 'loaders/base';
import { LoaderInputError } from 'utils/errors';

export interface CLILoader {
  prefix: string;
}

export function populateLoaderFromCLI(loader: ConfigLoader, prefix: string) {
  loader.cli.push({
    prefix,
  });
}

export function getKeysFromCLI(loaders: CLILoader[]): ConfigKeys {
  const prefixes: string[] = loaders.map((v) => v.prefix);
  const keys: ConfigKeys = [];
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
    if (!v.startsWith('--')) return;

    // handle each prefix
    prefixes.forEach((prefix) => {
      // skip if prefix doesn't apply here
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
  });

  // if still awaiting, its invalid arguments
  if (findNext.length > 0) {
    throw new LoaderInputError(
      'Expected value for configuration key but found nothing',
    );
  }

  return keys;
}
