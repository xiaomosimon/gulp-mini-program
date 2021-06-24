// 请都使用相对路径
const parseArgs = require('minimist')(process.argv.slice(2));
const {
  backFilesEntry
} = require('./util');

let config = {
  entryRoot: 'src/',
  outputRoot: 'miniprogram/',
  imagesRoot: 'assets/images/',
  wxsRoot: 'wxs/',
  jsConfig: {
    include: ['src/**/*.js'],
    exclude: ['src/{node_modules,miniprogram_npm}/**/*.js']
  },
  jsonConfig: {
    include: ['src/**/*.json'],
    exclude: ['src/{node_modules,miniprogram_npm}/**/*.json']
  },
  wxmlConfig: {
    include: ['src/**/*.wxml'],
    exclude: ['src/{node_modules,miniprogram_npm}/**/*.wxml']
  },
  styleConfig: {
    include: ['src/**/*.scss'],
    exclude: ['src/{node_modules,miniprogram_npm}/**/*.scss']
  },
  copyConfig: {
    include: ['src/assets/**/*', 'src/miniprogram_npm/**/*', 'src/wxs/*'],
    exclude: ['src/assets/images/']
  },
  parseArgs: {
    mode: 'development', // 默认为 development 模式
    ...parseArgs,
  } // { _: [ 'build' ], mode: 'development' }
};

config.jsConfig.entry = backFilesEntry(config.jsConfig);
config.jsonConfig.entry = backFilesEntry(config.jsonConfig);
config.wxmlConfig.entry = backFilesEntry(config.wxmlConfig);
config.styleConfig.entry = backFilesEntry(config.styleConfig);
config.copyConfig.entry = backFilesEntry(config.copyConfig);
console.log(config);
module.exports = config;