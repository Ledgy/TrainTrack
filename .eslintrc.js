module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended"
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
    "prettier"
  ],
  rules: {
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "react/prop-types": "off",
    "react/jsx-filename-extension": "off",
    "prettier/prettier": "error",
    "react/jsx-props-no-spreading": "off"
  },
};
