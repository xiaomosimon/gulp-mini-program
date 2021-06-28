const {
  src,
  dest,
  lastRun
} = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const {
  jsConfig,
  outputRoot,
  parseArgs,
} = require('./config');
const mode = parseArgs.mode; // isBuild
const isProduction = mode === 'production';

function compilerJs() {
  return src(jsConfig.entry, {
      since: lastRun(compilerJs)
    })
    .pipe(gulpIf(isProduction, eslint()))
    .pipe(gulpIf(isProduction, eslint.format()))
    .pipe(gulpIf(isProduction, eslint.failAfterError()))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulpIf(isProduction, stripDebug()))
    .pipe(dest(outputRoot));
}

module.exports = compilerJs;