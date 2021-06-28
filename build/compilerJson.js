const {
  src,
  dest,
  lastRun
} = require('gulp');
const jsonminify = require('gulp-jsonminify');

const {
  outputRoot,
  jsonConfig
} = require('./config');

function compilerHtml() {
  return src(jsonConfig.entry, {
      since: lastRun(compilerHtml)
    })
    .pipe(jsonminify())
    .pipe(dest(outputRoot));
}
module.exports = compilerHtml;