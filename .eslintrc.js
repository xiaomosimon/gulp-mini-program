module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6
  },
  rules: {
    indent: ['error', 2], // 缩进
    quotes: ['error', 'single'], // 单引号
    // semi: ['error', 'always'], // 尾分号
    // 'no-console': 1, // console
  },
  globals: {
    getApp: false,
    Page: false,
    wx: false,
    App: false,
    getCurrentPages: false,
    Component: false
  }
};