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
  entryRoot,
  outputRoot
} = require('./commonConfig');
let entry = entryRoot + '**/*.scss';

function compilerStyle() {
  return src(entry, {
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