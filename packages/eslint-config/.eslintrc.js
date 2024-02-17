const { resolve } = require("node:path");
const prettierConfig = require("@repo/prettier-config");

const project = resolve(__dirname, "tsconfig.json");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    project,
  },
  settings: {
    "prettier/prettier": ["error", {}, prettierConfig],
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
};
