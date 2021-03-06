/**
 * 进行template添加 component page
 * 命令需要带 c 或 p 参数  (component 和 page)
 * eg: gulp add -c mine
 * 在入口根目录下的components目录下添加mine组件文件夹
 * eg: gulp add -p mine
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
  c,
  p
} = parseArgs;
let entry = '_template';
let output = entryRoot;
let name = '';
if (c) {
  entry += '/component/*';
  name = c;
  output += `components/${name}/`;
} else if (p) {
  entry += '/page/*';
  name = p;
  output += `pages/${name}/`;
} else {
  entry = '';
}

function addWorkFiles(cb) {
  src(entry)
    .pipe(rename({
      basename: name
    }))
    .pipe(dest(output));
  cb();
}

module.exports = addWorkFiles;