# 语言指南

## 重要概念

* Everything you can place in a variable is an object, and every object is an instance of a class. Even numbers, functions, and null are objects. All objects inherit from the Object class.
所有可以赋值给变量的都是对象，所有对象都继承自 `Object` 类。  

* Although Dart is strongly typed, type annotations are optional because Dart can infer types. In the code above, number is inferred to be of type int. When you want to explicitly say that no type is expected, use the special type dynamic.
尽管 `Dart` 是强类型语言，但是类型指定符不是必须的，因为 `Dart` 能够自动推断类型。当你想要显式地
表示不需要类型时，使用特殊类型 `dyamic`  

* Dart supports generic types, like List<int> (a list of integers) or List<dynamic> (a list of objects of any type).
 `Dart` 支持泛型。  

* Dart supports top-level functions (such as main()), as well as functions tied to a class or object (static and instance methods, respectively). You can also create functions within functions (nested or local functions).
 `Dart` 支持顶级函数(比如 `main()` )，以及绑定到类或对象的函数(分别是静态和实例方法)。您还可以在函数中创建函数(嵌套或本地函数)。  

* Similarly, Dart supports top-level variables, as well as variables tied to a class or object (static and instance variables). Instance variables are sometimes known as fields or properties.
类似地， `Dart` 支持顶级变量，以及与类或对象(静态和实例变量)绑定的变量。实例变量有时称为字段或属性。  

* Unlike Java, Dart doesn’t have the keywords public, protected, and private. If an identifier starts with an underscore (_), it’s private to its library. For details, see Libraries and visibility.
与 `Java` 不同， `Dart` 没有包含关键字 `public` 、 `protected` 和 `private` 。  

* Identifiers can start with a letter or underscore (_), followed by any combination of those characters plus digits.
标识符可以以字母或下划线(_)开头，后面是这些字符和数字的任意组合。  

* Sometimes it matters whether something is an expression or a statement, so it helps to be precise about those two words.
有时候，（一条语句）是表达式还是语句很重要，所以需要准确地表达这两种语句。  

* Dart tools can report two kinds of problems: warnings and errors. Warnings are just indications that your code might not work, but they don’t prevent your program from executing. Errors can be either compile-time or run-time. A compile-time error prevents the code from executing at all; a run-time error results in an exception being raised while the code executes.
 `Dart` 工具可以报告两种问题:警告和错误。  

## 变量

* Uninitialized variables have an initial value of null. Even variables with numeric types are initially null, because numbers—like everything else in Dart—are objects.
没有初始化的变量都会被初始化为一个值： `null`，即使是数字类型的变量也一样。  

### 内建类型

* `Dart` 语言对以下类型有特殊的支持:
  * `numbers`
  * `strings`
  * `booleans`
  * `lists` (also known as arrays)
  * `maps`
  * `runes` (for expressing Unicode characters in a string)
  * `symbols`

### Numbers

* `int`  
    Integer values no larger than 64 bits, depending on the platform. On the Dart VM, values can be from -2<sup>63</sup> to 2<sup>63</sup> - 1. Dart that’s compiled to JavaScript uses JavaScript numbers, allowing values from -2<sup>53</sup> to <sup>53</sup> - 1.
    根据平台的不同，整数值最大不大于64位。在 `Dart VM` 上，值可以从-2<sup>63</sup>到2<sup>63</sup> - 1。被编译成 `JavaScript` 的 `Dart` 使用了 `JavaScript numbers` ，允许值从-2<sup>53</sup> 到 <sup>53</sup> - 1。  

* `double`  
    64-bit (double-precision) floating-point numbers, as specified by the IEEE 754 standard.
    64位(双精度)浮点数，遵循 `IEEE 754` 标准。  

### Strings

* 可以使用 `${expression}` 直接将变量值放在字符串中。  

* 可以使用三倍引号（单引号或者双引号）来得到多行字符串。  

* 加上 `r` 前缀创建的字符串将会表示最“原始”的含义。（所有字符都将表示当前看到的原义）  

### Booleans

* `Dart` 使用 `bool` 类型来代表布尔值。  

* 由于 `Dart` 的类型安全机制，不能需要是用布尔值的地方使用非布尔值代替，必须使用真正的布尔值。  

### Lists

* 在 `Dart` 中，数组是 `List objects`，所以有些开发者直接将数组叫做 *`lists`*。  

### Maps

* 通常 `map` 是一个表示键值对映射关系的对象。  

### Runes

* `runes` 是字符串的 `UTF-32` 编码。  

### Symbols

* `Symbol` 字面量是编译时常量。  

## 函数

* `Dart` 是一种真正的面向对象语言，所以即使是函数也是对象，并且有一个类型， `Function` 。  
