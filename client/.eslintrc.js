module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off', // https://stackoverflow.com/questions/69687167/proptype-name-is-not-required-but-has-no-corresponding-defaultprops-declarati
  },
  settings: {},
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  ignorePatterns: ['build/', 'public/', 'node_modules/'],
};
