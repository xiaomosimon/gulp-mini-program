const {
  src,
  dest,
  lastRun,
  watch
} = require('gulp');
function watchTask() {
  console.log(chalk.blue(`正在监听文件...  ${getNow()}`));
  const watcher = watch("src/**/**");

  watcher.on("change", function(filePath, stats) {
    compile(filePath);
  });

  watcher.on("add", function(filePath, stats) {
    compile(filePath);
  });

  watcher.on("unlink", function(filePath, stats) {
    let distFile = filePath.replace(/^src\b/, "dist");
    let absolutePath = "";
    if (distFile.endsWith(".ts")) {
      distFile = distFile.replace(/.ts$/, ".js");
    } else if (distFile.endsWith(".scss")) {
      distFile = distFile.replace(/.scss$/, ".wxss");
    }
    absolutePath = path.join(cwd, distFile);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(
        chalk.yellow(`删除文件：${path.basename(distFile)}  ${getNow()}`)
      );
    }
  });
}

module.exports = watchTask