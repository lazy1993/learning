# Vue-cli3 安装 cube-ui 记录

上一篇 [移动端项目迁移到Vue-cli3搭建的项目](./移动端项目迁移到Vue-cli3搭建的项目.md) 说到移动端自适应框架时最后使用了 cube-ui 组件库，然后在安装的过程发现该组件库的安装插件集成了自适应解决方案：lib-flexible + px2rem。这里我们就来看一看这个过程。  

## 2019.05.17 补充

今早起来跑了一下项目，发现样式一塌糊涂，检查元素看了一下，发现根节点上 `data-dpr` 没有了。然后迅速的翻到 `amfe-flexible` 的源码看了一下，发现最新版本已经不会再设置 `data-dpr` 了，只会设置 `rem` 的大小。在网上搜索一下可以发现，`amfe-flexible` 已经放弃了 `rem适配方案` 而改用了 `vw适配方案` ，所以去除了 `set-dpr` 。昨天页面正常可能是因为一开始自行引入的 `lib-flexible` 还在起作用。  
也就是说 `cube-ui` 的插件使用了 `amfe-flexible` 插件和 `postcss-px2rem` 插件来实现基于 `rem` 的自适应框架，但是 `amfe-flexible` 已经转向了 `vw` 自适应方案，这就尴尬了。。。  
目前这个问题已经给对方提 issue 了，不过没能提供在线浏览地址可能会被直接关闭。  
不过知道了问题在哪就很好处理了，我们可以直接卸载掉原有的 `amfe-flexible` 插件，然后自行安装 `lib-flexible` 插件。经过本人测试，页面又正常了。  

## 安装

直接执行 `vue add cube-ui` ，然后进行一些选择：  

```bash
? Use post-compile? Yes
? Import type Partly
? Custom theme? Yes
? Use rem layout? Yes
? Use amfe-flexible? Yes
```

然后脚手架会自动安装响应依赖并且修改一些文件。  
然后我们得到了一段提示：  
<pre>
added 38 packages from 62 contributors and audited 25874 packages in 43.709s
found 3 high severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details
✔  Successfully invoked generator for plugin: vue-cli-plugin-cube-ui
   The following files have been updated / added:

     src/cube-ui.js
     src/theme.styl
     vue.config.js
     .browserslistrc
     package-lock.json
     package.json
     postcss.config.js
     src/main.js

   You should review these changes with git diff and commit them.
</pre>

## 分析

前面是说有一些语法问题，这和我项目的校验规则有关，先不管。然后说下面的文件被变动/新增了，我们一一看一下都做了什么。  

* src/cube-ui.js ==》 新增：按需加载 cube-ui 组件  
* src/theme.styl ==》 新增：可以定制里面列出来的所有颜色  
* vue.config.js ==》 新增：配置了 cube-ui 插件，而且引入了上面的自定义样式  
* .browserslistrc ==》 修改：定义了对 iOS 和 Android 系统的版本支持  
* package-lock.json ==》 修改：npm 配置文件
* package.json ==》 修改：npm 配置文件
* postcss.config.js ==》 修改：增加了 postcss-px2rem 插件配置
* src/main.js =》 修改：引入 amfe-flexible 插件 和 cube-ui 组件注册文件  

最后，运行 `eslint --fix --ext .js,.vue src` 修复语法不符合我这个项目规范的问题。  

## 总结

至此，cube-ui 安装就算完成了。总的来说，安装相当方便，不需要做任何其他操作，安装完成后修复一下语法问题就能直接用了。这可与说是 Vue-cli3 带来的巨大的便利，将来随着生态的完善，Vue 项目可能就不需要再自己配置了！！！  
最后，cube-ui 这么快就适配了 Vue-cli3 并且内置了移动开发自适应框架，圈粉！！！  
