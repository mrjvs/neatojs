export function mdLoader(): string {
  return `
  import a from '.virtual/guider-test.js'
  export default () => "contents: " + JSON.stringify(a)
  `;
}
