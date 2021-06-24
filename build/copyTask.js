const {
  src,
  dest,
  lastRun
} = require('gulp');
const {
  entryRoot,
  outputRoot,
  copyConfig,
} = require('./config');

function copyTask() {
  return src(copyConfig.entry, {
      base: entryRoot,
      since: lastRun(copyTask)
    })
    .pipe(dest(outputRoot));
}

module.exports = copyTask;