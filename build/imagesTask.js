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
} = require('./commonConfig');
// 入口
let entry = entryRoot + imagesRoot;
// const extNames = '*.{png,jpg,jpeg,svg,gif}';
entry += (/[^\/]$/.test(entry) ? '/*' : '*');
// 出口
const output = outputRoot + imagesRoot;
console.log(entry, output);
function imagesTask() {
  return src('src/assets/images/*', {
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
    .pipe(dest('miniprogram/assets/images'))
}
module.exports = imagesTask;