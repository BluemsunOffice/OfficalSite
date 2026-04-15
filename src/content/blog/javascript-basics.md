---
title: "JavaScript基础"
date: 2024-04-06T13:02:51+08:00
image: "/img/blog_pic/前端.jpg"
draft: false
weight: 100
author: "张俪之"
categories: ["前端"]
description: "JavaScript基础"
---

# 一、JavaScript

### 什么是JavaScript？

<u>是一种运行在客户端（浏览器）的编程语言，实现人机交互效果。</u>

JavaScript是一种为网站添加互动以及自定义行为的客户端脚本语言， 有浏览器一边解释一边执行，可以跨平台、跨浏览器驱动网页，与用户交互。通常只能通过Web浏览器去完成操作， 而无法像普通意义上的程序那样独立运行。
 JavaScript是一种轻量级、解释型的 Web 开发语言，该语言系统不是很庞杂，简单易学。由于所有现代浏览器都己嵌入了JavaScript引擎、JavaScript 源代码可以在浏览器中直接被解释执行，用户不用担心支持问题。

### 作用（做什么）

- 网页特效（监听用户的一些行为让网页做出对应的反馈）
- 表单验证（针对表单数据的合法性进行判断）
- 数据交互（获取后台的数据，渲染到前端）
- 服务端编程（node.js）

### JavaScript由三部分组成(有什么)：

- ECMAScript:描述了JavaScript的基本语法规则，包括数据类型、变量、运算符、分支语句等
- Web APIs:
  - BOM：浏览器对象模型，通过BOM可以操作浏览器窗口,比如页面弹窗、检测窗口宽度、存储数据到浏览器等
  - DOM：文档对象模型，通过BOM可以操作HTML文档类型、样式或者内容，比如对页面元素进行移动，大小，添加。删除等操作

![image-20240424170145581](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241701656.png)

第一个JavaScript程序：

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
</head>
<body>
    <button onclick="show()">显示</button>
    <script>
        function show(){
            alert("hello world");
        }
    </script>
</body>
</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

![img](https://img-blog.csdnimg.cn/direct/e6ecc59b33f04536a81da019d4dd1d79.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

JS注意几点：

1. 区分大小写
2. 语句 在JavaScript中，语句结束的分号不做强制要求，但按照程序规范，建议每一条语句都已分号结束
3. 字面量 在JavaScript中，一个固定值被称为字面量，例如：“Hello World”
4. 注释 单行注释以//开始，多行注释的形式为/*……*/

### JavaScript添加方式

①行内方式

以行内方式添加时，JavaScript会被添加到元素的事件相关属性中

> <input type="button" value="按钮" onclick="alert('Hello World')" /> 

②内嵌方式

可以通过script标签添加到HTML的<head>和<body>部分

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241706088.png" alt="image-20240424170608002" style="zoom:50%;" />

![image-20240424170751696](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241707764.png)

>  <body>
>
>  ……
>
>  ​    <script>
>
>  ​        alert('Hello World!');
>
>  ​    </script>
>
>  </body>

③外部方式

可以通过script标签引入.js文件，这种方式分离了HTML和JavaScript，使代码更容易维护和阅读，而且已缓存的JavaScript文件可以加速页面加载

1. script标签中间无需写代码，否则会被忽略
2. 外部JavaScript会使代码更加有序，更易于复用，且没有了脚本的混合，HTML也会更加易读

> 单独创建sayhello.js
>
> ​    alert（'Hello World!'）;
>
> 在HTML中引入该文件
>
> ​    <script src="sayhello.js"></script>

#### 注释

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241713302.png" alt="image-20240424171300213" style="zoom:67%;" />

#### 结束符

![image-20240424171335994](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241713053.png)

# 二、基本语法 

```javascript
<!--JavaScript严格区分大小写-->
<script>
    //1.定义变量  变量类型  变量名=变量值；
var num=1;
var name="qinjiang";
   //alert(num);
   //2.条件控制
    if(2>1){
        alert("true");
    }
</script>
<!--JavaScript严格区分大小写-->
<script>
    //1.定义变量  变量类型  变量名=变量值；
var num=1;
   //alert(num);
   //2.条件控制
    if(score>60&& score<70){
       alert("60-70")
       }else if(score>70&& score<80){
                alert("70-80")
         }else{
             alert("other")
         }

//console.log(score)在浏览器的控制台打印变量；System.out.println()；

</script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### **Ⅰ、输入输出语法：**

可以理解为人和计算机的交互，用户通过键盘、鼠标等向计算机输入信息，计算机处理后再展示结果给用户

#### （1） 数据输出

1、警告框输出

可以使用windows.alert()将输出内容写入警告框提示文本部分

> alert('要输出的内容')
>
> 作用：页面弹出警告对话框

2、HTML文档输出

可以使用document.write()将结果写入HTML文档

> document.write('要输出的内容')   
>
> 作用：向body内输出内容
>
> 注意：如果输出的内容是标签，也会被解析成网页元素

注：在HTML文档完全加载后使用此方法，会覆盖已有的文档内容

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
</head>
<body>
    <h1>say hello to world</h1>
    <button onclick="show()">显示</button>
    <script>
        function show(){
           document.write("hello world");
        }</script>
</body>
</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

<img src="https://img-blog.csdnimg.cn/direct/722596daa59b415faa3d668fd636b0c1.png" alt="img" style="zoom:33%;" />![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

<img src="https://img-blog.csdnimg.cn/direct/128fd8f65f064b5691d090fc8bdb999d.png" alt="img" style="zoom: 33%;" />![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

3、HTML元素内容输出

可以使用innerHTML属性将结果写入HTML元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
</head>
<body>
    <h1>say hello to world</h1>
    <p id="show"></p>
    <script>
        document.getElementById("show").innerHTML = "hello world";
    </script>
</body>
</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

<img src="https://img-blog.csdnimg.cn/direct/2e757291bcea412eb453ed9db87e82e8.png" alt="img" style="zoom:33%;" />![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

4、控制台输出

可以使用console.log()结果写入浏览器控制台，这种后台输出的方式不会影响页面显示，可用于调试代码

> console.log('控制台打印')
>
> 作用：控制台输出语法，程序员调试使用

##### （2）数据输入

> prompt('请输入你的姓名：')
>
> 作用：显示一个对话框，对话框中包含一条文字信息，用来提示用户输入文字

<u>JavaScript代码执行顺序：</u>

- 按HTML文档流顺序执行JavaScript代码
- alert()和prompt()他们会跳过页面渲染先被执行

### Ⅱ 数据类型

基本数据类型分为两大类

### ![image-20240424182025051](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241820242.png)



①数字型Number

可以是整数、小数、正数、负数

![image-20240424182403954](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241824096.png)

优先级

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404242058105.png" alt="image-20240424205802986" style="zoom:67%;" />

NaN代表一个计算错误，他是一个不正确的或者一个未定义的数学学操作所得到的结果

```html
console.log('lao'shi'-2)  //控制台会返回NaN
```

NaN是粘性的，任何对NaN的操作都会返回NaN

```
console.log(NaN+2)
```

②字符串型String

 通过单引号、双引号或反引号包裹的数据都叫字符串【单引号和双引号没有本质上没有区别】

注意：

1. 无论单引号或是双引号必须成对使用
2. 单引号/双引号可以相互嵌套，但是不以自己嵌套
3. 必要时可以使用转义字符\，输出单引号或双引号

字符串拼接：+运算符

***模板字符串**

语法：

- 必须用反引号``
- 内容拼接变量时，用${}包住变量

```html
<script>
  let age=18
  document.write(`我今年${age}岁了`)
</script>
```

③布尔型Boolean：true和false

④未定义型undefined：变量声明后未赋值，则默认为undefined

**什么情况下会出现这种类型？**

只声明变量，不赋值的情况下，变量的默认值为undefined，一般很少直接为某个变量赋值为undefined

⑤空值null：可以用于将变量置空等操作

**<u>*null和undefined区别</u>**

- undefined表示没有赋值
- null表示赋值了，但是内容为空

⑥数组Array:本质是对象，用于定义一组数据集合，每个数据都被成为数组元素

⑦对象object：任何事物都可以看作对象，对象是属性与方法的集合，即数据与数据的操作集合

**通过typeof关键字检测数据类型**

支持两中语法形式

- 作为运算符：typeof x(常用的写法)
- 函数形式：typeof(x)

**类型转换**

*①隐式转换

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404242212037.png" alt="image-20240424221200937" style="zoom:80%;" />

*②显示转换

![image-20240424222215616](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404242222841.png)

```
console.log(Number('pink'))  //转换为数字型
```



### Ⅲ 常量和变量

##### （一）常量

1、常量：
<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241815553.png" alt="image-20240424181537489" style="zoom:80%;" />

##### （二）变量

1.变量就是一个装东西的盒子。变量是计算机用来存储数据的“容器”。它可以让计算机变得有记忆

注意：变量不是数据本身，作用是用来存放数据的

**内存：**计算机中存储数据的地方，相当于一个空间

**变量的本质**：是程序在内存中申请的一块用来存放数据的小空间

![image-20240424180320740](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241803887.png)

 2、声明变量：

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241739663.png" alt="image-20240424173910486" style="zoom:80%;" />

3.变量的赋值

在变量名后面加=，然后是数值

```html
<script>
  //声明一个年龄变量
  let age
  //赋值
  age=18
  //输出
  console.log(age)
  //声明的同时直接赋值，变量的初始化 let age=18
</script>
```

4.更新变量

变量赋值以后，可以通过简单地给它一个不同的值来更新它

let不允许多次声明一个变量

```html
<script>
  let age=18
  age=19
  console.log(age)
</script>
```

5.声明多个变量

多个变量中间用逗号隔开

```html
let age=18,uname = 'pink'//为了更好的可读性，一行只声明一个变量
```

![image-20240424180715247](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241807344.png)


```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title></title>
</head>
<body>
    <script>
        let uname = prompt('请输入姓名')
        document.write(uname)
    </script>
</body>
</html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

### Ⅳ 运算符

1.算术运算符 

| 运算符 | 说明 |
| ------ | ---- |
| +      | 加   |
| -      | 减   |
| *      | 乘   |
| /      | 除   |
| **     | 幂   |
| %      | 求余 |
| ++     | 递增 |
| --     | 递减 |

**<u>一元运算符：</u>**

- 自增：

  - 符号++

  - 作用：让变量值加1

前置自增：

```
let num=1
++num  
```

后置自增：

```
let num=1
++num  
```

每次执行一次，当前变量数值加1

注意：前置自增和后置自增单独使用时没有区别

***前置自增和后置自增如果参与运算就有区别：***

前置自增：先自加

```
let i=1
console.log(++i + 2) //结果是4，i是2，i先自加1，之后再与后面的2相加
```

后置自增：先运算，后自加

```
let i=1
console.log(i++ +1)//结果是2，此时i的结果是1
```

- 自减：--

2.赋值运算符和表达式（结果是true或false）

用于对变量进行赋值，赋值运算符可以结合算术运算符形成复合的赋值运算

3.关系运算符和表达式（结果是true或false）

| 运算符 | 说明                             |
| ------ | -------------------------------- |
| >      | 大于                             |
| <      | 小于                             |
| >=     | 大于或等于                       |
| <=     | 小于或大于                       |
| ==     | 等于                             |
| ===    | 严格相等，值相等并且类型相同     |
| !=     | 不等于                           |
| !==    | 严格不等，值不相等或者类型不相同 |

注：

```
console.log(NaN === NaN)  //返回false，NaN不等于任何，包括他自己
```

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404242254480.png" alt="image-20240424225450333" style="zoom:67%;" />

4.逻辑运算符 

| 运算符 | 名称 | 说明                                                    |
| ------ | ---- | ------------------------------------------------------- |
| &&     | 与   | A&&B,仅当A,B同时为true，结果为true，其余情况结果为false |
| \|\|   | 或   | A\|\|B,仅当A,B同时为false，结果为false，其余情况为true  |
| !      | 非   | !A，当A为true，!A为false；当A为false，!A为true          |

5.条件运算符和表达式 

条件？结果表达式1：结果表达式2

当条件为true，表达式取值为结果1，否则为结果2

# 三、选择语句

三大流程控制语句：

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404242300144.png" alt="image-20240424230044009" style="zoom: 50%;" />

### （一）分支语句

- [ ] if分支语句
- [x] 三元运算符（见Ⅳ运算符5）
- [ ] switch语句

#### 1、if语句

①if格式（单分支）

> if（条件）{
>
> ​    //条件成立执行这里
>
> }

 ②if…else格式

> if（条件表达式）{
>
> //条件成立执行这里
>
> }
>
> else{
>
> //条件不成立执行这里
>
> }

③if…else if格式

> 例如：
>
> if (b > 0)
>       b = 0;
>   else if(c > 0){
>       c = a;
>       a = 6;
>   }
>   else if(d > 0){
>       d = a;
>       b = a;
>   }
>   else
>       b = c; 

#### 2.switch语句

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404242313902.png" alt="image-20240424231321774" style="zoom:50%;" />

> var age = prompt("请输入年龄：",'')
>
> switch (age) {
>   case 1:
>       alert("一岁");
>       break;
>   case 2:
>       alert("两岁");
>       break;
>   case 3:
>       alert("三岁");
>       break;
>   default:
>        alert("不知道");
> }

#### 3.三元运算符

<u>一般用来取值</u>

条件？结果表达式1：结果表达式2

当条件为true，表达式取值为结果1，否则为结果2

#### *断点调试

- 作用：学习是可以帮助更好的理解代码运行，更快的找到bug
- 浏览器打开调试界面
  - 按F12打开开发者工具
  - 点到sources一栏
  - 选择代码文件

### （二）循环语句 

判断某个条件是否成立，决定是否反复执行程序中某个部分

 ①while语句

> while（循环条件）
>
> {
>
> //循环体
>
> }

循环三要素：

1. 变量起始值
2. 终止条件（没有终止条件，循环会一直执行，造成死循环）
3. 变量变化量（用自增或者自减）

②do…while语句

> do{
>
> //循环体 
>
> }
>
> while(循环条件)；

③for语句

> for（循环变量初始化；循环条件；循环变量自增或自减）{
>
> //循环体
>
> } 

![image-20240425170524653](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404251705848.png)

### （三）跳转语句

break：跳出本层循环，继续执行循环后面的语句，如有多层循环，只能跳出一层

continue：跳出本次循环剩余代码，继续执行下一次循环

# 四、数组

一种将一组数据存储在单个变量名下的优雅方式

### Ⅰ JavaScript中创建数组的方式

声明数组，有序

使用数组：数组名[索引号]  从0开始

数组可以存储任何类型的数据

##### **使用let:**

![image-20240424180911804](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241809878.png)

##### **使用var**

1.使用Array构造函数

var color=new Array();  

```html
//var 数组名 = new Array();
var arr1 = new Array();			//创建一个新的空数组
var arr2 = new Array(5);			//创建一个长度为5的数组
var arr3 = new Array([5]);		//创建一个数组，长度为1，并且第一位是5
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

注意：括号里面参数可以有参数，若为一个数字，表示该数组的长度，如果为多个数字或者一个（多个）非数字表示的是传递数组中应该包含的值。

2.使用数组字面量

var color=[];

3.数组的长度

一为数组长度是指数组包含元素的个数，二维数组长度是指行的个数，数组长度可以用length属性获得

数组长度=索引号+1

> let arr=[1,2,3]
>
> console.log(arr.length); //数组长度为3

![image-20240424181418845](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404241814952.png)

### Ⅱ 数组的方法

有数组原型方法，也有从object对象继承来的方法

**1.join()**

join(separator): 将数组的元素组起一个字符串，以separator为分隔符，省略的话则用默认用逗号为分隔符，该方法只接收一个参数：即分隔符。

**2.push()和pop()**

push(): 可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。

```html
<script>
	const array =[1,2,3,4,5]
	console.log(array)
	const newArray = array.push[6,7,8,9,10]
	console.log(array)
</script>
```

 pop()：数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。

 注意：pop（）里面没有参数，及时有参数，也是删除最后一项。

```html
<script>
	const array = [1,2,3,4,5]
	console.log(array.pop())   //返回5
	console.log(array) //输出[1,2,3,4]
</script>
```

**3、shift() 和 unshift()**

shift()：删除原数组第一项，并返回删除元素的值；如果数组为空则返回undefined 。 

```html
<script>
    const array = [1,2,3,4,5]
    console.log(array)
    array.shift()
    console.log(array)
</script>
```

 unshift:将参数添加到原数组开头，并返回数组的长度 。

```html
<script>
	const array = [1,2,3,4,5]
    console.log(array)
    array.unshift(6,7,8,9,10)
    console.log(array) 
</script>
```

这组方法和上面的push()和pop()方法正好对应，一个是操作数组的开头，一个是操作数组的结尾。

**4.isArray()**

这个方法用来判断一个对象是不是数组，是的话返回true，否则返回false

```html
<script>
    const array = [1,2,3,4,5]
    console.log(Array.isArray(array))  //返回true
</script>
```

**5.map()**

map()返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值

map()方法按照原始数组元素顺序依次处理元素

```html
<script>
    const array = [1,2,3,4,5]
    console.log(array)  //返回[1，2，3，4，5]
    const newArray = array.map(x=>x+1)
    console.log(newArray)  //返回[2,3,4,5,6]
</script>
```

**6.filter()**

filter()方法创建一个新的数组，新数组中的元素是通过指定数组中符号条件的所有元素

filter()不会对空数组进行检测，不会改变原始数组

```html
<script>
    const array = [1,2,3,4,5]
    const newArray = array.filter(item=>item>2)
    console.log(newArray)//输出3，4，5
</script>
```

**5.sort()**

sort()：按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。

在排序时，sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， sort()方法比较的也是字符串

为了解决上述问题，sort()方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。

**5.reverse()**

reverse()：反转数组项的顺序。

**6、concat()**

concat() ：将参数添加到原数组中。这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给 concat()方法传递参数的情况下，它只是复制当前数组并返回副本。

**7、slice()**

slice()：返回从原数组中指定开始下标到结束下标之间的项组成的新数组。

slice()方法可以提取字符串的某个部分，并以新的字符串返回被提取的部分

slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。

```html
<script>
    const array = [1,2,3,4,5]
    console.log(array)
    const newArray = array.slice(-3,-1)
    console.log(newArray)//[3,4]
</script>
```

**8、splice()**

splice()：很强大的数组方法，它有很多种用法，可以实现删除、插入和替换。

删除：可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。例如， splice(0,2)会删除数组中的前两项。

插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：<u>**起始位置、 0（要删除的项数）和要插入的项**</u>。例如，splice(2,0,4,6)会从当前数组的位置 2 开始插入4和6。
 替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (2,1,4,6)会删除当前数组位置 2 的项，然后再从位置 2 开始插入4和6。

splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项，如果没有删除任何项，则返回一个空数组。

<script>
    const array = [1,2,3,4,5]
    const newArray = array.slice(4,1,6,7)
    console.log(array)//输出[1,2,3,4,6,7]
    console.log(newArray)
</script>


**9、indexOf()和 lastIndexOf()**

indexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找。 
 lastIndexOf：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的末尾开始向前查找。

这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1。在比较第一个参数与数组中的每一项时，会使用全等操作符。

操作数组

##### 增

数组添加新的数据arr.push(新增的内容)，arr.unshift(新增的内容)

在末尾增加

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252040072.png" alt="image-20240425204018934" style="zoom:50%;" />

在开头增加

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252041293.png" alt="image-20240425204124100" style="zoom:50%;" />

##### 删

删除数组中的数据

1.数组.pop()

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252044078.png" alt="image-20240425204458990" style="zoom:50%;" />

2.数组.shift()

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252049056.png" alt="image-20240425204938963" style="zoom:50%;" />

3.数组.splice()

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252051170.png" alt="image-20240425205145035" style="zoom:50%;" />

##### 改

重新赋值   数组[下标] = 新值

```html
<script>
    const array = ['pink','red','black']
    array[0] = 'white'
    console.log(array) //['white','red','black']
</script>
```

##### 查

查询数组数据   数组[下标]

#### 冒泡排序

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252118010.png" alt="image-20240425211823852" style="zoom:67%;" />

```html
<script>
    let arr = [5,4,3,2,1]
    for(let i = 0;i <arr.length-1;i++) {
        for(let j = 0;j<arr,length-i-1;j++) {
            if(arr[j]>arr[j+1]){
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
</script>
```



# 五、函数

### ①为什么要使用函数

可以实现代码复用，提高开发效率

### ②函数是什么

function执行特定任务的代码块

### ③函数使用

函数的声明语法

> function 函数名（） {
>
> ​       函数体
>
> }

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252132177.png" alt="image-20240425213243071" style="zoom:80%;" />

函数的调用方法

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252133913.png" alt="image-20240425213325826" style="zoom:50%;" />

函数不调用自己不执行，随时调用，随时执行，可以重复调用

### ④函数传参

好处：极大的提高了函数的灵活性

若函数完成功能需要调用者传入数据，那么就需要用有参数的函数

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252141691.png" alt="image-20240425214154557" style="zoom:67%;" />

```html
<script>
    function getSum(end)
    {
        let sum = 0;
        for(let i=0;i<=end;i++){
            sum+=1;
        }
        console.log(sum)
    }
    getSum(50)   //求累加和
</script>
```

调用函数时，需要传入几个参数，中间用逗号隔开

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252153393.png" alt="image-20240425215342145" style="zoom:67%;" />

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252156547.png" alt="image-20240425215645301" style="zoom:67%;" />

注意：这个默认值只会在缺少实参传递时才会被执行，所以有参数会优先执行传递过来的实参，否则默认为undefined

### ⑤函数返回值

当调用某个函数是，这个函数会返回一个结果出来，这就是有返回值的函数

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252204621.png" alt="image-20240425220444518" style="zoom:50%;" />

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252212178.png" alt="image-20240425221206981" style="zoom:80%;" />

### ⑥作用域

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252216041.png" alt="image-20240425221620917" style="zoom:67%;" />

如果函数内部，变量没有声明，直接赋值，也当全局变量看（不推荐使用）

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252223606.png" alt="image-20240425222339487" style="zoom:50%;" />

预解析：

1.会把全局的变量的“声明”提前，

2.提前声明函数，但是函数内部的代码是不执行的。

局部变量：必须在函数内部使用var\let声明。如果不使用，则称为隐式全局变量

隐式全局变量：只有在执行后才能使用.

全局变量和局部变量可以重名，使用就近原则。

### ⑦匿名函数

没有名字的函数，无法直接使用

![image-20240425222557577](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252225803.png)

第一种写法：将匿名函数赋值给一个变量，并且通过变量名称进行调用 称之为**函数表达式**

```html
<script>
    //函数表达式
 let fn=function() {
   //函数体
     console.log('我是函数表达式')
 }
 fn()
</script>
```

函数表达式和具名函数的不同：

1.具名函数的调用可以写到任何位置

2.函数表达式必须先声明，后调用

第二种写法：立即执行函数

避免全局变量之间的污染

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404252233955.png" alt="image-20240425223353882" style="zoom:50%;" />

最后必须有分号；结束语句

### ⑧逻辑中断

1.逻辑运算符里的短路   

![image-20240426183456826](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404261834910.png)

逻辑与：都是真，返回最后一个真值

逻辑或：输出第一个真值

### ⑨转换布尔型

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404261838290.png" alt="image-20240426183822196" style="zoom:67%;" />

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404261840044.png" alt="image-20240426184020956" style="zoom:80%;" />

# 六、对象

##### Ⅰ什么是对象？

- 对象（object）：JavaScript里的一种数据类型
- 可以理解为一种无序的数据集合，注意数组是有序的数据类型
- 特点：<u>无序的</u>数据集合，可以详细的描述某个事物

##### Ⅱ对象的使用

1.对象声明语法

```html
let 对象名 = {}  //{}对象字面量
```

```
let 对象名 = new Object()
```

2.对象有属性和方法组成

属性：信息或特征（名词）

方法：功能或行为（动词）

```
let 对象名 = {
	属性名 : 属性值,
	方法名 : 函数
}
```

![image-20240426185154554](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404261851644.png)

##### Ⅲ对象的操作

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404261854114.png" alt="image-20240426185459030" style="zoom: 50%;" />

- 查

  - 声明对象，并添加了若干属性后，可以使用.获得对象中属性对应的值，成为属性访问

  - 语法：①对象名.属性  ②对象名['属性名']

- 改

语法：对象名.属性 = 新值

- 增

语法：对象名.属性 = 新值

- 删

delete 对象名.属性名

##### Ⅳ对象中的方法

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404261907170.png" alt="image-20240426190753014" style="zoom:50%;" />

方法调用：对象名.方法名

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404261910452.png" alt="image-20240426191048348" style="zoom:50%;" />

##### Ⅴ遍历对象

- 对象是无序的键值对，没有规律，不像数组里面有规律的下标
- 对象没有像数组一样的length属性，无法确定长度

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404261921921.png" alt="image-20240426192123812" style="zoom:67%;" />

```html
<script>
    let obj ={
        uname:'Karry',
        age:24,
        gender:'男'
    }
    //遍历对象
    for (let k in obj) {
        console.log(k)//k属性名存的是字符串‘uname''age''gender'
        console.log(obj[k]) //输出属性值
    }
</script>
```

##### Ⅵ内置对象

1.内置对象是什么？

JavaScript内部提供的对象，包含各种属性方法和属性

2.内置对象-Math

- 是JavaScript提供的一个数学对象
- 作用：提供一系列做数学运算的方法

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404261925600.png" alt="image-20240426192510502" style="zoom:67%;" />

Math.round():四舍五入

生成任意范围的随机数

<img src="https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202404261935274.png" alt="image-20240426193508144" style="zoom:50%;" />