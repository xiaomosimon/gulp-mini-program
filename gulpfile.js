const {
  watch, // 监控
  series, // 串行
  parallel, // 并行
} = require('gulp');
const del = require('del');
const {
  entryRoot,
  outputRoot
} = require('./build/config');
// 截取后缀名
const getExtThroughFilePath = function (filePath) {
  return /[^\.]\w*$/g.exec(filePath)[0];
}
// 打印提示文字
const chalk = require('chalk');
const log = console.log;

// 清除打包文件
const cleanTask = require('./build/cleanTask');
// 编译js
const compilerJs = require('./build/compilerJs');
// 编译sass，转化css，生成wxss
const compilerWxss = require('./build/compilerWxss');
// 压缩json
const compilerJson = require('./build/compilerJson')
// 压缩html
const compilerWxml = require('./build/compilerWxml');
// 复制静态文件，wxs
const copyTask = require('./build/copyTask');
// 压缩图片
const imagesTask = require('./build/imagesTask');


// 添加page或component模板
const addWorkFiles = require('./build/addWorkFiles');

// 监控
function watchTask(cb) {
  log(chalk.green(`生成小程序开发目录: ${outputRoot}`));
  log(chalk.green(`监控任务启动`));
  const watcher = watch("src/**/**"); // 默认add change unlink
  const isImageTypeThroughExt = function (ext) {
    return ['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(ext);
  }
  const runTaskThroughFileChange = function (ext) {
    if (isImageTypeThroughExt(ext)) {
      return imagesTask();
    }
    if (ext === 'js') {
      return compilerJs();
    }
    if (ext === 'scss') {
      return compilerWxss();
    }
    if (ext === 'json') {
      return compilerJson();
    }
    if (ext === 'wxml') {
      return compilerWxml();
    }
    if (ext === 'js') {
      return compilerJs();
    }
    return copyTask();
  }
  watcher.on('add', function (filePath) {
    log(chalk.blue(`添加文件： ———————— ${filePath} ——————————`));
    const ext = getExtThroughFilePath(filePath);
    return runTaskThroughFileChange(ext);;
  });

  watcher.on("change", function (filePath) {
    log(chalk.blue(`修改文件： ———————— ${filePath} —————————— `));
    const ext = getExtThroughFilePath(filePath);
    return runTaskThroughFileChange(ext);;
  });

  watcher.on("unlink", function (filePath) {
    log(chalk.blue(`删除文件： ———————— ${filePath} —————————— `));
    const ext = getExtThroughFilePath(filePath);
    let file = filePath.replace(entryRoot, outputRoot);
    if (ext === 'scss') {
      file.replace(/scss$/, 'wxss');
    }
    del([file]);
    log(chalk.green(`删除文件： ———————— ${filePath} —————————— success`));
  });

  watcher.on('unlinkDir', function (filePath) {
    log(chalk.blue(`删除文件夹： ———————— ${filePath} —————————— `))
    let file = filePath.replace(entryRoot, outputRoot);
    del([file]);
    log(chalk.green(`删除文件夹： ———————— ${filePath} —————————— success`));
  });
  cb();
}

// 执行更新需生成小程序目录
exports.dev = series(series(cleanTask, parallel(compilerWxss, compilerJson, compilerWxml, copyTask, imagesTask), compilerJs), watchTask);

// 构建打包
exports.build = series(cleanTask, parallel(compilerWxss, compilerJson, compilerWxml, copyTask, imagesTask), compilerJs);

// 添加page或component模板
// TODO Q:单使用addWorkFiles无法被watch监听到
exports.add = addWorkFiles;