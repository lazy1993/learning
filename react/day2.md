# React 学习

## day2

* JSX 本身其实也是一种表达式  
* 在编译之后呢，JSX 其实会被转化为普通的 JavaScript 对象。  
* 因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。  
* React DOM 在渲染之前默认会 过滤 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。  

* JSX 代表 Objects  
* Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用。  
* 本质上来讲，JSX 只是为 React.createElement(component, props, ...children) 方法提供的语法糖。  

* 元素是构成 React 应用的最小单位。  
* 与浏览器的 DOM 元素不同，**React 当中的元素事实上是普通的对象**，React DOM 可以确保 浏览器 DOM 的数据内容与 React 元素保持一致。  
* 要将React元素渲染到根DOM节点中，我们通过把它们都传递给 ReactDOM.render() 的方法来将其渲染到页面上。  

* React 元素都是immutable 不可变的。当元素被创建之后，你是无法改变其内容或属性的。  
* 在实际生产开发中，大多数React应用只会调用一次 ReactDOM.render()  
* ，将界面视为一个个特定时刻的固定内容（就像一帧一帧的动画），而不是随时处于变化之中（而不是处于变化中的一整段动画），将会有利于我们理清开发思路，减少各种bug。  

* 组件名称必须以大写字母开头。  
* 组件的返回值只能有一个根元素。  
    * React 当中的元素事实上是普通的对象，所以数组也是可以的。  

* 无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。  
* 所有的React组件必须像纯函数那样使用它们的props。  

* 将函数转换为类  
<pre>
    创建一个名称扩展为 React.Component 的ES6 类
    创建一个叫做render()的空方法
    将函数体移动到 render() 方法中
    在 render() 方法中，使用 this.props 替换 props
    删除剩余的空函数声明
</pre>

*  this.props 是由React本身安装的以及this.state 有特殊的含义，如果你需要存储的东西不在数据流中，你可以随意手动向类中添加其他字段（比如定时器ID）。  

* 关于 setState 的三件事：  
  1. 不要直接更新状态  
  2. 状态更新可能是异步的  
  3. 状态更新合并(这里的合并是浅合并)  
* 构造函数是唯一能够初始化 this.state 的地方。  

* 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。  

### 事件处理

* React 元素的事件处理和 DOM元素的很相似。但是有一点语法上的不同:
    * React事件绑定属性的命名采用驼峰式写法，而不是小写。
    * 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)

* 在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。  

* 你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。  
* 如果使用 bind 让你很烦，这里有两种方式可以解决。  
    * 使用实验性的属性初始化器语法  
    * 在回调函数中使用 箭头函数（不是很建议，可能有性能问题）  
        * 使用这个语法有个问题就是每次组件渲染的时候都会创建一个不同的回调函数。  

* 向事件处理程序传递参数：通过 arrow functions 和 Function.prototype.bind 来为事件处理函数传递参数  

* 让 render 方法返回 null，可以阻止组件渲染  
* 组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。  

* Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。  
* 键（key）只是在兄弟之间必须唯一  

### 状态提升

* 在React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。  

* 组件可以接受任意元素，包括基本数据类型、React 元素或函数。  

### 深入 JSX

* 如果你没有给属性传值，它默认为 true。  
* 在既包含开始标签又包含结束标签的 JSX 表达式中，这两个标签之间的内容被传递为专门的属性：props.children。  
* JSX 会移除空行和开始与结尾处的空格。标签邻近的新行也会被移除，字符串常量内部的换行会被压缩成一个空格  
* false、null、undefined 和 true 都是有效的子代，只是它们不会被渲染。  

### flow
