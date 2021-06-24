// 返回包含的数组
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

// 返回不包含的数组
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

function backFilesEntry({
  include = [],
  exclude = []
}) {
  return [...backHandledInclude(include), ...backHandledExclude(exclude)]
}

module.exports = {
  backHandledInclude,
  backHandledExclude,
  backFilesEntry
}