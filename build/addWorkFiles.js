/**
 * 进行template添加 component page
 * 命令需要带 t 和 n 参数  (type 和 name)
 * eg: gulp add -t c -n mine
 * 在入口根目录下的components目录下添加mine组件文件夹
 * eg: gulp add -t p -n mine
 * 在入口根目录下的pages目录下添加mine组件文件夹
 */
const {
  src,
  dest
} = require('gulp');
const rename = require('gulp-rename');

const {
  entryRoot,
  parseArgs
} = require('./config');
const {
  t,
  n
} = parseArgs;
let entry = '.template';
let ouput = entryRoot
switch (t) {
  case 'c':
    entry += '/component/*';
    ouput += `components/${n}/`
    break;
  case 'p':
    entry += '/page/*';
    ouput += `pages/${n}/`
    break;
  default:
    entry = '';
    break;
}
function addWorkFiles() {
  return src(entry)
    .pipe(rename({
      basename: n
    }))
    .pipe(dest(ouput))
}

module.exports = addWorkFiles;