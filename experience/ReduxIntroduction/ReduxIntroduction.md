# Redux 入门学习

## 动机

随着 JavaScript 单页应用开发日趋复杂，**JavaScript 需要管理比任何时候都要多的 state （状态）**。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

## 核心概念

Redux 本身很简单。

1. 使用普通对象来描述应用的 `state`  ，下面是一个 `state` 示例：    

   ```js
   {
     todos: [{
       text: 'Eat food',
       completed: true
     }, {
       text: 'Exercise',
       completed: false
     }],
     visibilityFilter: 'SHOW_COMPLETED'
   }
   ```

   

2. 要想更新 state 中的数据，你需要发起一个 `action`。`Action` 就是一个普通 JavaScript 对象用来描述发生了什么。  下面是一个 `action` 示例：    

       ```js
   { type: 'ADD_TODO', text: 'Go to swimming pool' }
   { type: 'TOGGLE_TODO', index: 1 }
   { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
       ```

   1. 强制使用 action 来描述所有变化带来的好处是可以清晰地知道应用中到底发生了什么。  

3. 最终，为了把 action 和 state 串起来，开发一些函数，这就是 reducer。  reducer 只是一个接收 state 和 action，并返回新的 state 的函数。下面是 `reducer` 示例：  

   ```js  
   function visibilityFilter(state = 'SHOW_ALL', action) {
     if (action.type === 'SET_VISIBILITY_FILTER') {
       return action.filter
     } else {
       return state
     }
   }
   
   function todos(state = [], action) {
     switch (action.type) {
       case 'ADD_TODO':
         return state.concat([{ text: action.text, completed: false }])
       case 'TOGGLE_TODO':
         return state.map((todo, index) =>
           action.index === index
             ? { text: todo.text, completed: !todo.completed }
             : todo
         )
       default:
         return state
     }
   }
   ```

   再开发一个 reducer 调用这两个 reducer，进而来管理整个应用的 state：  

   ```js
   function todoApp(state = {}, action) {
     return {
       todos: todos(state.todos, action),
       visibilityFilter: visibilityFilter(state.visibilityFilter, action)
     }
   }
   ```

   

## 三大原则

Redux 可以用这三个基本原则来描述：

### 单一数据源

**整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。**  

```js
console.log(store.getState())

/* 输出
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*／
```

### State 是只读的

**唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。**  

```js
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```

### 使用纯函数来执行修改

**为了描述 action 如何改变 state tree ，你需要编写 reducers。**  

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

import { combineReducers, createStore } from 'redux'
let reducer = combineReducers({ visibilityFilter, todos })
let store = createStore(reducer)
```

## 基础

### Action

**Action** 是把数据从应用传到 store 的有效载荷。它是 store 数据的**唯一**来源。一般来说你会通过 `store.dispatch()` 将 action 传到 store。  

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。多数情况下，`type` 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。  

>  样板文件使用提醒
>
> 使用单独的模块或文件来定义 action type 常量并不是必须的，甚至根本不需要定义。对于小应用来说，使用字符串做 action type 更方便些。不过，在大型应用中把它们显式地定义成常量还是利大于弊的。参照 [减少样板代码](http://cn.redux.js.org/docs/recipes/ReducingBoilerplate.html) 获取更多保持代码简洁的实践经验。

#### Action 创建函数

**Action 创建函数** 就是生成 action 的方法。 



### Reducer

**Reducers** 指定了应用状态的变化如何响应 [actions](http://cn.redux.js.org/docs/basics/Actions.html) 并发送到 store 的，记住 actions 只是描述了*有事情发生了*这一事实，并没有描述应用如何更新 state。 

reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。  

```js
;(previousState, action) => newState
```

之所以将这样的函数称之为 reducer，是因为这种函数与被传入 [`Array.prototype.reduce(reducer, ?initialValue)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 里的回调函数属于相同的类型。  

保持 reducer 纯净非常重要。**永远不要**在 reducer 里做这些操作：

- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 `Date.now()` 或 `Math.random()`。

### Store

**Store** 是把  action 和 reducers 联系到一起的对象。Store 有以下职责：

- 维持应用的 state； 
- 提供 [`getState()`](http://cn.redux.js.org/docs/api/Store.html#getState) 方法获取 state；  
- 提供 [`dispatch(action)`](http://cn.redux.js.org/docs/api/Store.html#dispatch) 方法更新 state；  
- 通过 [`subscribe(listener)`](http://cn.redux.js.org/docs/api/Store.html#subscribe) 注册监听器;  
- 通过 [`subscribe(listener)`](http://cn.redux.js.org/docs/api/Store.html#subscribe) 返回的函数注销监听器。  

### 数据流

**严格的单向数据流**是 Redux 架构的设计核心。

Redux 应用中数据的生命周期遵循下面 4 个步骤：

1. **调用** [`store.dispatch(action)`](http://cn.redux.js.org/docs/api/Store.html#dispatch)。

[Action](http://cn.redux.js.org/docs/basics/Actions.html) 就是一个描述“发生了什么”的普通对象。比如：

```js
    { type: 'LIKE_ARTICLE', articleId: 42 }
    { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
    { type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

可以把 action 理解成新闻的摘要。如 “玛丽喜欢 42 号文章。” 或者 “todolist 里添加了'学习 Redux 文档'”。

你可以在任何地方调用 [`store.dispatch(action)`](http://cn.redux.js.org/docs/api/Store.html#dispatch)，包括组件中、XHR 回调中、甚至定时器中。

2. **Redux store 调用传入的 reducer 函数。**

[Store](http://cn.redux.js.org/docs/basics/Store.html) 会把两个参数传入 [reducer](http://cn.redux.js.org/docs/basics/Reducers.html)： 当前的 state 树和 action。例如，在这个 todo 应用中，根 reducer 可能接收这样的数据：

```js
// 当前应用的 state（todos 列表和选中的过滤器）
let previousState = {
  visibleTodoFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Read the docs.',
      complete: false
    }
  ]
}

// 将要执行的 action（添加一个 todo）
let action = {
  type: 'ADD_TODO',
  text: 'Understand the flow.'
}

// reducer 返回处理后的应用状态
let nextState = todoApp(previousState, action)
```

注意 reducer 是纯函数。它仅仅用于计算下一个 state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。它不应做有副作用的操作，如 API 调用或路由跳转。这些应该在 dispatch action 前发生。

3. **根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。**

根 reducer 的结构完全由你决定。Redux 原生提供[`combineReducers()`](http://cn.redux.js.org/docs/api/combineReducers.html)辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。

下面演示 [`combineReducers()`](http://cn.redux.js.org/docs/api/combineReducers.html) 如何使用。假如你有两个 reducer：一个是 todo 列表，另一个是当前选择的过滤器设置：

```js
function todos(state = [], action) {
  // 省略处理逻辑...
  return nextState
}

function visibleTodoFilter(state = 'SHOW_ALL', action) {
  // 省略处理逻辑...
  return nextState
}

let todoApp = combineReducers({
  todos,
  visibleTodoFilter
})
```

当你触发 action 后，`combineReducers` 返回的 `todoApp` 会负责调用两个 reducer：

```js
let nextTodos = todos(state.todos, action)
let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action)
```

然后会把两个结果集合并成一个 state 树：

```js
return {
  todos: nextTodos,
  visibleTodoFilter: nextVisibleTodoFilter
}
```

虽然 [`combineReducers()`](http://cn.redux.js.org/docs/api/combineReducers.html) 是一个很方便的辅助工具，你也可以选择不用；你可以自行实现自己的根 reducer！

4. **Redux store 保存了根 reducer 返回的完整 state 树。**

这个新的树就是应用的下一个 state！所有订阅 [`store.subscribe(listener)`](http://cn.redux.js.org/docs/api/Store.html#subscribe) 的监听器都将被调用；监听器里可以调用 [`store.getState()`](http://cn.redux.js.org/docs/api/Store.html#getState) 获得当前 state。

现在，可以应用新的 state 来更新 UI。如果你使用了 [React Redux](https://github.com/gaearon/react-redux) 这类的绑定库，这时就应该调用 `component.setState(newState)` 来更新。

