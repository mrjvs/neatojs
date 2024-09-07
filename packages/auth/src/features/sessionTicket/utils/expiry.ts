export const defaultExpiryInSeconds = 60 * 60 * 24 * 7; // a week

export function makeExpiryDateFromNow(expiryMs: number) {
  return new Date(Date.now() + expiryMs);
}
