const {
  src,
  dest
} = require('gulp');
/**
 * html-minifier options documentation
 * https://github.com/kangax/html-minifier
 */
const htmlmin = require('gulp-htmlmin');

const {
  wxmlConfig,
  outputRoot
} = require('./config');

function compilerWxml() {
  return src(wxmlConfig.entry)
    .pipe(htmlmin({
      keepClosingSlash: true, // 保持单标签的尾部斜杠
      caseSensitive: true, //  大小写敏感
      removeComments: true, // 	删除HTML注释
      collapseWhitespace: true, // 压缩HTML
    }))
    .pipe(dest(outputRoot));
}
module.exports = compilerWxml;