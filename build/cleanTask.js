const {
  src
} = require('gulp');
const gulpClean = require('gulp-clean');
const {
  outputRoot
} = require('./config');

function cleanTask() {
  return src(outputRoot, {
      allowEmpty: true,
      read: false
    })
    .pipe(gulpClean());
}

module.exports = cleanTask;