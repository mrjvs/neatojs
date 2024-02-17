export type NamingConventionFunc = (segment: string) => string;

/**
 * transform normalized string to PascalCase
 * HELLO_WORLD -> HelloWorld
 * @param segment string to rename
 * @returns renamed string
 */
export function pascalCaseNaming(segment: string): string {
  return segment
    .toLowerCase()
    .replace(/(^|_)(.)/g, (_, a, b) => b.toUpperCase());
}

/**
 * transform normalized string to camelCase
 * HELLO_WORLD -> helloWorld
 * @param segment string to rename
 * @returns renamed string
 */
export function camelCaseNaming(segment: string): string {
  return segment.toLowerCase().replace(/(_)(.)/g, (_, a, b) => b.toUpperCase());
}

/**
 * transform normalized string to SCREAMING_SNAKE_CASE
 * HELLO_WORLD -> HELLO_WORLD
 * @param segment string to rename
 * @returns renamed string
 */
export function screamingSnakeCaseNaming(segment: string): string {
  return segment; // its already screaming snake case
}

/**
 * transform normalized string to snake_case
 * HELLO_WORLD -> snake_case
 * @param segment string to rename
 * @returns renamed string
 */
export function snakeCaseNaming(segment: string): string {
  return segment.toLowerCase();
}
