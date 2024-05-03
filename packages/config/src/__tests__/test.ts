export function setEnv(env: Record<string, string>) {
  if (!process.env) process.env = {};
  Object.keys(process.env).forEach((key) => {
    vi.stubEnv(key, '');
  });
  Object.entries(env).forEach((entry) => {
    vi.stubEnv(entry[0], entry[1]);
  });
}
