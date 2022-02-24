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
    '@typescript-eslint/no-unused-vars': 'off', // dev interruption
    'react/jsx-props-no-spreading': ['warn'], // react-dnd
    'react/require-default-props': 'off', // Bug with deprecated feature - https://stackoverflow.com/questions/69687167/proptype-name-is-not-required-but-has-no-corresponding-defaultprops-declarati
    'no-underscore-dangle': 'off', // _id in mongoose models
    'import/prefer-default-export': 'off' // no default exports
  },
  settings: {},
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  ignorePatterns: ['build/', 'public/', 'node_modules/'],
};
