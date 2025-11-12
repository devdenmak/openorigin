// eslint-disable-next-line @typescript-eslint/no-require-imports
const prettierConfig = require('./.prettierrc.js')

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    es2022: true,
  },
  plugins: ['simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
      },
    ],
    'react/no-unescaped-entities': 0,
    'no-useless-escape': 0,
    'no-empty': ['error', { allowEmptyCatch: true }],
    'prettier/prettier': ['warn', prettierConfig],
    '@typescript-eslint/ban-ts-comment': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
