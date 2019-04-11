# React 学习

## day3

### Refs & DOM

* 适合使用 Refs 的情况：  
  * 处理焦点、文本选择或媒体控制。  
  * 触发强制动画。  
  * 集成第三方 DOM 库  

* ref的值取决于节点的类型:  
    * 当 ref 属性被用于一个普通的 HTML 元素时，React.createRef() 将接收底层 DOM 元素作为它的 current 属性以创建 ref 。  
    * 当 ref 属性被用于一个自定义类组件时，ref 对象将接收该组件已挂载的实例作为它的 current 。  
    * 你不能在函数式组件上使用 ref 属性，因为它们没有实例。  
* React 会在组件加载时将 DOM 元素传入 current 属性，在卸载时则会改回 null。  
* ref 的更新会发生在componentDidMount 或 componentDidUpdate 生命周期钩子之前。  

### 非受控组件

* 指定一个 defaultValue 属性作为默认值  
* 在React中，<input type="file" /> 始终是一个不受控制的组件，因为它的值只能由用户设置，而不是以编程方式设置。  

### context

* 使用 context, 我可以避免通过中间元素传递 props  

### Fragments

* React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。  
* 在 React 中， <></> 是 <React.Fragment/> 的语法糖。  
* key 是唯一可以传递给 Fragment 的属性。在将来，我们可能增加额外的属性支持，比如事件处理。  

### Portals

* 无论其子节点是否是 portal，上下文特性依然能够如之前一样正确地工作。由于 portal 仍存在于 React 树中，而不用考虑其在 DOM 树中的位置。  

* 一个从 portal 内部会触发的事件会一直冒泡至包含 React 树 的祖先。  

### Web 组件

* React 和 web组件 被用以解决不同问题。Web组件为可重用组件提供了强大的封装能力，而React则是提供了保持DOM和数据同步的声明式库。二者目标互补。  

### 高阶组件

* 高阶组件（HOC）是react中的高级技术，用来重用组件逻辑。  

* 高阶组件本身并不是React API。它只是一种模式，这种模式是由react自身的组合性质必然产生的。  

* 高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。  

### Accessibility

* Web可访问性（也被称为 a11y）是让网站对所有人群可用的的设计和发明。  

* JSX完全支持所有的aria-* HTML属性。然而，在React中大部分DOM属性和特性采用小驼峰命名规则，这些特性应该采用小写。  

### Virtual DOM and Internals

* 虚拟DOM（VDOM）是一种编程概念，是指虚拟的视图被保存在内存中，并通过诸如ReactDOM这样的库与“真实”的DOM保持同步。这个过程被称为和解。

* 影子DOM（Shadow DOM）是一种浏览器技术，主要被设计用来为Web组件中的变量和CSS提供封装。虚拟DOM（Virtual DOM）是由JavaScript库在浏览器API之上实现的一种概念。  
