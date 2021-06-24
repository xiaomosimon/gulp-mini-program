// 请都使用相对路径
const parseArgs = require('minimist')(process.argv.slice(2));
const commonConfig = {
  entryRoot: 'src/',
  outputRoot: 'miniprogram/',
  imagesRoot: 'assets/images/',
  wxsRoot: 'wxs/',
  copyConfig: {
    include: ['src/**'],
    exclude: ['src/**/*.{json,wxml,css,scss,wxss}', 'src/assets/images/**']
  },
  parseArgs: {
    mode: 'development',
    ...parseArgs
  }  // { _: [ 'build' ], a: 'abc' }
};

module.exports = commonConfig;