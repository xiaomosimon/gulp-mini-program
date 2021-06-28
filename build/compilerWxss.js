const {
  src,
  dest,
  lastRun
} = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-dart-sass');
const rename = require('gulp-rename');
const gulpRplace = require('gulp-replace');
const {
  styleConfig,
  outputRoot
} = require('./config');

function compilerStyle() {
  return src(styleConfig.entry, {
      since: lastRun(compilerStyle)
    })
    // 使@import引入样式不被转化
    .pipe(gulpRplace(/@import\s*["|'][^"|']+["|'];?/gi, function (match) {
      return `/**R**${match}**R**/`;
    }))
    .pipe(sass().on('error', sass.logError))
    // 使@import引入样式不被转化
    .pipe(gulpRplace(/\/\*{2}R\*{2}(@import\s*["|'][^"|']+["|'];?)\*{2}R\*{2}\//gi, function (match, p1) {
      return p1.replace(/\.s+css/gi, '.wxss');
    }))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(rename({
      extname: '.wxss'
    }))
    .pipe(dest(outputRoot));
}
module.exports = compilerStyle;