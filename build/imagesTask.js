const {
  src,
  dest,
  lastRun
} = require('gulp');
const imagemin = require('gulp-imagemin');
const {
  entryRoot,
  imagesRoot,
  outputRoot
} = require('./config');
// 入口
let entry = entryRoot + imagesRoot;
// const extNames = '*.{png,jpg,jpeg,svg,gif}';
entry += (/[^\/]$/.test(entry) ? '/*' : '*');
// 出口
const output = outputRoot + imagesRoot;
function imagesTask() {
  return src(entry, {
    since: lastRun(imagesTask)
  })
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }]
      })
    )
    .pipe(dest(output))
}
module.exports = imagesTask;