declare module '*.guider.virtual.mjs' {
  export const sites: any[];
  export const pageMap: any[];
  export const metaMap: any[];
}

declare module 'approximate-number' {
  export default function approx(val: number): string;
}
