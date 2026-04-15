---
title:   Vue3的基础学习
date: 2024-08-23T12:33:45+10:00
image: "/img/blog_pic/vue1.jpg"
draft: false
featured: true
author: "骆健渤"
categories: ["前端"]
weight: 1
description: "Vue的安装·脚手架的安装 ·vue的基本语法·路由·循环语句 "
---
# 一、Vue的安装 

在这里我们推荐用vite来安装vue

//在此之前请确认已经安装好npm，node.js

下面是检查是否安装好npm的方法 

在命令控制行输入以下命令

```html
npm -v
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

如果安装成功，则会显示版本号，如下图所示

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271103974.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑 

## 1.npm的换源 

在每一次的实际开发过程中，我们都会下载相关的依赖包，最官方的是 [npm](https://www.npmjs.com/) ，但是该服务器对于国内开发者来说，下载起来是比较慢的，所以我们需要换源。

##### `cnpm` : 国内对npm的镜像版本

```html
/*
* cnpm 官网地址: https://npm.taobao.org/
* cnpm 的大多命令跟 npm 的是一致的,比如安装,卸载这些
*/
 
npm install -g cnpm --registry=https://registry.npm.taobao.org

// https://registry.npm.taobao.org 可能已经停止解析，可以使用以下地址
npm install -g cnpm --registry=https://registry.npmmirror.com
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

注意安装cnpm后，vscode可能会提示你不支持这个脚本。

此时我们只需要以管理员的模式进入命令控制行输入以下命令即可

```html
set-ExecutionPolicy RemoteSigned
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271103867.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑如上图所示即可

# 二、脚手架的安装 

- 具体操作如下（点击查看[官方文档](https://gitee.com/link?target=https%3A%2F%2Fcn.vuejs.org%2Fguide%2Fquick-start.html%23creating-a-vue-application)）

```html
## 1.创建命令
npm create vue@latest

## 2.具体配置
## 配置项目名称
√ Project name: vue3_test
## 是否添加TypeScript支持
√ Add TypeScript?  Yes
## 是否添加JSX支持
√ Add JSX Support?  No
## 是否添加路由环境
√ Add Vue Router for Single Page Application development?  No
## 是否添加pinia环境
√ Add Pinia for state management?  No
## 是否添加单元测试
√ Add Vitest for Unit Testing?  No
## 是否添加端到端测试方案
√ Add an End-to-End Testing Solution? » No
## 是否添加ESLint语法检查
√ Add ESLint for code quality?  Yes
## 是否添加Prettiert代码格式化
√ Add Prettier for code formatting?  No
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271103975.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

完成上述操作后，我们通过vscode打开该文件夹

进去后发现这两个文件夹飘红，是因为我们还没有安装依赖

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271103260.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

我们在终端输入以下命令实现安装依赖

```html
npm i -g
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

//也可以使用cnpm来安装依赖 

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271103991.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

安装依赖后文件夹正常。

在终端输入npm run dev看看自己是否成功搭建好vue项目。

成功界面如下图所示

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271103578.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑下面我们将推荐几个适合vue的插件

一个是在浏览器中的插件

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271103927.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑通过这个插件我们可以在开发者工具中更好的进行调试。

还有就是vscode当中的一些插件

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104219.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑我们在vs当中可以更好的管理代码

# 三、vue的基本语法

## 【OptionsAPI 与 CompositionAPI】

- `Vue2`的`API`设计是`Options`（配置）风格的。
- `Vue3`的`API`设计是`Composition`（组合）风格的。

### Options API 的弊端

`Options`类型的 `API`，数据、方法、计算属性等，是分散在：`data`、`methods`、`computed`中的，若想新增或者修改一个需求，就需要分别修改：`data`、`methods`、`computed`，不便于维护和复用。



![1.gif](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104340.gif)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

![2.gif](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104345.gif)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

### Composition API 的优势

可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。



![3.gif](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104011.gif)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑



![4.gif](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104644.gif)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 **【setup】**

`setup`是`Vue3`中一个新的配置项，值是一个函数，它是 `Composition API` **“表演的舞台*****”***，组件中所用到的：数据、方法、计算属性、监视......等等，均配置在`setup`中。

特点如下： 

- `setup`函数返回的对象中的内容，可直接在模板中使用。

- `setup`中访问`this`是`undefined`。

- `setup`函数会在`beforeCreate`之前调用，它是“领先”所有钩子执行的。

- ```html
  <template>
    <div class="person">
      <h2>姓名：{{name}}</h2>
      <h2>年龄：{{age}}</h2>
      <button @click="changeName">修改名字</button>
      <button @click="changeAge">年龄+1</button>
      <button @click="showTel">点我查看联系方式</button>
    </div>
  </template>
  
  <script lang="ts">
    export default {
      name:'Person',
      setup(){
        // 数据，原来写在data中（注意：此时的name、age、tel数据都不是响应式数据）
        let name = '张三'
        let age = 18
        let tel = '13888888888'
  
        // 方法，原来写在methods中
        function changeName(){
          name = 'zhang-san' //注意：此时这么修改name页面是不变化的
          console.log(name)
        }
        function changeAge(){
          age += 1 //注意：此时这么修改age页面是不变化的
          console.log(age)
        }
        function showTel(){
          alert(tel)
        }
  
        // 返回一个对象，对象中的内容，模板中可以直接使用
        return {name,age,tel,changeName,changeAge,showTel}
      }
    }
  </script>
  ```

  ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

  **setup的返回值** 

- 若返回一个**对象**：则对象中的：属性、方法等，在模板中均可以直接使用**（重点关注）。**

- 若返回一个**函数**：则可以自定义渲染内容，代码如下： 

- ```html
  setup(){
    return ()=> '你好啊！'
  }
  
  
  ```

  ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

  **setup语法糖**

- `setup`函数有一个语法糖，这个语法糖，可以让我们把`setup`独立出去，代码如下

- ```html
  <template>
    <div class="person">
      <h2>姓名：{{name}}</h2>
      <h2>年龄：{{age}}</h2>
      <button @click="changName">修改名字</button>
      <button @click="changAge">年龄+1</button>
      <button @click="showTel">点我查看联系方式</button>
    </div>
  </template>
  
  <script lang="ts">
    export default {
      name:'Person',
    }
  </script>
  
  <!-- 下面的写法是setup语法糖 -->
  <script setup lang="ts">
    console.log(this) //undefined
    
    // 数据（注意：此时的name、age、tel都不是响应式数据）
    let name = '张三'
    let age = 18
    let tel = '13888888888'
  
    // 方法
    function changName(){
      name = '李四'//注意：此时这么修改name页面是不变化的
    }
    function changAge(){
      console.log(age)
      age += 1 //注意：此时这么修改age页面是不变化的
    }
    function showTel(){
      alert(tel)
    }
  </script>
  ```

  ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

  扩展：上述代码，还需要编写一个不写`setup`的`script`标签，去指定组件名字，比较麻烦，我们可以借助`vite`中的插件简化 

- ```html
  第三步：<script setup lang="ts" name="Person">
  ```

  ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

  ##  【ref 创建：基本类型的响应式数据】

- 作用：**定义响应式变量。

- **语法：**`let xxx = ref(初始值)`。

- **返回值：**一个`RefImpl`的实例对象，简称`ref对象`或`ref`，`ref`对象的`value`**属性是响应式的**。

- 注意点：

  - `tS`中操作数据需要：`xxx.value`，但模板中不需要`.value`，直接使用即可。

  - 何时需要`.value`？模板中不需要；包裹在响应式对象里面的ref不需要；未包裹的ref需要。

  - 对于`let name = ref('张三')`来说，`name`不是响应式的，`name.value`是响应式的。

  - ```html
    <template>
      <div class="person">
        <h2>姓名：{{name}}</h2>
        <h2>年龄：{{age}}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">年龄+1</button>
        <button @click="showTel">点我查看联系方式</button>
      </div>
    </template>
    
    <script setup lang="ts" name="Person">
      import {ref} from 'vue'
      // name和age是一个RefImpl的实例对象，简称ref对象，它们的value属性是响应式的。
      let name = ref('张三')
      let age = ref(18)
      // tel就是一个普通的字符串，不是响应式的
      let tel = '13888888888'
    
      function changeName(){
        // JS中操作ref对象时候需要.value
        name.value = '李四'
        console.log(name.value)
    
        // 注意：name不是响应式的，name.value是响应式的，所以如下代码并不会引起页面的更新。
        // name = ref('zhang-san')
      }
      function changeAge(){
        // JS中操作ref对象时候需要.value
        age.value += 1 
        console.log(age.value)
      }
      function showTel(){
        alert(tel)
      }
    </script>
    ```

    ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

    ![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104793.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 按下相应按钮后页面中的数据也会相应的变化 如下图所示

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104907.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

## 【reactive 创建：对象类型的响应式数据】

- **作用：定义一个响应式对象**（基本类型不要用它，要用`ref`，否则报错）

- **语法：**`let 响应式对象= reactive(源对象)`。

- **返回值：**一个`Proxy`的实例对象，简称：响应式对象。

- **注意点：**`reactive`定义的响应式数据是“深层次”的。 

- 下面是一个具体例子

- ```html
  <template>
    <div class="person">
      <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
      <h2>游戏列表：</h2>
      <ul>
        <li v-for="g in games" :key="g.id">{{ g.name }}</li>
      </ul>
      <h2>测试：{{obj.a.b.c.d}}</h2>
      <button @click="changeCarPrice">修改汽车价格</button>
      <button @click="changeFirstGame">修改第一游戏</button>
      <button @click="test">测试</button>
    </div>
  </template>
  
  <script lang="ts" setup name="Person">
  import { reactive } from 'vue'
  
  // 数据
  let car = reactive({ brand: '奔驰', price: 100 })
  let games = reactive([
    { id: 'ahsgdyfa01', name: '英雄联盟' },
    { id: 'ahsgdyfa02', name: '王者荣耀' },
    { id: 'ahsgdyfa03', name: '原神' }
  ])
  let obj = reactive({
    a:{
      b:{
        c:{
          d:666
        }
      }
    }
  })
  
  function changeCarPrice() {
    car.price += 10
  }
  function changeFirstGame() {
    games[0].name = '流星蝴蝶剑'
  }
  function test(){
    obj.a.b.c.d = 999
  }
  </script>
  ```

  ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

  ![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104619.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 点击按钮后效果如下

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104682.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

## 【ref 对比 reactive】

宏观角度看：

> 1. `ref`用来定义：**基本类型数据**、**对象类型数据**；
> 2. `reactive`用来定义：**对象类型数据**。

- 区别：

> 1. `ref`创建的变量必须使用`.value`（可以使用`volar`插件自动添加`.value`）。
>
>    ![自动补充value](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104508.png)
>
>    ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑
>
> 2. `reactive`重新分配一个新对象，会**失去**响应式（可以使用`Object.assign`去整体替换）。
>
> ```
> Object.assign(car, { brand: '奥拓', price: 1 })
> ```

- 使用原则：

> 1. 若需要一个基本类型的响应式数据，必须使用`ref`。
> 2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。
> 3. 若需要一个响应式对象，且层级较深，推荐使用`reactive`。

#  四、路由

- `ue3`中要使用`vue-router`的最新版本，目前是`4`版本。

- 要想使用路由依然我们需要在终端进行安装

- ```
  cnpm i vue-router
  ```

  ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

  安装成功后的界面如下图所示

- ![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271104260.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

- 路由配置文件代码如下：

- 其中的Home和News和About是我们自己写的三个组件，用于作为页面跳转的基础

- ```html
  import {createRouter,createWebHistory} from 'vue-router'
  import Home from '@/pages/Home.vue'
  import News from '@/pages/News.vue'
  import About from '@/pages/About.vue'
  
  const router = createRouter({
  	history:createWebHistory(),
  	routes:[
  		{
  			path:'/home',
  			component:Home
  		},
  		{
  			path:'/about',
  			component:About
  		}
  	]
  })
  export default router
  ```

  ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

  

- 

- **`main.ts`代码如下：**

- ```html
  import router from './router/index'
  app.use(router)
  
  app.mount('#app')
  ```

  ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

  `App.vue`代码如下

- ```html
  <template>
    <div class="app">
      <h2 class="title">Vue路由测试</h2>
      <!-- 导航区 -->
      <div class="navigate">
        <RouterLink to="/home" active-class="active">首页</RouterLink>
        <RouterLink to="/news" active-class="active">新闻</RouterLink>
        <RouterLink to="/about" active-class="active">关于</RouterLink>
      </div>
      <!-- 展示区 -->
      <div class="main-content">
        <RouterView></RouterView>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup name="App">
    import {RouterLink,RouterView} from 'vue-router'  
  </script>
  ```

  ![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

  > 1. 路由组件通常存放在`pages` 或 `views`文件夹，一般组件通常存放在`components`文件夹。
  > 2. 通过点击导航，视觉效果上“消失” 了的路由组件，默认是被**卸载**掉的，需要的时候再去**挂载**。

- 路由组件：靠路由规则渲染出来的。`route:[{path:/demo,component:demo}]`

- 一般组件：亲手写出来的标签。`<demo/> `

- `history`模式

  > 优点：`URL`更加美观，不带有`#`，更接近传统的网站`URL`。
  >
  > 缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有`404`错误。



`hash`模式

> 优点：兼容性更好，因为不需要服务器端处理路径。
>
> 缺点：`URL`带有`#`不太美观，且在`SEO`优化方面相对较差。
>
> ```
> const router = createRouter({
> 	history:createWebHashHistory(), //hash模式
> 	/******/
> })
> ```

# 五、循环语句  

在 Vue 3 中，循环语句是通过 `v-for` 指令实现的，它通常用于遍历数组、对象或数字序列，并生成相应的 DOM 元素。`v-for` 是 Vue 框架中非常常用的一个指令，能够高效地渲染列表数据。接下来，我将详细讲解 `v-for` 的使用方式和常见场景 。

### 1. 基础语法

`v-for` 的基本使用方式是通过一个迭代表达式，将数据中的每一项遍历出来。最常见的形式如下：

```
<li v-for="(item, index) in items" :key="index">
  {{ index }} - {{ item }}
</li>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

- `item`: 当前遍历的项目。
- `index`: 当前项目的索引。
- `items`: 要遍历的数组或对象。
- `key`: 每个渲染的元素应具有唯一的 `key` 属性，这是为了解决 Vue 追踪列表中各个节点的变化问题，提高渲染性能。
- 

### 2. 遍历数组

数组是最常见的 `v-for` 使用场景。在 Vue 3 中，`v-for` 可以轻松地迭代数组，生成对应的 DOM 元素。

示例：

```
<template>
  <ul>
    <li v-for="(item, index) in fruits" :key="index">
      {{ index + 1 }}. {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      fruits: ['Apple', 'Banana', 'Cherry']
    };
  }
};
</script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

 在上面的示例中，`fruits` 数组中的每一项都会被 `v-for` 遍历并渲染成列表项。

### 3. 遍历对象

`v-for` 也可以用于对象的遍历。在遍历对象时，可以通过三个参数访问 `value`（对象的值）、`key`（对象的键）和 `index`（索引）。

示例：

```
<template>
  <ul>
    <li v-for="(value, key, index) in person" :key="key">
      {{ index }} - {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      person: {
        name: 'John Doe',
        age: 30,
        occupation: 'Developer'
      }
    };
  }
};
</script>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

