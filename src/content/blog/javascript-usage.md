---
title: "JavaScript"
date: 2024-04-15T14:55:51+08:00
image: "/img/blog_pic/前端.jpg"
draft: false
weight: 100
author: "多雅晗"
categories: ["前端"]
description: "JavaScript基础"
---
**JavaScript简介**

- JavaScript能够改变HTML内容
- JavaScript能够改变HTML属性
- JavaScript能够改变HTML样式
- JavaScript能够隐藏HTML元素（display）
- JavaScript能够显示HTML元素（display）

## JavaScript使用

### <script>标签

在HTML中，JavaScript 代码必须位于 <script> 与 </script> 标签之间。

```html
<!DOCTYPE html>
<html>
<body>

<h2>Body 中的 JavaScript</h2>
<p id="demo"></p>
<script>
document.getElementById("demo").innerHTML="我的第一段 JavaScript";
</script>

</body>
</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

运行结果：![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/%E5%A4%9A%E9%9B%85%E6%99%972023013326202502262338081.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

注释：

- 旧的JavaScript例子也许会使用type属性：<script type="text/javascript">。
- type属性不是必需的。JavaScript是HTML中的默认脚本语言。

### head或body中的JavaScript

#### head中的JavaScript 

```html
<!DOCTYPE html>
<html>
<head>
<script>
function myFunction() {
    document.getElementById("demo").innerHTML = "更改后的段落";
}
</script>
</head>

<body>

<h2>Head中的JavaScript</h2>
<p id="demo">原段落。</p>
<button type="button" onclick="myFunction()">按钮</button>

</body>
</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

运行结果：

原：![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/%E5%A4%9A%E9%9B%85%E6%99%972023013326202502262338190.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

点击按钮后： ![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/%E5%A4%9A%E9%9B%85%E6%99%972023013326202502262338166.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

####  <body>中的JavaScript

```html
<!DOCTYPE html>
<html>
<body>

<h2>Body中的JavaScript</h2>
<p id="demo">原段落。</p>
<button type="button" onclick="myFunction()">按钮</button>

<script>
function myFunction() {
   document.getElementById("demo").innerHTML = "更改后的段落";
}
</script>

</body>
</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

运行结果：

原：![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/%E5%A4%9A%E9%9B%85%E6%99%972023013326202502262338214.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

点击按钮后： ![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/%E5%A4%9A%E9%9B%85%E6%99%972023013326202502262338186.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

### 外部JavaScript 

添加：使用多个script标签

```html
<script src="myScript1.js"></script>
<script src="myScript2.js"></script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

外部引用：

1、用完整的URL来链接

```html
<script src="链接"></script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 2、使用当前网站的指定文件夹中的脚本

```html
<script src="/js/myScript1.js"></script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

3、使用与当前页面相同文件夹的脚本

```html
<script src="myScript1.js"></script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

###  注释

- 单行注释：//
- 多行注释：/* */
- 快捷键：ctrl+/ 

### 结束符 

结束符为;  多数情况下可以省略使用回车替代

### 输入和输出

输入：prompt()

输出：alert()，document.write()

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>try</title>
</head>
<body>
  
  <script> 
    // 弹窗形式
    document.write('要输出的内容')
    alert('要输出的内容');
    // 弹窗形式,英文引号
    prompt('请输入您的姓名:')
  </script>
</body>
</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

运行结果：![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/%E5%A4%9A%E9%9B%85%E6%99%972023013326202502262338178.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

点击确定后：![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/%E5%A4%9A%E9%9B%85%E6%99%972023013326202502262338844.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

## 变量

### 声明

构成：声明关键字+变量名（标识符）

关键字：let（推荐使用）+var

### 赋值

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>try</title>
</head>
<body>
  
  <script> 
    let age
    age = 18
    document.write(age)//18被赋给age了
    // 声明和赋值可以同时进行
    let str = 'hello world!'
    alert(str);
  </script>
</body>
</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### 关键字

1、let（推荐使用）

- 允许声明和赋值同时进行
- 不允许重复声明
- 允许同时声明多个变量并赋值
- JavaScript 中内置的一些关键字不能被当做变量名

2、var 

- 允许声明和赋值同时进行
- 允许重复声明
- 允许同时声明多个变量并赋值

### 变量名命名规则

- 只能是字母、数字、下划线、$，且不能能数字开头
- 字母区分大小写，如 Age 和 age 是不同的变量
- JavaScript 内部已占用于单词（关键字或保留字）不允许使用
- 尽量保证变量具有一定的语义，见字知义

## 常量

声明:const

```javascript
const PI = 3.14
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 数据类型

可用typeof检测数据类型

#### 数值类型(number)

整数，小数，正数，负数

```javascript
  <script> 
    let score = 10 // 正整数
    let price = 1.1234 // 小数
    let temperature = -10 // 负数
    document.write(typeof score) // 结果为 number
    document.write(typeof price) // 结果为 number
    document.write(typeof temperature) // 结果为 number
  </script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

#### 字符串类型(string)

**注意：**

- 无论单引号或是双引号必须成对使用
- 单引号/双引号可以互相嵌套，但是不以自已嵌套自已
- 必要时可以使用转义符 `\`，输出单引号或双引号

```javascript
<script>
    let name='小明'
    let gender="男"
    let age='18'   //实际上是字符串
    let str=''     //这是空字符串
</script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### 布尔类型 (boolean)

值为true，false

#### 未定义(undefined)

只声明变量，不赋值的情况下，变量的默认值为 undefined，一般很少直接为某个变量赋值为underfined。

```javascript
<script> 
    // 只声明了变量，未赋值
    let tmp;
    document.write(typeof tmp) // 结果为undefined
</script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

JavaScript中，变量的值决定了变量的数据类型。

## 类型转换

### 隐式转换

运算时系统自动转换

### 显示转换

number转换成数值类型

```javascript
<script>
    let t = '12'
    let f = 8
    //将字符串 12 转换成数值 12
    t = Number(t)
</script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 语句

### 分支语句

#### if分支语句

```javascript
if(条件表达式) {
  // 满足条件要执行的语句
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

#### if双分支语句

```javascript
if (条件表达式){
  // 满足条件要执行的语句
} else {
  // 不满足条件要执行的语句
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

#### if多分支语句

```javascript
if (条件表达式一){
    执行一}
else if (条件表达式二){
    执行二
}
else if (条件表达式三){
    执行三}
else {
    执行四
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

####  三元运算符

```javascript
条件 ? 表达式1 ： 表达式2
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

#### switch语句

```javascript
<script>
  switch (2) {
    case 1:
    console.log('选择1')
    break 
    case 2:
    console.log('选择2')
    break 
    case 3:
    console.log('选择3')
    break
    default:
    console.log('无符合条件')
  }
</script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### 循环语句

#### while循环

```javascript
while (条件表达式) {
   // 循环体    
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

#### for循环

```javascript
for(初始值;进入循环的条件;执行语句){
    //循环体
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

#### 中止循环

- break：中止整个循环
- continue：中止本次循环

## 函数

### 声明和调用

#### 声明（定义）

声明一个完整函数包括：关键字、函数名、形式参数、函数体、返回值

#### 调用

使用()调用函数

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>try</title>
</head>
<body>
  <script>
    // 声明了最简单的函数，既没有形式参数，也没有返回值
    function sayHi() {
      console.log('嗨')
    }      
    sayHi()
    // 可以重复被调用
    sayHi()
  </script>
</body>
</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### 参数

形参：声明函数时用的

实参：调用函数时用的

注意：

- 声明（定义）函数时的形参没有数量限制，当有多个形参时使用 `,` 分隔
- 调用函数传递的实参要与形参的顺序一致

### 返回值

return+返回值

### 作用域

- 全局作用域：作用于所有代码执行的环境(整个 script 标签内部)或者一个独立的 js 文件
- 局部作用域：作用于函数内的代码环境。

### 匿名函数

含义：没有名字的函数,无法直接使用。

#### 函数表达式

```javascript
// 声明
let fn = function() { 
   console.log('函数表达式')
}
// 调用
fn()
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

#### 立即执行函数

```javascript
(function(){ xxx  })();
(function(){xxxx}());
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)