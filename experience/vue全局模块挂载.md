# Vue 全局模块挂载

## 1、全局变量专用模块
就是以一个特定模块来组织管理这些全局量，需要引用的地方导入该模块便好。
全局变量专用模块 Global.vue   
```javascript
const colorList = [
  '#F9F900',
  '#6FB7B7',
  '#9999CC',
  '#B766AD',
  '#B87070',
  '#FF8F59',
  '#FFAF60',
  '#FFDC35',
  '#FFFF37',
  '#B7FF4A',
  '#28FF28',
  '#1AFD9C',
  '#00FFFF',
  '#2894FF',
  '#6A6AFF',
  '#BE77FF',
  '#FF77FF',
  '#FF79BC',
  '#FF2D2D',
  '#ADADAD'
]
const colorListLength = 20
function getRandColor () {
  var tem = Math.round(Math.random() * colorListLength)
  return colorList[tem]
}
export default
{
  colorList,
  colorListLength,
  getRandColor
}
```

模块里的变量用export 暴露出去，当其它地方需要使用时，引入模块global便可。
需要使用全局变量的模块 html5.vue  
```html
<template>
  <ul>
    <template v-for="item in mainList">
      <div class="projectItem" :style="'box-shadow:1px 1px 10px '+ getColor()">
          <router-link :to="'project/'+item.id">
            ![](item.img)
            <span>{{item.title}}</span>
          </router-link>
      </div>
    </template>
  </ul>
</template>
```

```javascript
import global_ from 'components/tool/Global'
export default {
  data () {
    return {
      getColor: global_.getRandColor,
      mainList: [
        {
          id: 1,
          img: require('../../assets/rankIcon.png'),
          title: '登录界面'
        },
        {
          id: 2,
          img: require('../../assets/rankIndex.png'),
          title: '主页'
        }
      ]
    }
  }
}
```
```css
.projectItem
{
  margin: 5px;
  width: 200px;
  height: 120px;
  /*border:1px soild;*/
  box-shadow: 1px 1px 10px;
}
.projectItem a
{
  min-width: 200px;
}
.projectItem a span
{
  text-align: center;
  display: block;
}
```

## 2、全局变量模块挂载到Vue.prototype 里。
Global.js同上，在程序入口的main.js里加下面代码  

```javascript
import global_ from './components/tool/Global'
Vue.prototype.GLOBAL = global_
```

挂载之后，在需要引用全局量的模块处，不需再导入全局量模块，直接用this就可以引用了，如下:  
```javascript
export default {
  data () {
    return {
      getColor: this.GLOBAL.getRandColor,
      mainList: [
        {
          id: 1,
          img: require('../../assets/rankIcon.png'),
          title: '登录界面'
        },
        {
          id: 2,
          img: require('../../assets/rankIndex.png'),
          title: '主页'
        }
      ]
    }
  }
}
```

## 3、使用VUEX
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态。因此可以存放着全局量。  

## 4、定义插件

插件通常会为 Vue 添加全局功能。插件的范围没有限制——一般有下面几种：  

    1. 添加全局方法或者属性，如: vue-custom-element  

    2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch  

    3. 通过全局 mixin 方法添加一些组件选项，如: vue-router  

    4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。  

    5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router  

在这里我们添加全局属性以及实例属性，实现在全局都能够访问到该全局变量。  

```javascript
// 定义Vue以及实例上的全局常量
const ConstantPlugin = {};
ConstantPlugin.install = function(Vue, options) {
  const CONSTANT = {
    API_DEBOUNCE_CODE: -1,
  };
  Vue.prototype._CONSTANT = CONSTANT;
  Vue._CONSTANT = CONSTANT;
};

export default ConstantPlugin;
```

使用的时候如下：

```javascript
// 在组件中
console.log(this._CONSTANT.API_DEBOUNCE_CODE)

// 在其他js模块中
import Vue from 'vue';
console.log(Vue._CONSTANT.API_DEBOUNCE_CODE)
```

> 参考： [VUE 全局变量的几种实现方式](https://www.jianshu.com/p/7547ff8760c3)  
> 参考： [VUE 插件](https://cn.vuejs.org/v2/guide/plugins.html7ff8760c3)  
