#一文讲完webpack传参

> 最近做项目遇到需要给webpack打包传参实现不同打包效果的需求，网上找了不少文章，在这里集中整理一下，以待后续查看。   

## 参数传递的几个方式



## npm scripts
* 参考资料 [npm scripts 使用指南-阮一峰-个人博客](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)  
## webpack 配置文件导出函数
* 参考资料 [Webpack 调教之参数的投喂-wayou-github](https://github.com/wayou/wayou.github.io/issues/14)  


## process.env

## 常见问题分析

1. 我们一般使用`"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",`这样的配置命令进行开发，然后问题来了我们想要传入自定义参数。我们先尝试使用`"dev": "webpack-dev-server --env.var=test --inline --progress --config build/webpack.dev.conf.js",`，然后就没有然后了，在我们的`webpack.dev.conf.js`文件中`process.env`压根拿不到任何数据，丢！  

