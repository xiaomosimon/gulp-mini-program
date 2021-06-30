const {
  src,
  dest
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
const { mode, server } = parseArgs;
const isProduction = mode === 'production'; // isBuild
const notServer = !server;  // isServer
function compilerJs () {
  return src(jsConfig.entry)
    .pipe(gulpIf(isProduction, eslint()))
    .pipe(gulpIf(isProduction, eslint.format()))
    .pipe(gulpIf(isProduction, eslint.failAfterError()))
    .pipe(gulpIf(notServer, babel()))
    .pipe(gulpIf(notServer, uglify()))
    .pipe(gulpIf(isProduction, stripDebug()))
    .pipe(dest(outputRoot));
}

module.exports = compilerJs;