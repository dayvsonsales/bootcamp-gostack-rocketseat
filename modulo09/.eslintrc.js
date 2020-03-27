module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js'],
      },
    ],
    'no-param-reassign': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    camelcase: 'off',
    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['tron'] }],
    'react/display-name': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
};
