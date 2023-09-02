module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'no-magic-numbers': 'warn',
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
  overrides: [
    {
      files: ['*.test.js', 'src/**/*.stories.js', 'src/games/**/*.js'],
      rules: {
        'no-magic-numbers': 'off',
      },
    },
  ],
}
