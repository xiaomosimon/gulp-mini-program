const {
  src,
  dest,
  lastRun
} = require('gulp');
const {
  copyConfig,
  outputRoot
} = require('./commonConfig');

const {
  include,
  exclude
} = copyConfig;

function backHandledInclude(include) {
  if (include instanceof Array) {
    return include;
  }
  let includeArr = [];
  if (typeof include === 'string') {
    includeArr.push(include);
  }
  return includeArr;
}

function backHandledExclude(exclude) {
  if (exclude instanceof Array) {
    return exclude.map((v) => {
      return `!${v}`;
    })
  }
  let excludeArr = [];
  if (typeof exclude === 'string') {
    excludeArr.push('!' + exclude);
  }
  return excludeArr;
}
let entry = [...backHandledInclude(include), ...backHandledExclude(exclude)];

function copyTask() {
  return src(entry, {
      since: lastRun(copyTask)
    })
    .pipe(dest(outputRoot));
}

module.exports = copyTask;