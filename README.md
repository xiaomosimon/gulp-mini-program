# gulp-mini-program
微信小程序使用gulp

## 初始化
首先在project.config.json文件里配置自己的appid

```
$ npm install
```

## 用法

### 基本

```
# 开发模式，进行新增，修改，删除，自动构建对应的文件到输出目录
# 请在project.config.json文件里配置miniprogramRoot值为【开发时的小程序根目录】
$ npm run dev

# 生产模式，进行构建打包
# 请上传版本的时候在project.config.json文件里配置miniprogramRoot值为【打包后的小程序根目录】
$ npm run build

```

### 添加模板
可添加page或component，但需要安装 gulp 命令行工具: gulp-cli
```
# 安装到全局
$ npm install --global gulp-cli
```
使用如下:
```
# 新建page或component
# 命令需要带 t 和 n 参数  (type 和 name)

# 在入口根目录下的components目录下添加mine组件文件夹
$ gulp add -t c -n mine

# 在入口根目录下的pages目录下添加mine组件文件夹
$ gulp add -t p -n mine
```

### 其他

#### minimist定义变量
可通过引入build/commonConfig.js获取变量存储对象commonConfig.parseArgs

##### 可使用gulp命令加上-形式进行变量定义;
```
# 添加变量到build任务上
$ gulp build -mode development -custom hellWord
```

##### 使用package.json配置scripts时，请使用 --xx;
```json
{
  "scripts": {
    "dev": "gulp dev",
    "build": "gulp build --mode production",
    "test": "gulp dev --mode test --test hello"
  }
}
```

## 功能

- 可兼容微信开发平台构建npm（暂时解决无法使用第三方库问题）
- 可使用sass，自动转化为wxss到打包后对应文件夹下
- babel转化js并压缩
- 压缩image
- 压缩json
- 压缩wxml
- 热更新
- 自动赋值静态文件到打包后对应文件夹下（可配置）
- eslint构建时校验（可配置）
- 打包前清空指定目录（默认输出目录）
- 新建page或component模板


## 问题

1. 如何优雅支持es6+语法并转化为es5；
2. 如何进行第三方库的打包并能使小程序正常运行，例如moment.js lodash.js等工具库；
3. 如何支持wxs使用es6语法被babel转化后还能使小程序正常运行；eg:
```js
let a = 1000;
// --> 转化为如下代码，但是小程序不支持
var a = 1e3;
```
4. 如何获取大家的关注一起学习，优化这个"孩子"呢？


## 希望
1. 写这个架子的时候，我是想通过这个架子进行个人的小程序开发，在原生编写小程序下，会出现包容量越来越大的情况，也会有很多解决的办法，分包，工具压缩等，但也看到很多混杂的点，比如我写到的问题1；也有很多没有找到答案的点，比如问题2。

2. 我想一边使用这个架子做一个小程序，一边去优化这个架子，并邀请志友参与此项目的优化和改进，并通过此达到学习的目的，欢迎您的pr。

3. 正在梳理编写流程，将具体的实现和思考流程放在各社区，方便大家进行自定义配置和使用。


我是小墨_Simon，感谢您阅读到最后，我们一起加油！

也欢迎您关注我：

邮箱：xiaomosimon@gmail.com

微信

![小墨_Simon微信号二维码](https://raw.githubusercontent.com/xiaomosimon/xiaomosimon.github.io/master/%E5%BE%AE%E4%BF%A1%E5%8F%B7.jpg)


公众号（建设中）

![小墨_Simon公众号二维码](https://raw.githubusercontent.com/xiaomosimon/xiaomosimon.github.io/master/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7.jpg)