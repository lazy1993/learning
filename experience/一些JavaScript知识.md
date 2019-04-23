# 一些Javascript知识

### forEach

* 没有办法中止或者跳出 forEach() 循环（包括 return），除了抛出一个异常。  

* forEach()不会在迭代之前创建数组的副本。如果数组在迭代时被修改了，则下一个迭代使用的是新的数组。  

```js
var words = ['one', 'two', 'three', 'four'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
});
// one
// two
// four
```
