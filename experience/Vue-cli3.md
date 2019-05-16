# Vue-cli3 学习

Vue CLI 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需 eject。  

## 安装

如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。  

Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 nvm 或 nvm-windows 在同一台电脑中管理多个 Node 版本。  

## 创建一个项目

> [快速原型开发](https://cli.vuejs.org/zh/guide/prototyping.html)  
> [vue-cli3.0 脚手架搭建项目](https://www.cnblogs.com/qq1272850043/p/9812421.html)  

选择了创建一个项目：  
> 如果你在 Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作。你必须通过 winpty vue.cmd create hello-world 启动这个命令。不过，如果你仍想使用 vue create hello-world，则可以通过在 ~/.bashrc 文件中添加以下行来为命令添加别名。 alias vue='winpty vue.cmd' 你需要重新启动 Git Bash 终端会话以使更新后的 bashrc 文件生效。  
* vue create hello-world  
    * 创建项目  
* Please pice a preset  
    * -> Manually select features
    * 手动选择特性  
* Check the features needed for you project  
    * -> babel/Router/Vuex/CSS Pre-processors/Linter / Formatter  
    * 使用方向键上下选择，使用 空格（space） 选中选项，使用 确认（enter）进入下一项   
    * 选择了这几项：支持 ES6、路由、几种状态管理、CSS预处理器、静态代码校验  
* Use history mode for router ?  
    * -> n
    * 是否对路由使用 history 模式？ 需要后端配合  
* Pick a CSS pre-processor  
    * -> Sass/SCSS(width node-sass)  
    * 选择 CSS 预处理器，选择 node 版本的 SCSS  
* Pick a linter / formatter config  
    * -> ESLint + Standard config  
    * 选择 ESLint 规范  
    * ESLint with error prevention only——只检测错误。  
    * ESLint + Airbnb config——独角兽公司的Airbnb，有人评价说“这是一份最合理的JavaScript编码规范”，它几乎涵盖了JavaScript的各个方面。  
    * ESLint + Standard config——standardJs一份强大的JavaScript编码规范，自带linter和自动代码纠正。没有配置。自动格式化代码。可以在编码早期发现规范问题和低级错误。  
    * ESLint + Prettier—— Prettier 作为代码格式化工具，能够统一整个团队的代码风格。  
* Pick additional lint features  
    * -> Lint on save  
    * lint有两种检查时机，一是用户保存文件的时候，二是用户提交文件到git的时候。选了Lint on save，有错及时解决。  
* Where do you prefer placing config for Babel, PostCSS, ESLint, etc.?  
    * -> In dedicated config files  
    * 把Babel、ESLint等配置信息全放在package.json文件里，还是单独文件管理？  
* Save this as a preset for future projects?  
    * -> y  
    * 是否把这个手动选择的 preset 保存为未来项目的 preset ？  
* Save preset as:   
  * -> hello-world  
  * 保存 preset 的名字  
*  Pick the package manager to use when installing dependencies:  
  * -> use NPM  
  * 选择安装项目的方式  

## 以一个文件的方式使用解析好的配置

有些外部工具可能需要通过一个文件访问解析好的 webpack 配置，比如那些需要提供 webpack 配置路径的 IDE 或 CLI。在这种情况下你可以使用如下路径：  
```bash
<projectRoot>/node_modules/@vue/cli-service/webpack.config.js
```

该文件会动态解析并输出 vue-cli-service 命令中使用的相同的 webpack 配置，包括那些来自插件甚至是你自定义的配置。  

和 webpack 相关的配置都可以在 `<projectRoot>/node_modules/@vue/cli-service/lib` 查看。  
