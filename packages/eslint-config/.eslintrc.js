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
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    "prettier/prettier": ["error", {}, prettierConfig],
    "import/no-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/unified-signatures": "off",
    "no-nested-ternary": "off",
    "unicorn/filename-case": "off",
    "prefer-named-capture-group": "off",
  },
};
