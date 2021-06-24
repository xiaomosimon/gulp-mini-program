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
  entryRoot,
  outputRoot,
  parseArgs,
} = require('./commonConfig');
const mode = parseArgs.mode; // isBuild
let entry = entryRoot + '**/*.js';

function compilerJs() {
  return src(entry, {
      since: lastRun(compilerJs)
    })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulpIf(mode === 'production', stripDebug()))
    .pipe(dest(outputRoot));
}

module.exports = compilerJs