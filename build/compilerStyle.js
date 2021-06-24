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

const {
  styleConfig,
  outputRoot
} = require('./config');

function compilerStyle() {
  return src(styleConfig.entry, {
      since: lastRun(compilerStyle)
    })
    .pipe(sass().on('error', sass.logError))
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