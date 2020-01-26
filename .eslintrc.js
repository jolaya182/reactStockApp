module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'jest',
  ],
  parser: 'babel-eslint',
  rules: {
    // "react/require-default-props": "off", // airbnb use error
    // "react/forbid-prop-types": "off", // airbnb use error
    // "react/no-unused-prop-types": "off" // Is still buggy

    'react/prop-types': 'error', // this turns on/off the proptype rule
    'linebreak-style': 'off', // avoids the lf to crlf conversion warning
    prettier: 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/no-array-index-key': 'off',
    'no-console': 'off',
    'react/no-unused-state': 'off',
    'no-alert': 'off',
    'no-restricted-globals': 'off',
    'import/no-unresolved': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',

    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',

  },
};
