const prettierConfig = require("@repo/prettier-config");

module.exports = {
  extends: [
    "eslint:recommended",
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  settings: {
    "prettier/prettier": ["error", {}, prettierConfig],
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
};
