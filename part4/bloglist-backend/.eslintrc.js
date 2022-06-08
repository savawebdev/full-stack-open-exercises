module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'consistent-return': 0,
    'object-curly-newline': 0,
  },
};
