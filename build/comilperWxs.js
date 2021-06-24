const {
  src,
  dest,
  lastRun
} = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');

const {
  entryRoot,
  outputRoot,
  wxsRoot,
  parseArgs
} = require('./commonConfig');
const mode = parseArgs.mode;
let entry = entryRoot + wxsRoot + '/*.js';

function compilerWxs() {
  return src(entry, {
      since: lastRun(compilerWxs)
    })
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulpIf(mode === 'production', stripDebug()))
    .pipe(rename({
      extname: '.wxs'
    }))
    .pipe(dest(outputRoot));
}

module.exports = compilerWxs