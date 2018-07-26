# Node.js 包教不包会

## lesson6

* 全局安装 `mocha` 和局部安装 `mocha` 之后的调用命令不同，本地需要指定位置。  

* `istanbul cover _mocha` 这句命令在 `windows` 下会报错，需要指定 `_mocha` 的位置（全局安装也需要），如果是本地安装，使用：`istanbul cover .\node_modules\mocha\bin\_mocha`。  

## lesson12 线上部署：heroku

* 注册帐号：lazy.yang.xiong@gmail.com/yang lazy

## lesson13 持续集成平台：travis

* 为什么要使用 travis 这样的平台，是因为它可以让你明白自己的项目在一个“空白环境”中，是否能正确运行；也可以让你知道，用不同的 Node.js 版本运行的话，有没有兼容性问题。  

## lesson15 Mongodb 与 Mongoose 的使用

* hbase 和 redis 和 mongodb 和 couchdb 虽然都属于 nosql 的大范畴。但它们关注的领域是不一样的。hbase 是存海量数据的，redis 用来做缓存，而 mongodb 和 couchdb 则试图取代一些使用 mysql 的场景。  

## lesson16 cookie 和 session

* 在 redis 中存储 session 需要先安装redis！！！  

* 