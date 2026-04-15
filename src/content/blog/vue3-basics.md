---
title: vue3
date: 2024-08-30T12:33:45+10:00
lastmod: 2024-08-30T12:33:45+10:00
image: "/img/blog_pic/vue.jpg"
draft: false
featured: true
author: "万晓煜"
categories: ["前端"]
series: "2024春季自学自讲"
tags: ["vue3", "前端框架"]
weight: 1
description: "Vue 3：新一代前端框架，性能提升，组合式API，更小体积。"
---

# VUE3

## 一、创建一个 vue 实例

### 1.1 传统开发方式

打开官网，点击快速上手，在 html 文件中引入 vue.global.js 文件

```
<script src="./vue.global.js"></script>
```

在 body 标签里:首先是容器，在 script 标签里用 Vue.createApp 方法，用 setup 配置项存放数据和方法，setup 里需要返回值。在 Vue.createApp 后面将内容挂载在容器内用 mount("#id")

```
<div id="id">
    <h2>{{msg}}</h2>
</div>
<script>
    Vue.createApp({
        setup() {
            return {
                msg: '阿衡'
            }
        }
    }).mount("#id")
</script>
```

如果想创建一个复杂的数据类型，可以使用 reactive,并且将其返回 return

```
setup() {
    const web = Vue.reactive({
        title: "你好"
    })
    return {
        msg: '阿衡',
        web
    }
}
```

简写：不写 Vue，可以使用解构赋值

```
const { createApp, reactive } = Vue
```

### 1.2 模块化开发

同样，在官网找到 vue.esm-browser.js 文件并引入

```
import { createApp, reactive } from './vue.esm-browser.js'
```

## 二、基础内容

### 2.1ref 和 reactive

1.ref 用于存储基本数据类型，在修改值时，需要.value，并且记得要返回

引入

```
import { createApp, reactive, ref } from './vue.esm-browser.js'
```

定义和修改（setup 里）

```
const num = ref(11)
num.value = 122
```

返回

```
return {
     num
}
```

2.reactive 用于复杂的数据类型，在修改值时可以直接修改

### 2.2 事件绑定

在标签中用 v-on 或者@绑定事件

```
 <button @click="edit">按钮</button>
```

在 setup 里写函数

```
const edit = () => {
                    web.url = "22222"
                }
```

返回值

### 2.3v-show

在标签里用 v-show

```
<h2 v-show="web.show">{{web.url}}</h2>
```

### 2.4v-if

在标签里使用 v-if 或 v-else 或 v-else-if

### 2.5 动态属性绑定 v-bind

可以对 value，src，class 进行绑定，简写形式是：value

```
<div class="id">
    <!-- value -->
    <input type="text" :value="web.url1">
    <!-- src  -->
    <img :src="web.url2" alt="">
    <!-- class  -->
    <p :class="{url3:true}">你好</p>
</div>

<script type="module">
    import { createApp, reactive } from './vue.esm-browser.js'
    createApp({
        setup() {
            const web = reactive({
                url1: "1111",
                url2: "22222",
            })
            return ({
                web
            })
        }
    }).mount(".id")
</script>
```

### 2.6v-for

对于数组，可以 v-for="value in data.number"；对于对象，可以 v-for="(value,key,index) in data.user"；

在使用过程中，尽量加上:key="value.id"

```
<div class="id">
    <ul>
        <li v-for="value in data.number">
            {{value}}
        </li>
    </ul>
    <ul>
        <li v-for="(value,index) in data.number">
            {{index}}->{{value}}
        </li>
    </ul>
    <ul>
        <li v-for="(value,key,index) in data.user">
            {{key}}->{{value}}->{{index}}
        </li>
    </ul>
    <ul>
        <li v-for="(value,index) in data.teacher" :key="value.id">
            {{index}}->{{value.name}}
        </li>
    </ul>
</div>

<script type="module">
    import { createApp, reactive } from './vue.esm-browser.js'
    createApp({
        setup() {
            const data = ({
                number: ['11', '22', '33'],
                user: {
                    name: "阿衡",
                    old: 20
                },
                teacher: [
                    { id: 100, name: "老师1", web: "www.baidu.com" },
                    { id: 102, name: "老师2", web: "www.baidu.com" },
                ]
            })
            return ({
                data
            })
        }
    }).mount(".id")
</script>
```

### 2.7 双向数据绑定 v-model

可以对 input 类型的 text，radio，checkbox 和 select 进行双向数据绑定，都是通过 value 进行存储

在 setup 里的数据里，写一个复杂数据类型存储

```
<div class="id">
    <input type="text" v-model="data.text">
    <input type="radio" v-model="data.radio" value="1">选项1
    <input type="radio" v-model="data.radio" value="2">选项2
    <input type="checkbox" v-model="data.checkbox" value="a">多选1
    <input type="checkbox" v-model="data.checkbox" value="b">多选2
    <input type="checkbox" v-model="data.checkbox" value="c">多选3
    <select v-model="data.select">
        <option value="11">11</option>
        <option value="22">22</option>
        <option value="33">33</option>
    </select>
</div>

<script type="module">
    import { createApp, reactive, ref } from './vue.esm-browser.js'
    createApp({
        setup() {
            const data = reactive({
                text: "",
                radio: "",
                checkbox: [],
                select: ""
            })
            return ({
                data
            })
        }
    }).mount(".id")
</script>
```

2.8v-model 的修饰符

.lazy 是失去焦点或按下回车后渲染

.number 是将输入框的值转化为数字类型

.trim 是去掉首尾空格

```
<input type="text" v-model.lazy="data.text">
<input type="text" v-model.number="data.text">
<input type="text" v-model.trim="data.text">
```

### 2.9v-text 和 v-html

```
<h2 v-text="data.title"></h2>
<h2 v-html="data.html"></h2>
```

在 setup 里

```
const data = reactive({
    title: "阿衡",
    html: "<i style='color:red;'>www.baidu.com</i>"
})
```

### 2.10 计算属性

首先引入 computed

在利用属性将计算属性挂载上去，用 computed(()=>{}）箭头函数的形式

```
<div class="id">
    <h2>{{add}}</h2>
</div>

<script type="module">
    import { createApp, reactive, computed } from './vue.esm-browser.js'
    createApp({
        setup() {
            const data = reactive({
                x: 10,
                y: 20
            })
            const add = computed(() => {
                return data.x + data.y
            })
            return ({
                data,
                add
            })
        }
    }).mount(".id")
    </script>
```

### 2.11 监听器 watch

导入 watch

```
import { createApp, reactive, watch } from './vue.esm-browser.js'
```

监听某个数据

```
const data = reactive({
    year: "2023"
})
watch(data, (newValue, oldValue) => {
    console.log()
})
```

监听某个对象的属性（范围更小）

```
const data = reactive({
    year: "2023"
})
watch(() => data.year, (newValue, oldValue) => {
    console.log()
})
```

```
综合：
import { createApp, reactive, watch } from './vue.esm-browser.js'
createApp({
    setup() {
        const data = reactive({
            year: "2023"
        })
        watch(data, (newValue, oldValue) => {
            console.log()
        })
        watch(() => data.year, (newValue, oldValue) => {
            console.log()
        })
        return ({
            data
        })
    }
}).mount(".id")
```

### 2.12 自动监听

同样还是先引入 watchEffect，在 setup 里直接使用 watchEffect 即可

```
import { createApp, reactive, watchEffect } from './vue.esm-browser.js'
createApp({
    setup() {
        const data = reactive({
            year: "2023"
        })
        watchEffect(()=>{
            // 操作数据
        })
        return ({
            data
        })
    }
}).mount(".id")
```

## 三、vite

### 3.1.创建一个 vite 项目

打开命令行，进入到所需要创建的文件夹里

创建

```
npm create vite@latest
```

命名项目名

```
Project name: ... demo
```

进入项目文件夹

```
cd demo
```

安装

```
npm install
```

运行

```
 npm run dev
```

最后常用的是

#### npm run dev

之后删除一些没用的文件

1.style.css

2.components 下的组件

3.打开 main.js，删除 style.css 的引入

4.打开 App.vue，删除所有，只留下模板

#### ps：v3 是快捷键

### 3.2 将原来的文件变成 vue 文件

将导入和 setup 里的内容直接搬过来即可，不要 return

将 html 结构直接放在 template 标签里即可

```
<template>
 <div class="id">
        <h2>{{web.url}}</h2>
        <h2>{{num}}</h2>
        <input type="text" name="" id="" :focus="edit">
    </div>
</template>

<script setup>
 import { reactive, ref } from 'vue'
  const num = ref(11)
  num.value = 122
  const web = reactive({
      url: '11111',
      title: '你好'
  })
  const edit = () => {
      web.url = "22222"
  }
  const add = (a, b) => {
      web.user = a + b
  }
</script>

<style scoped>

</style>
```

## 四、组件间的通信

### 4.1 父传子

在父组件：

在使用子组件标签时，如果只是普通的字符串，直接传过去就可以

如果是一个对象，则利用 v-bind 绑定数据，在 script 里创建对象，推荐 reactive

```
<template>
 <div class="id">
  <Header propsName="阿衡"/>
  <Footer v-bind="propsWeb"/>
</div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';
 import { reactive, ref } from 'vue'
const propsWeb=reactive({
  user:"nihao"
})

</script>

<style scoped>

</style>
```

在子组件：

普通的字符串，用 defineProps 里的数组接收

如果是对象，要对对象的那个属性进行限制

```
<template>
<div>header</div>
</template>

<script setup>
const propsName=defineProps(["propsName"])
console.log(propsName);

</script>

<style scoped>

</style>


```

```
<template>
<div>footer</div>
</template>

<script setup>
const propsWeb=defineProps({
    user:{
        type:String,
        required:true,
        default:""
    }
})
console.log(propsWeb)

</script>

<style scoped>

</style>
```

### 4.2 子传父

在子组件中：

首先声明一下需要传递的数据的名称，用 defineEmits

然后再传递数据，用 emits，第一个参数与声明时的相对应，第二个参数写需要传递的参数

ps：在可以通过自定义事件来决定传递数据的时机

```
<template>
<div>header
    <button @click="add">按钮</button>
</div>
</template>

<script setup>
const emits=defineEmits(["getWeb","getUrl"])
emits("getWeb",{name:"哈哈哈哈"})
const add=()=>{
    emits("getUrl",{url:"123"})
}
</script>

<style scoped>

</style>
```

在父组件中：

在使用子组件标签时，增加自定义事件，属性名是传递过来的数据名称，属性值是父组件内自己定义的函数，用来处理数据

在自定义函数中，用箭头函数的参数接收传递过来的数据

```4.
<template>
 <div class="id">
  <Header @getWeb="emitsgetWeb" @getUrl="emitsgetUrl"/>
</div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';
 import { reactive, ref } from 'vue'
 const emitsgetWeb =(data)=>{
  console.log(data);
 }
 const emitsgetUrl =(data)=>{
  console.log(data);

 }
const web=reactive({
  user:"nihao"
})
const url=ref(1111)
</script>

<style scoped>

</style>
```

### 4.3 跨组件通信-依赖注入

此方法只能用于父类(或祖先类)组件向子类(孙子类)组件传递参数

在父类(或祖先类)组件中：

可以传递响应式数据，ref，函数等

传递数据的一方需要引入 provide，并定义好需要传递的数据，再通过 provide("传递名",传递的数据)

```
<template>
 <div class="id">
  <Header/>
</div>
</template>

<script setup>
import Header from './components/Header.vue'
import { reactive, ref,provide } from 'vue'
const web=reactive({
  user:"nihao"
})
const url=ref(1111)
const urlAdd=()=>{
  url.value++
}
provide("provideweb",web)
provide("provideurl",url)
provide("provideFucurlAdd",urlAdd)
</script>

<style scoped>

</style>
```

在子类(孙子类)组件中：

先引入 inject，再用 inject("传递名")来获取数据

```
<template>
<div>
    <Nav/>
</div>
</template>

<script setup>
import Nav from './Nav.vue'
import {inject} from 'vue'
const url=inject("provideurl")
console.log(url)
const urlAdd=inject("provideFucurlAdd")
console.log(urlAdd);


</script>

<style scoped>

</style>
```

### 4.4 插槽

作用：我们再子组件中可以将父组件所定义的一些模板片段插入到子组件的特定位置

在父组件中：

不需要引入其他文件，只需要在使用子组件标签的时候，用子组件标签包裹需要传递的代码片段（html 代码）

1.匿名插槽

```
<template>
 <div class="id">
  <Header><a href="www.baidu.com">百度</a></Header>
</div>
</template>
```

2.具名插槽（简写形式：#）

需要用一个 template 标签包裹，并且用 v-slot:或者#取名

```
<template>
 <div class="id">
  <Header><a href="www.baidu.com">百度</a></Header>
  <Footer>
    <!-- <template v-slot:baidu>  -->
      <template #baidu>
      <a href="www.baidu.com">百度</a>
    </template>
  </Footer>
</div>
</template>
```

在子组件中：

同样不需要引入其他文件，只需要在 template 标签里，找到需要放的位置，用 slot 标签引用即可

1.匿名插槽

```
<template>
<div>
    header
    <slot/>
</div>
```

2.具名插槽（在 slot 标签属性指明插槽名即可）

```
<template>
<div>footer
    <slot name="baidu"/>
</div>
</template>
```

### 4.5 作用域插槽

作用：子组件向父组件传递数据，并在父组件定义的模板中渲染

根据上一个具名插槽的案例

在子组件中：

在属性里加入要传递的数据

```
<template>
<div>footer
    <slot name="baidu" title="阿衡" age="20"/>
</div>
</template>
```

在父组件中：

1.在取名处用=“数据名”的形式，可以通过{{数据名.子组件定义的属性}}来进行使用

```
<template>
 <div class="id">
  <Footer>
      <template #baidu="data">
        {{ data.title }}
        {{ data.age }}
      <a href="www.baidu.com">百度</a>
    </template>
  </Footer>
</div>
</template>
```

2.还可以通过解构的方式，#插槽名={子组件定义的属性}，在使用时，可以直接{{子组件定义的属性}}

```
<template>
 <div class="id">
  <Footer>
      <template #baidu={title,age}>
        {{ title }}
        {{ age }}
      <a href="www.baidu.com">百度</a>
    </template>
  </Footer>
</div>
</template>
```

### 4.6toRefs 和 toRef

作用：原本是响应式数据（对象），可以单独一个属性或者全部属性，拿出来单独变成响应式数据（一个属性就是一个响应式数据）

1.将全部属性变为响应式数据

首先引入 toRefs，再利用解构赋值和 toRefs 方法，将响应式数据（对象）的全部属性转化

```
<script setup>
import {reactive,toRefs} from 'vue'
let web=reactive({
  name:"阿衡",
  url:"www.baidu.com"
})
let {name,url}=toRefs(web)
console.log(url)
</script>
```

2.将个别属性变为响应式数据

首先引入 toRef，再利用 toRef 方法，toRef(需要转换的响应式对象，“需要转换的属性”)

```
<script setup>
import {reactive,toRef} from 'vue'
let web=reactive({
  name:"阿衡",
  url:"www.baidu.com"
})
let url=toRef(web,"url")
console.log(url)
</script>
```

## 五、pinia

pinia 是一个轻量级的状态管理库，可以全局状态管理，简化组件间的通信，状态持久化（可以将状态保存在本地存储）

### 5.1 安装 pinia

进入你创建项目的文件夹中，利用管理员身份打开终端，输入命令行

```
npm install pinia
```

安装完成后你可以在 package.json 文件中看到 pinia 的版本号

然后再 mian.js 文件中：先引入 pinia，再创建 pinia 实例，最后使用 app.use(pinia)将 pinia 实例注册到 vue 应用中

ps：需要更改一下 app 创建实例的方式

```
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
const pinia = createPinia()
// createApp(App).mount('#app')
const app = createApp(App)
app.use(pinia)
app.mount('#app')
```

### 5.2 使用 store

store 是用来集中存储和管理组件之间共享状态的仓库

#### 5.2.1 创建仓库

首先在 src 文件下，创建一个 stores 文件，里面存放仓库文件

在仓库文件中，引入 ref，reactive，再引入 defineStore 从 pinia 中

用 defineStore()方法创建仓库，第一个参数是仓库的 id（唯一标识），第二个参数是 setup 函数（也可以使用 option 函数)

最后将仓库导出，用 export ，其中仓库名是有规范的，use+唯一标识符+Store

```
import { ref, reactive } from "vue"
import { defineStore } from "pinia"

export const useWebStore = defineStore("web", () => {
    const web = reactive({
        name: "阿衡",
        url: "www.baidu.com"
    })
    const user = ref(1000)
    const userAdd = () => {
        user.value++
    }
    return ({
        web,
        user,
        userAdd
    })
})
```

#### 5.2.1 使用仓库

首先引入仓库，用仓库名引出

再创建仓库实例即可

```
<template>
<div id="app">

</div>
</template>

<script setup>
import { useWebStore } from './stores/web.js'
const webStore=useWebStore()
console.log(webStore.web)
console.log(webStore.user)
console.log(webStore.userAdd)
</script>

<style scoped>

</style>
```

### 5.3pinia 持久化存储

在全局安装 pinia-plugin-persistedstate 插件

```
npm i pinia-plugin-persistedstate
```

在 main.js 文件中，引入插件，并将插件注册到 pinia 中

```
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'//引入

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)//注册

// createApp(App).mount('#app')
const app = createApp(App)
app.use(pinia)
app.mount('#app')
```

将仓库变为持久化仓库，打开仓库文件 setup 函数后面添加一个配置项 persist: true

```
import { ref, reactive } from "vue"
import { defineStore } from "pinia"

export const useWebStore = defineStore("web", () => {
    const web = reactive({
        name: "阿衡",
        url: "www.baidu.com"
    })
    const user = ref(1000)
    const userAdd = () => {
        user.value++
    }
    return ({
        web,
        user,
        userAdd
    })
},
    {
        persist: true
    })
```

使用这个插件的好处：

1.自动状态同步化

2.易用性
