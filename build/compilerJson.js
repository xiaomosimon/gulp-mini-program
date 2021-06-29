const {
  src,
  dest
} = require('gulp');
const jsonminify = require('gulp-jsonminify');

const {
  outputRoot,
  jsonConfig
} = require('./config');

function compilerJson() {
  return src(jsonConfig.entry)
    .pipe(jsonminify())
    .pipe(dest(outputRoot));
}
module.exports = compilerJson;