const {
  src,
  dest,
  lastRun
} = require('gulp');
const jsonminify = require('gulp-jsonminify');

const {
  entryRoot,
  outputRoot
} = require('./commonConfig');
let entry = entryRoot + '**/*.json';

function compilerHtml() {
  return src(entry, {
      since: lastRun(compilerHtml)
    })
    .pipe(jsonminify())
    .pipe(dest(outputRoot))
}
module.exports = compilerHtml;