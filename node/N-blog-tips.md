# N-blog
> https://github.com/nswbmw/N-blog

## 开发环境：
    • Node.js: 8.9.1
    • MongoDB: 3.4.10
    • Express: 4.16.2
  1、安装Node.js
  2、安装 n 或者 nvm
    两者的区别：http://taobaofed.org/blog/2015/11/17/nvm-or-n/
    一个都没有安装
  3、安装nrm
    npm i nrm -g
  1、安装 MongoDB（以前已经安装）
  2、Robomongo和Mongochef
    两者都是MongoDB可视化管理工具，后者更强大，前者更轻量。
    选择了第一个。
    https://robomongo.org/download -》 Download Robo 3T -》 Download installer for Windows 64-bit:
    a）、选择了默认安装位置：C:\Program Files\Robo 3T 1.2.1
    b）、下载并安装成功后点击左上角的 Create 创建一个连接，给该连接起个名字如: localhost，使用默认地址（localhost）和端口（27017）即可，点击 Save 保存。
    c）、双击 localhost 连接到 MongoDB 并进入交互界面
      提示连接失败。。。
      
  Node.js知识点：
    • require 目录的机制是:
      ○ 如果目录下有 package.json 并指定了 main 字段，则用之
      ○ 如果不存在 package.json，则依次尝试加载目录下的 index.js 和 index.node
    • require 过的文件会加载到缓存，所以多次 require 同一个文件（模块）不会重复加载
    • 判断是否是程序的入口文件有两种方式:
      ○ require.main === module（推荐）
      ○ module.parent === null
    
    exports 和 module.exports 的区别：
        1) module.exports 初始值为一个空对象 {}
        2) exports 是指向的 module.exports 的引用
        3) require() 返回的是 module.exports 而不是 exports
  
    建议只使用 module.exports
    Windows 用户需要首先设置环境变量，然后再执行程序：
    
    set DEBUG=*
    set NODE_ENV=test
    node app
    或者使用 cross-env：
    
    npm i cross-env -g
    使用方式：
    
    cross-env NODE_ENV=test node app
    在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：
    
    npm i -g supervisor

> 注意：中间件的加载顺序很重要！比如：通常把日志中间件放到比较靠前的位置，后面将会介绍的 connect-flash 中间件是基于 session 的，所以需要在 express-session 后加载。

### 错误处理
应用程序为我们自动返回了错误栈信息（express 内置了一个默认的错误处理器），假如我们想手动控制返回的错误内容，则需要加载一个自定义错误处理的中间件，如下：

```js
  const express = require('express')
  const app = express()

  app.use(function (req, res, next) {
    console.log('1')
    next(new Error('haha'))
  })

  app.use(function (req, res, next) {
    console.log('2')
    res.status(200).end()
  })

  //错误处理
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(3000)
```
此时访问 localhost:3000，浏览器会显示 Something broke!。