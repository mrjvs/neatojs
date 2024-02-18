export function metaLoader(): string {
  // Ignore meta pages in the loader, otherwise it would show up as a page
  return 'export default () => null';
}
