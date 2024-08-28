import type { DriverBase } from './types.js';

export function extendDriver<
  TDriver extends DriverBase,
  TExtensions extends DriverBase,
>(driver: TDriver, extensions: TExtensions): TDriver & TExtensions {
  return {
    ...driver,
    ...extensions,
  };
}
