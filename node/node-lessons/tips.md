# Node.js 包教不包会

## lesson6

* 全局安装 `mocha` 和局部安装 `mocha` 之后的调用命令不同，本地需要指定位置。  

* `istanbul cover _mocha` 这句命令在 `windows` 下会报错，需要指定 `_mocha` 的位置（全局安装也需要），如果是本地安装，使用：`istanbul cover .\node_modules\mocha\bin\_mocha`。  


