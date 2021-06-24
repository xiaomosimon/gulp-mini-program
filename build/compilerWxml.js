const {
  src,
  dest,
  lastRun
} = require('gulp');
const htmlmin = require('gulp-htmlmin');

const {
  entryRoot,
  outputRoot
} = require('./commonConfig');
let entry = entryRoot + '**/*.wxml';

function compilerWxml() {
  return src(entry, {
      since: lastRun(compilerWxml)
    })
    .pipe(htmlmin({
      caseSensitive: true, //  大小写敏感
      removeComments: true, // 	删除HTML注释
      collapseWhitespace: true, // 压缩HTML
    }))
    .pipe(dest(outputRoot))
}
module.exports = compilerWxml;