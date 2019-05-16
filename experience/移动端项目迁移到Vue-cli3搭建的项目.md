# 使用 Vue-cli3 初始化项目的移动端开发配置

新开了一个项目，尝试使用 Vue-cli3 初始化并配置。  
一些版本信息：  
    node.js 版本： 11.12.0  
    Vue 版本：2.6.10  
    Vue-cli3 版本：3.7.0  
    postcss-px2rem 版本： 0.3.0  
    lib-flexible 版本：0.3.2  

Let's do it ...  

## 安装自适应依赖

### 安装 lib-flexible

这个插件的安装和 Vue-cli2 初始化的项目配置方法基本相同。  

首先 `npm install lib-flexible --save`  
然后在 `src/main.js` 引入： `import 'lib-flexible';`  
最后在 `public/index.html` 中找到 `<meta name="viewport" content="width=device-width,initial-scale=1.0">` 一行，注释掉  

简单三步，淘宝的 `lib-flexible` 就配置好了。  

> flexible会为页面根据屏幕自动添加 `<meta name='viewport'>`标签，动态控制initial-scale，maximum-scale，minimum-scale等属性的值。  
> 如果没有注释原有的标签，则会根据标签定义的值进行初始化设置，会丧失高清效果，但是屏幕自适应相关仍然有效。  

### 安装 px2rem

这个插件的安装和 Vue-cli2 初始化的项目配置方法相差比较大，主要是新版脚手架将配置进行了封装，需要按照它的规则进行修改。  

首先需要在项目根目录下新建一个配置文件 `vue.config.js` ，该文件导出的对象会被 `webpack-merge` 合并入最终的 webpack 配置。  
然后下面列出两种配置 “px2rem” 的方式。  

方式一：  
首先可以安装在旧版本项目中的配置思路，找到 `css-loader` 然后将 `px2rem-loader` 添加进去。  
而这种方式又有两种方案实现。  

方案A：  
可以使用新版脚手架提供的 `chainWebpack` 属性，针对 loader 规则添加，下面是对 `CSS` 规则添加的示例代码（该代码参考自网络，未实际验证）：  
```js
chainWebpack: config => {
    config.module
      .rule('css')
        .test(/\.css$/)
        .oneOf('vue')
        .resourceQuery(/\?vue/)
        .use('px2rem')
          .loader('px2rem-loader')
          .options({
            remUnit: 75
          })
  }
```

这个方案有一个很明显的缺陷：需要针对不同情况写多条规则，不太推荐使用。  

方案B：  
在node_modules/@vue/cli-service/lib/css.js中，直接添加一个"rule"  
示例代码（该代码参考自网络，未实际验证）：  
```js
rule
.use('px2rem-loader')
.loader('px2rem-loader')
.options({emUit: 75})
```

这个方案的优点是可以一劳永逸，但是也有一个很明显的缺陷：需要修改 `node_modules` 下的文件，这这很不友好，不推荐使用。  

> 参考：[问题：vue-cli3.0 怎么配置px2rem-loader？放了几个位置都报错](https://segmentfault.com/q/1010000016226191)  

方式二：  

> 对于 CSS 相关 loader 来说，我们推荐使用 css.loaderOptions 而不是直接链式指定 loader。这是因为每种 CSS 文件类型都有多个规则，而 css.loaderOptions 可以确保你通过一个地方影响所有的规则。  

上面的提示来自[修改 Loader 选项](https://cli.vuejs.org/zh/guide/webpack.html#%E4%BF%AE%E6%94%B9-loader-%E9%80%89%E9%A1%B9)。  

也就是说方式二不再加多一个 Loader ，而是给 `loaderOptions` 添加一个配置，在这里我们给 `postcss` 添加一个插件 `postcss-px2rem` 。  

示例代码（已实际验证）：  
```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            baseDpr: 1, // 设计稿的dpr值，默认是2
            // remPrecision : 1, // 生成rem数值的精度（小数位数）
            remUnit: 37.5 // 1rem=多少像素 这里的设计稿是750px。
          })
        ]
      }
    }
  }
};
```

这个方案优点很明显：处理简单，不需要修改 `node_modules` 的文件，而缺点目前还没发现，优先推荐。  

> [基于vue-cli3的vue项目移动端样式适配，lib-flexible和postcss-px2rem](https://www.cnblogs.com/lml2017/p/9953429.html)  

## <del>引入 vux 组件库</del>

2019.05.16 根据 vux 项目的 [README](https://github.com/airyland/vux/blob/v2/README.md) 了解到 vux 目前并没有适配 Vue-cli3。  
而在 [vue-cli 3.0脚手架与vux的配合使用](https://www.cnblogs.com/fangshidaima/p/9889353.html) 中提到：  
这里注意由于vue-cli3使用的是webpack4而且更新过vue-loader，所以vux使用起来会存在一些兼容的问题，这里需要额外配置一下，需要手动指定 vue-loader 的版本 `npm install vue-loader@14.2.2 -D` 来解决加载问题。  

而在 [vue-cli 3.x配置使用vux](https://segmentfault.com/a/1190000014586699) 中有提到 vux 使用的 webpack 版本为 3.X ,而 Vue-cli3 使用的 webapck 版本已经升级为 4.X，这可能导致一些其他的问题。  

综上，考虑到使用 vux 需要限制 vue-loader 的版本，而且 使用的 webpack 版本不同可能会有一些不可预知的问题，所以计划改用其他 ui 组件库。  

通过参考旧有项目使用的组件，计划先使用滴滴团队维护的 `cube-ui` ，具体理由可以查看 [Vue移动端组件库调研](./Vue移动端组件库调研.md)  

## 引入 cube-ui 组件库

> 如果你正在使用新版本的 Vue CLI vue-cli@3，那么推荐你直接使用 vue-cli-plugin-cube-ui 插件。在你初始化完项目后直接执行 vue add cube-ui 即可。  
> [快速上手](https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start)  

超方便！！！  

然后会出现一系列询问，看完我就哭了。。。  

```bash
? Use post-compile? Yes
? Import type Partly
? Custom theme? Yes
? Use rem layout? Yes
? Use amfe-flexible? Yes
```

<div class="markdown-body">
          <p>在 cube-template 中特殊的配置项。</p>
<ul>
<li>
<p>Use post-compile?</p>
<p>后编译，详细文档 <a href="https://didi.github.io/cube-ui/#/zh-CN/docs/post-compile" rel="nofollow">https://didi.github.io/cube-ui/#/zh-CN/docs/post-compile</a></p>
</li>
<li>
<p>Import type</p>
<p>引入类型，可以是：</p>
<ul>
<li>按需引入（推荐）：<a href="https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start#cube-%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-anchor" rel="nofollow">https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start#cube-按需引入-anchor</a>
</li>
<li>全部引入：<a href="https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start#cube-%E5%85%A8%E9%83%A8%E5%BC%95%E5%85%A5-anchor" rel="nofollow">https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start#cube-全部引入-anchor</a>
</li>
</ul>
</li>
<li>
<p>Custom theme?</p>
<p>自定义主题，使用后编译的情况下可用；会在 <code>src/</code> 目录下创建一个 <code>theme.styl</code> 的文件，定义各种变量，参考 <a href="https://didi.github.io/cube-ui/#/zh-CN/docs/theme" rel="nofollow">https://didi.github.io/cube-ui/#/zh-CN/docs/theme</a></p>
</li>
<li>
<p>Use rem layout?</p>
<p>rem 布局，使用后编译的情况下可用；使用 <a href="https://github.com/songsiqi/px2rem-postcss">postcss-px2rem</a> 插件完成 px 到 rem 的转换，如果要修改基准值，修改 <code>.postcssrc.js</code> 文件中的 "remUnit" 的值即可。</p>
</li>
<li>
<p>Use vw layout?</p>
<p>vw 布局，使用后编译的情况下且不是 rem 布局的情况下可用；使用 <a href="https://github.com/evrone/postcss-px-to-viewport">postcss-px-to-viewport</a> 插件完成 px 到 vw 的转换。</p>
</li>
<li>
<p>Use amfe-flexible?</p>
<p>当使用 rem 布局的时候，可以选择使用 <a href="https://github.com/amfe/lib-flexible">lib-flexible 2.x</a> 来动态计算更新 rem 的值；当然也可以使用你自定义的 rem 计算方式，但是一定不能动态去需改 viewport，viewport width 只支持为 device-width 的情况</p>
</li>
</ul>
<blockquote>
<p><strong>使用rem/vw布局时</strong>: 如果你的 remUnit 不能设置为 37.5，或者 viewportWidth 不是 375，可以使用 <a href="https://www.npmjs.com/package/postcss-design-convert" rel="nofollow">postcss-design-convert</a> 插件完成相应转换。</p>

> [cube-template WIKI](https://github.com/cube-ui/cube-template/wiki)  

一次性直接把自适应框架搭完了！！！得，前面就当熟悉原理了。  

> 我们推荐在运行 vue add 之前将项目的最新状态提交，因为该命令可能调用插件的文件生成器并很有可能更改你现有的文件。  
> [在现有的项目中安装插件](https://cli.vuejs.org/zh/guide/plugins-and-presets.html#%E5%9C%A8%E7%8E%B0%E6%9C%89%E7%9A%84%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6)  

刚刚一激动忘了先提交代码了，现在运行了 `vue add cube-ui` 并选择完之后竟然有部分报错了，提示 `Px2rem is not defined` ，可能和我一开始自己配置的 px2rem 冲突了。  

先尝试查找脚手架的删除插件命令，然后并没有找到，但是有说可以通过 `vue ui` 命令打开 GUI 界面管理已安装依赖。打开后发现插件只可以进行新增，不可以进行删除，但是可以管理依赖。  

由于前面的代码也是配置自适应框架的代码，而且已经有了文字记录，所以先将对应依赖卸载，然后直接回滚代码，再尝试安装一次。  

这次安装完之后没有任何报错，然后跑起来也完全正常。由于篇幅有点长，关于 `cube-ui` 的具体安装在另一篇文章里面。  
