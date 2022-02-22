module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: [],
    extends: [
      "airbnb-base",
      "airbnb-typescript/base",
      "plugin:prettier/recommended",
      "prettier"
    ],
    rules: {},
    settings: {},
    env: {
      es2021: true,
      node: true,
      browser: true
    },
    ignorePatterns: [
      "build/",
      "public/",
      "node_modules/"
    ]
  }