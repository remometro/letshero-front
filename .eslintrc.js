module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['error', 2],
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": "off",
    "quotes": "off",
    "no-extra-semi": "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
