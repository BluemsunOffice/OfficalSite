---
title: "Web APIs+DOM+BOM"
date: 2024-07-26T13:02:51+08:00
image: "/img/blog_pic/前端.jpg"
draft: false
weight: 100
author: "多雅晗"
categories: ["前端"]
description: "介绍了Web开发中与JavaScript相关的核心概念和功能，重点讲解了Web APIs、DOM和BOM的基本知识"
---

# Web APIs

## JS的组成

![image-20240418172539479](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271059549.png)

## API

### 定义

API（Application Programming Interface,应用程序编程接口）是一些预先定义的函数，目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力，而又无需访问源码，或理解内部工作机制的细节。

### Web API

**Web API** 是浏览器提供的一套操作浏览器功能和页面元素的 API ( BOM 和 DOM )。

# DOM

## 简介

### 定义

文档对象模型（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展标记语言（HTML或者XML）的标准编程接口。W3C 已经定义了一系列的 DOM 接口，通过这些 DOM 接口可以改变网页的内容、结构和样式。

### DOM树

![image-20240418174801669](https://i-blog.csdnimg.cn/blog_migrate/907ccd095ea2450dbb766de4df3d2ba2.png)

## 获取元素

### 根据 ID 获取

使用 getElementById() 方法可以获取带有 ID 的元素对象。

```javascript
 document.getElementById('id');
```

使用 console.dir() 可以打印我们获取的元素对象，更好的查看对象里面的属性和方法。

### 根据标签名获取

使用 getElementsByTagName() 方法可以返回带有指定标签名的对象的集合。

```javascript
 document.getElementsByTagName('标签名');
```

还可以获取某个元素(父元素)内部所有指定标签名的子元素

注意：父元素必须是单个对象(必须指明是哪一个元素对象). 获取的时候不包括父元素自己。

```javascript
element.getElementsByTagName('标签名');
```

### 通过 HTML5 新增的方法获取

```javascript
document.getElementsByClassName(’类名‘)；// 根据类名返回元素对象集合
document.querySelector('选择器');        // 根据指定选择器返回第一个元素对象
document.querySelectorAll('选择器');     // 根据指定选择器返回
```

### 特殊元素获取

```javascript
doucumnet.body  // 返回body元素对象
document.documentElement  // 返回html元素对象
```

## 事件基础

### 事件概述

事件是可以被 JavaScript 侦测到的行为。

简单理解： 触发--- 响应机制。

### 事件三要素

- 事件源
- 事件类型
- 事件处理程序

### 执行事件的步骤

- 获取事件源
- 注册事件（绑定事件）
- 添加事件处理程序（采取函数赋值形式）

### 常见的鼠标事件

| 鼠标事件    | 触发条件         |
| ----------- | ---------------- |
| onclick     | 鼠标点击左键触发 |
| onmouseover | 鼠标经过触发     |
| onmouseout  | 鼠标离开触发     |
| onfocus     | 获得鼠标焦点触发 |
| onblur      | 失去鼠标焦点触发 |
| onmousemove | 鼠标移动触发     |
| onmouseup   | 鼠标弹起触发     |
| onmousedown | 鼠标按下触发     |

## 操作元素

JavaScript 的 DOM 操作可以改变网页内容、结构和样式，我们可以利用 DOM 操作元素来改变元素里面的内容 、属性等。

### 改变元素内容

```javascript
element.innerText
/*从起始位置到终止位置的内容, 但它去除 html 标签， 同时空格和换行也会去掉*/
element.innerHTML
/*起始位置到终止位置的全部内容，包括 html 标签，同时保留空格和换行*/
```

### 常用元素的属性操作

- innerText、innerHTML 改变元素内容
- src、href
- id、alt、title

### 表单元素的属性操作

利用DOM可以操作如下表单元素的属性： type、value、checked、selected、disabled

### 样式属性操作

```javascript
element.style     行内样式操作
element.className 类名样式操作
```

### 排他思想

如果有同一组元素，我们想要某一个元素实现某种样式， 需要用到循环的排他思想算法：

- 所有元素全部清除样式
- 给当前元素设置样式 
- 注意顺序不能颠倒，首先对所有元素，再设置自己

### 自定义属性的操作

#### 获取属性值

- lelement.属性 获取内置属性值（元素本身自带的属性）
- lelement.getAttribute(‘属性’); 主要获得自定义的属性 （标准） 我们程序员自定义的属性

#### 设置属性值

- lelement.属性 设置内置属性值
- lelement.setAttribute(‘属性’); 主要设置自定义的属性 （标准）

#### 移除属性

​	<u>lelement.removeAttribute('属性');</u>

### H5自定义属性

自定义属性目的：为了保存并使用数据。有些数据可以保存到页面中而不用保存到数据库中。

自定义属性获取是通过getAttribute(‘属性’) 获取。

#### 设置H5自定义属性

H5规定自定义属性data-开头做为属性名并且赋值。

```html
<div data-index="1"></div>
```

```javascript
/*或者使用 JS 设置*/
element.setAttribute(‘data-index’, 2)
```

#### 获取H5自定义属性

- 兼容性获取  element.getAttribute(‘data-index’);
- H5新增 element.dataset.index 或者 element.dataset[‘index’]  ie 11才开始支持

## 节点操作

获取元素可以利用DOM提供的方法获取元素，也可以利用节点层级关系，但节点操作更简单。

### 节点概述

网页中的所有内容都是节点（标签、属性、文本、注释等），在DOM 中，节点使用 node 来表示。

HTML DOM 树中的所有节点均可通过 JavaScript 进行访问，所有 HTML 元素（节点）均可被修改，也可以创建或删除。

### 节点属性

一般地，节点至少拥有nodeType（节点类型）、nodeName（节点名称）和nodeValue（节点值）这三个基本属性。

- 元素节点  nodeType 为 1
- 属性节点 nodeType 为 2
- 文本节点 nodeType 为 3 （文本节点包含文字、空格、换行等）

在实际开发中，节点操作主要操作的是**元素节点**

### 节点层级

常见的是父子兄层级关系

#### 父级节点

 node.parentNode 

- parentNode 属性可返回某节点的父节点，注意是最近的一个父节点
- 如果指定的节点没有父节点则返回 null 

#### 子节点

1、parentNode.childNodes（标准）

parentNode.childNodes 返回包含指定节点的子节点的集合，该集合为即时更新的集合。

**注意：**返回值里面包含了所有的子节点，包括元素节点，文本节点等。

如果只想要获得里面的元素节点，则需要专门处理。 所以我们一般不提倡使用childNodes

2、parentNode.children（非标准）

parentNode.children 是一个只读属性，返回所有的子元素节点。它只返回子元素节点，其余节点不返回 。

 3、parentNode.firstChild  

firstChild 返回第一个子节点，找不到则返回null。同样，也是包含所有的节点

4、parentNode.lastChild

lastChild 返回最后一个子节点，找不到则返回null。同样，也是包含所有的节点。

5、parentNode.firstElementChild

firstElementChild  返回第一个子元素节点，找不到则返回null。

6、 parentNode.lastElementChild  

lastElementChild 返回最后一个子元素节点，找不到则返回null。 

#### 兄弟节点

1、 node.nextSibling

nextSibling 返回当前元素的下一个兄弟元素节点，找不到则返回null。同样，也是包含所有的节点。

 2、node.previousSibling

previousSibling 返回当前元素上一个兄弟元素节点，找不到则返回null。同样，也是包含所有的节点。

### 创建节点

 <u>document.createElement('tagName')</u>

document.createElement() 方法创建由 tagName 指定的 HTML 元素。因为这些元素原先不存在，是根据我们的需求动态生成的，所以我们也称为动态创建元素节点。

### 添加节点

 <u>node.appendChild(child)</u> 

node.appendChild() 方法将一个节点添加到指定父节点的子节点列表末尾。类似于 CSS 里面的 after 伪元素。

<u>node.insertBefore(child, 指定元素)</u> 

node.insertBefore() 方法将一个节点添加到父节点的指定子节点前面。类似于 CSS 里面的 before 伪元素。

### 删除节点

<u>node.removeChild(child)</u> 

node.removeChild() 方法从 DOM 中删除一个子节点，返回删除的节点。

### 复制节点

 <u>node.cloneNode()</u> 

node.cloneNode() 方法返回调用该方法的节点的一个副本。 也称为克隆节点/拷贝节点

**注意**

- 如果括号参数为空或者为 false ，则是浅拷贝，即只克隆复制节点本身，不克隆里面的子节点。
- 如果括号参数为 true ，则是深度拷贝，会复制节点本身以及里面所有的子节点。

### 三种动态创建元素区别

- document.write()
- element.innerHTML
- document.createElement()

**区别**

- document.write 是直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面全部重绘
- innerHTML 是将内容写入某个 DOM 节点，不会导致页面全部重绘
- innerHTML 创建多个元素效率更高（不要拼接字符串，采取数组形式拼接），结构稍微复杂
- createElement() 创建多个元素效率稍低一点点，但是结构更清晰

**总结**：不同浏览器下，innerHTML 效率要比 creatElement 高

## DOM重点核心

### 创建

- document.write
- innerHTML
- createElement

### 增

- appendChild
- insertBefore

### 删

- removeChild

### 改

主要修改dom的元素属性，dom元素的内容、属性, 表单的值等

- 修改元素属性： src、href、title等
- 修改普通元素内容： innerHTML 、innerText
- 修改表单元素： value、type、disabled等
- 修改元素样式： style、className

### 查

主要获取查询dom的元素

- DOM提供的API 方法： getElementById、getElementsByTagName 古老用法 不推荐 
- H5提供的新方法： querySelector、querySelectorAll  提倡
- 利用节点操作获取元素： 父(parentNode)、子(children)、兄(previousElementSibling、nextElementSibling) 提倡

### 属性操作

主要针对于自定义属性。

- setAttribute：设置dom的属性值
- getAttribute：得到dom的属性值
- removeAttribute移除属性

### 事件操作

给元素注册事件， 采取 事件源.事件类型 = 事件处理程序

| 鼠标事件    | 触发条件         |
| ----------- | ---------------- |
| onclick     | 鼠标点击左键触发 |
| onmouseover | 鼠标经过触发     |
| onmouseout  | 鼠标离开触发     |
| onfocus     | 获得鼠标焦点触发 |
| onblur      | 失去鼠标焦点触发 |
| onmousemove | 鼠标移动触发     |
| onmouseup   | 鼠标弹起触发     |
| onmousedown | 鼠标按下触发     |

## 

# BOM

## BOM概述

### 定义

BOM（Browser Object Model）即**浏览器****对象模型**，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是 window。

BOM 由一系列相关的对象构成，并且每个对象都提供了很多方法与属性。

### 构成

BOM比DOM更大，它包含DOM

![image-20240420154952095](https://i-blog.csdnimg.cn/blog_migrate/59c24ba0a9b3f12cf592fa737bdce5ac.png)

## window对象的常见事件

### 窗口加载事件

1、
<u>window.onload = function(){}</u>
或者 
<u>window.addEventListener("load",function(){});</u>

window.onload 是窗口 (页面）加载事件,当文档内容完全加载完成会触发该事件(包括图像、脚本文件、CSS 文件等), 就调用的处理函数。

2、<u>document.addEventListener('DOMContentLoaded',function(){})</u>

DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash等等。

### 调整窗口大小事件

 <u>window.onresize = function(){}</u>

<u>window.addEventListener("resize",function(){});</u>

## 定时器

### setTimeout()定时器

<u>window.setTimeout(调用函数, [延迟的毫秒数]);</u>

setTimeout() 方法用于设置一个定时器，该定时器在定时器到期后执行调用函数。

### 停止 setTimeout()定时器

<u>window.clearTimeout(timeoutID)</u>

clearTimeout()方法取消了先前通过调用 setTimeout() 建立的定时器

### setInterval()定时器

<u>window.setInterval(回调函数, [间隔的毫秒数]);</u>

setInterval() 方法重复调用一个函数，每隔这个时间，就去调用一次回调函数。

### 停止setInterval()定时器

 <u>window.clearInterval(intervalID);</u>

clearInterval()方法取消了先前通过调用 setInterval()建立的定时器。

### this

- 全局作用域或者普通函数中this指向全局对象window（注意定时器里面的this指向window）
- 方法调用中谁调用this指向谁
- 构造函数中this指向构造函数的实例

## JS执行队列

### JS是单线程

同一时间只能做同一件事

### 同步和异步

**同步：**前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的。

**异步：**你在做一件事情时，因为这件事情会花费很长时间，在做这件事的同时，还可以去处理其他事情。

**本质区别：** 这条流水线上各个流程的执行顺序不同。

**同步任务：**同步任务都在主线程上执行，形成一个执行栈。

**异步任务：**

- 普通事件，如 click、resize 等
- 资源加载，如 load、error 等
- 定时器，包括 setInterval、setTimeout 等

### JS执行机制

- 先执行执行栈中的同步任务。
- 异步任务（回调函数）放入任务队列中。
- 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行。

## location对象

### 定义

window 对象给我们提供了一个 location 属性用于获取或设置窗体的 URL，并且可以用于解析 URL 。 因为这个属性返回的是一个对象，所以我们将这个属性也称为 location 对象。

### URL

| 组成     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| protect  | 通信协议 常用的http,ftp,maito                                |
| host     | 主机（域名）                                                 |
| port     | 端口号 可选，省略时使用方案的默认端口 如http的默认端口为80   |
| path     | 路径 由0或多个'/'符号隔开的字符串，一般用来表示主机上的一个目录或文件地址 |
| query    | 参数 以键值对的形式，通过&符号分割开来                       |
| fragment | 片段#后面内容 常见于链接 锚点                                |

### location对象的属性

| location对象的属性 | 返回值                            |
| ------------------ | --------------------------------- |
| location.href      | 获取或者设置整个URL               |
| location.host      | 返回主机（域名）                  |
| location.port      | 返回端口号 如果未写返回 空字符串  |
| location.pathname  | 返回路径                          |
| location.search    | 返回参数                          |
| location.hash      | 返回片段#后面内容 常见于链接 锚点 |

### location对象的方法

| location对象方法   | 返回值                                                       |
| ------------------ | ------------------------------------------------------------ |
| location.assign()  | 跟href一样，可以跳转页面（也称为重定向页面）                 |
| location.replace() | 替换当前页面，因为不记录历史，所以不能后退页面               |
| location.reload()  | 重新加载页面，相当于刷新按钮或者f5如果参数为true强制刷新Ctrl+f5 |

## navigator 对象

navigator 对象包含有关浏览器的信息，它有很多属性，我们最常用的是 userAgent，该属性可以返回由客户机发送服务器的 user-agent 头部的值。

## history 对象

| history对象方法 | 作用                                                      |
| --------------- | --------------------------------------------------------- |
| back()          | 可以后退功能                                              |
| forward()       | 前进功能                                                  |
| go(参数)        | 前进后退功能 参数如果是1前进1个页面，如果是-1后退一个页面 |

数为true强制刷新Ctrl+f5 |

## navigator 对象

navigator 对象包含有关浏览器的信息，它有很多属性，我们最常用的是 userAgent，该属性可以返回由客户机发送服务器的 user-agent 头部的值。

## history 对象

| history对象方法 | 作用                                                      |
| --------------- | --------------------------------------------------------- |
| back()          | 可以后退功能                                              |
| forward()       | 前进功能                                                  |
| go(参数)        | 前进后退功能 参数如果是1前进1个页面，如果是-1后退一个页面 |

