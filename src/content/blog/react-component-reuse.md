---
title: "组件复用render props和高阶组件"
date: 2024-10-06T13:02:51+08:00
image: "/img/blog_pic/前端.jpg"
draft: false
weight: 100
author: "张俪之"
categories: ["前端"]
description: "React组件复用概述·render props模式·高阶组件"
---

## 组件复用render props和高阶组件

#### 一、React组件复用概述

###### 1.1 思考：如果两个组件中的部分功能相似或相同，该如何处理？

###### 1.2 处理方式：

**复用**相似的功能（=>联想函数封装）

###### 1.3 复用什么？

> 1. state（状态）
> 2. 操作state的方法（逻辑）
>
> **<u>组件状态逻辑</u>**

###### 1.4 两种方式：

- render props模式
- 高阶组件（HOC）Higher-order components

###### 1.5 注意：

这两种方式不是新的API，也就是说它并不是React中直接提供好的一种方法，直接调用这个方法就可以实现复用，而是利用React自身特点的编码技巧，逐渐演化成的的固定模式（写法）

#### 二、render props模式

render props 核心思想还是利用**子向父传值时候的回调函数**

###### 2.1 思路分析：

> - 思路：将要复用的state和操作state的方法封装到一个组件中
>
> - 问题1：如何拿到该组件中复用的state？
>
>   (状态是存在于组件内部的，那么要在使用这个组件的时候，也就是在组件的外部拿到这个状态怎么去获取)
>
>   在使用组件时，添加一个值为函数的prop，通过函数参数来获取（需要组件内部实现）
>
> - 问题2：如何渲染任意UI？
>
>   使用该函数的返回值作为要渲染的UI内容（需要组件内部实现）

比如：现在已经有了一个封装好的组件

```react
<Mouse render={(mouse)=>{}}/>
//添加了一个值为函数的prop，名字为render，它的值为函数，因为它是在组件内部调用的，那么在组件内部调用时，就可以把组件内部的状态通过参数来被暴露出来，那么就可以通过这个参数来拿到这个状态了
```

```react
<Mouse render={(mouse)=>(
	<p>鼠标当前位置{mouse.x},{mouse.y}</p>
)}/>
//通过函数形参mouse拿到鼠标状态，通过返回值指定要渲染的内容
```

> 补充！！！
>
> 箭头函数
>
> 箭头函数的一般语法如下：
>
> ```javascript
> (param1, param2, ..., paramN) => {
> // 函数体
> }
> ```
>
> 函数体是一个块（使用大括号 `{}`），则必须使用 `return` 关键字来明确返回值
>
> 如果函数体只有一条语句，并且要返回一个值，可以进一步简化为：
>
> ```javascript
> (param1, param2, ..., paramN) => expression
> ```
>
> 在这种情况下，你不需要使用 `return` 关键字，表达式的结果将自动成为函数的返回值



###### 2.2 使用步骤：

- 创建Mouse组件，在组件中提供复用的状态逻辑代码（①状态 ②操作状态的方法）
- 将要复用的状态作为props.render(state)方法的参数，暴露到组件外部
- 使用props.render()的返回值作为要渲染的内容

```react
//9.26自学自讲
import React from 'react';
import ReactDOM from 'react-dom';
// render props模式
//1.创建mouse组件
class Mouse extends React.Component {
  //鼠标位置state
   state={
    x:0,
    y:0
   }
   //鼠标移动事件处理程序 要拿要鼠标位置就要通过事件对象e来获取
   handleMouseMove = e =>{
      this.setState({
        x:e.clientX,
        y:e.clientY
      })
   }

   //监听鼠标的移动,componentDidMount这个钩子函数是创建时的勾子函数，它会在组件完成渲染之后来进行执行
   componentDidMount(){
      window.addEventListener('mousemove',this.handleMouseMove)
   }
    //render方法接受一个render属性，这是一个函数，接收当前的state作为参数，并返回一个JSX元素。render方法返回this.props.render(this.state)，即调用父组件传递的render函数，并传递当前的鼠标位置状态
   render(){
    return this.props.render(this.state)
   }
  
}
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props模式</h1>
         {/* mouse指的就是this.state  方法一定要有返回值*/}
        <Mouse render={(mouse)=>
          {
            return (
              <p>
              当前鼠标位置{mouse.x},{mouse.y}
              </p>
            )
          }
        }
        />
         {/* <Mouse render={(mouse)=>(<p>鼠标当前位置{mouse.x},{mouse.y}</p>)}/> */}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

在使用组件时，只要传入一个render的函数，通过它的参数就可以拿到组件内部暴露的状态，然后就可以用这些状态来做一些事情了

render方法的返回值来决定要渲染什么内容

###### 演示Mouse组件的复用

```react
import React from 'react';
import ReactDOM from 'react-dom';
//导入图片资源
import img from './images/cat.jpg'
// render props模式
//1.创建mouse组件
class Mouse extends React.Component {
  //鼠标位置state
   state={
    x:0,
    y:0
   }
   //鼠标移动事件处理程序 要拿要鼠标位置就要通过事件对象e来获取
   handleMouseMove = e =>{
      this.setState({
        x:e.clientX,
        y:e.clientY
      })
   }
   //监听鼠标的移动,componentDidMount这个钩子函数是创建时的钩子函数，它会在组件完成渲染之后来进行执行
   componentDidMount(){
      window.addEventListener('mousemove',this.handleMouseMove)
   }
   render(){
    return this.props.render(this.state)
       //render是一个函数，调用函数的时候传入一个参数，将来render方法里面就可以拿到这个状态了
   }
  
}
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props模式</h1>
         {/* mouse指的就是this.state  方法一定要有返回值*/}
        <Mouse render={(mouse)=>
          {
            return (
              <p>
              当前鼠标位置{mouse.x},{mouse.y}
              </p>
            )
          }
        }
        />
        {/* <Mouse render={(mouse)=>(<p>鼠标当前位置{mouse.x},{mouse.y}</p>)}/> */}

        {/* Mouse组件复用 */}
        <Mouse render={mouse=>{
          return <img src={img} style={{position:'absolute',left:mouse.x,top:mouse.y,width:70,height:80}}/>
        }}/>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

###### 总结：

- Mouse组件负责：封装复用的状态逻辑代码（状态，操作状态的方法）
- 状态：鼠标坐标（x,y）
- 操作状态的方法：鼠标移动事件
- 传入的render prop负责：使用复用的状态来渲染UI结构

###### 2.3 children代替render属性

注意：并不是该模式叫render props就必须使用名为render的prop，实际上可以使用任意名称的prop

把prop是一个函数并且告诉组件要渲染什么内容的技术叫做：render props模式

推荐：使用children代替render属性

###### **实现方案：**

1. mouse组件中，将返回值的 this.props.render 改为 this.props.children
2. 调用Mouse组件时，将函数执行放在Mouse组件中

```react
//{子节点}
<Mouse>
	{({x,y})=><p>鼠标的位置是{x},{y}</p>}
</Mouse>
//组件内部
this.props.children(this.state)
```

children作为一个元素的一个子节点，组件包裹了一个子节点，拿组件内部的数据，比属性中的参数拿组件中的内容要更加直观

```react
import React from 'react';
import ReactDOM from 'react-dom';
// render props模式
//1.创建mouse组件
class Mouse extends React.Component {
  //鼠标位置state
   state={
    x:0,
    y:0
   }
   //鼠标移动事件处理程序 要拿要鼠标位置就要通过事件对象e来获取
   handleMouseMove = e =>{
      this.setState({
        x:e.clientX,
        y:e.clientY
      })
   }

   //监听鼠标的移动,componentDidMount这个钩子函数是创建时的钩子函数，它会在组件完成渲染之后来进行执行
   componentDidMount(){
      window.addEventListener('mousemove',this.handleMouseMove)
   }
   render(){
    return this.props.children(this.state)
   }
  
}
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props模式</h1>
        <Mouse>
            {mouse=>{
                return (
                	<p>
                    	鼠标位置：{mouse.y},{mouse.x}
                    </p>
                )
            }}
        </Mouse>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

###### 联想Context中的用法

```react
//Context中的用法
<Consumer>
    {/*render props模式，并且使用的是children的方式*/}
	{data=><span>data参数表示接收到的数据--{data}</span>}
</Consumer>
```

###### 代码优化

1. 推荐:给render props模式添加props校验

   ```react
   //导入propTypes
   import PropTypes from 'prop-types';
   Mouse.propTypes={
       children:PropTypes.func.isRequired
       //children实行校验：是函数，且是必填项
   }
   ```

2. 应该在组件卸载时解除mousemove事件绑定(不是react自身的方式)

   ```react
   componentWillUnmount(){
       window.removeEventListener('mousemove',this.handleMousemove)
   }
   ```


#### 三、高阶组件

##### 3.1 概述

- 目的：实现状态逻辑复用

- 采用包装（装饰）模式==>手机壳

  比如  手机：获取保护功能  手机壳：提供保护功能

- 高阶组件就相当于手机壳，通过包装组件，增强组件功能

##### 3.2 **核心思想：** 

父组件向子组件传值，父组件提供state，并在调用子组件时将state传递给子组件；子组件使用props接收state的值，进行页面渲染

##### 3.3 思路分析

1. 高阶组件（HOC,Higher-Order Component）是一个函数，接收要包装的组件，返回增强后的组件

2. 高阶组件内部创建一个类组件，在这个类组件中提供复用的状态逻辑代码，（自身不提供UI结构，UI结构还是由传入的WrappedComponent进行提供），通过prop将复用的状态传递给被包装的组件WrappedComponent


```react
const EnhancedComponent = withHOC(WrappedComponent)
```

![image-20240924195942541](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202409241959750.png)

```react
//高阶组件内部创建的类组件
class Mouse extends React.Component{
    render(){
        return <WrappedComponent {...this.state} />
    }
}
```

##### 3.4 使用步骤

1. 创建一个函数，名称约定以with开头

2. 指定函数参数，参数应该以大写字母开头（实际上是组件名称）（作为要渲染的组件 组件必须以大写字母开头）

3. 在函数内部创建一个类组件，<u>提供复用的状态逻辑代码</u>，并返回

   ![image-20240925213540672](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202409252135766.png)

4. 在该组件中，渲染参数组件，同时将状态通过prop传递给参数组件（定义子组件，子组件使用 props 接收父组件的state，并进行渲染）

   ![image-20240925213628849](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202409252136908.png)

   ```react
   function withMouse(WrappedComponent) {
       class Mouse extends React.Component {}
       return Mouse  //作为当前高阶组件的返回值
   }
   ```

   ```react
   //Mouse组件的render方法中：
   return <WrappedComponent {...this,state} />
   //将参数名称作为组件，把Mouse组件的状态作为属性传递给当前组件，因此这个组件中就能获得Mouse组件中的共享出来的状态了（要复用的状态）
   ```

5. 调用该高阶组件，传入要增强的组件，通过返回值拿到增强后的组件，并将其渲染到页面中

   ```react
   //创建组件
   const MousePosition =withMouse(Position)
   //渲染组件
   <MousePosition  />
   ```


##### 代码实现：

第一步：创建增强组件函数

```react
// 创建一个以 with 开头的函数
function withMouse (WarppedComponent) {
    class Mouse extends React.Component {
        state = {
            x: 0,
            y: 0
        }
        handleMouseMove = e => {
          this.setState({
            x: e.clientX,
            y: e.clientY
          })
        }
        componentDidMount () {
          window.addEventListener('mousemove', this.handleMouseMove)
        }

    	// render 方法中渲染子组件
    	render () {
          return <WarppedComponent {...this.state}></WarppedComponent>
    return Mouse
}

```

第二步：定义子组件，子组件使用 props 接收父组件的state，并进行渲染

```react
class Position extends React.Component {
  render () {
    return (
      // 使用 props 接收父组件传过来的 state，再进行调用
      <div>鼠标位置: {this.props.x} - {this.props.y}</div>
    )
  }
}
const PositionMouse = withMouse(Position)

```

第三步：在 App 组件中调用增强组件：

```react
class App extends React.PureComponent {
  render () {
    return (
      <div>
        <PositionMouse />
      </div>
    )
  }
}

```

完整代码实现：

```react
import React from 'react';
import ReactDOM from 'react-dom';
// 创建高阶组件  参数：要被渲染的组件  该组件提供复用的状态逻辑
function withMouse(WrappedComponent){
  class Mouse extends React.Component{
    // 提供复用的状态逻辑
    //鼠标状态
    state ={
      x:0,
      y:0
    }

    //事件处理程序的函数
    handleMouseMove = e =>{
      this.setState({
        x:e.clientX,
        y:e.clientY
      })
    }
    //控制鼠标状态的逻辑
    componentDidMount(){
      window.addEventListener('mousemove',this.handleMouseMove)
    }
    //解绑事件
    componentWillUnmount(){
      window.removeEventListener('mousemove',this.handleMouseMove)
    }
    //要渲染的UI结构是通过参数来制定的，在render方法中渲染组件,这个组件通过展开将状态作为prop传递给当前组件，将来这个组件就可以通过props来接收到当前组件中共享出来（复用）的状态
    render(){
      return <WrappedComponent {...this.state}></WrappedComponent>
    }
  }
  return Mouse
}

//用来测试高阶组件
const Position=props=>(
  <p>
    当前鼠标的位置:(x:{props.x},y:{props.y})
  </p>
)
//获取增强后的组件 将高阶组件Position作为参数传进来，这里的Position是实参，将会替换掉WrappedComponent这个形参
const MousePosition =withMouse(Position)
class App extends React.Component {
  render(){
    return (
      <div>
        <h1>高阶组件</h1>
        {/* 渲染增强后的组件 */}
        <MousePosition></MousePosition>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

```

##### 3.5 设置displayName

- 使用高阶组件存在的问题：同一个高阶组件使用两次时，在页面中会展示出两个相同的组件名，这样会造成调试不便的情况

- 原因：默认情况下，react使用组件名称作为displayName

- 解决方式:为高阶组件设置displayName便于调试时区分不同的组件

- displayName的作用：用于设置调试信息（React Developer Tools信息）

- 设置方式：

  ```react
  //Mouse即为高阶组件中返回的组件的名字
  Mouse displayName = `WithMouse${getDisplayName(WrappedComponent)}`//字符串名称
  funtion getDisplayName(WrappedComponent){
      return WrappedComponent.displayName||WrappedComponent.name||'Component'
  }
  ```

  WrappedComponent.name：表示当前组件的名称

##### 3.6 传递props

Ⅰ、问题：造成props丢失

Ⅱ、原因：高阶组件没有往下传递props

> （具体）
>
> a='1'的属性添加给了MousePosition=>而MousePosition其实是withMouse高阶组件的返回值=>高阶组件的返回值其实是高阶组件中的Mouse=>Mouse组件并没有把属性传递给下一步被包装的组件
>
> ![image-20240925190606182](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202409251906339.png)

Ⅲ、解决方式：渲染WrappedComponent时，将state和this.props一起传递给组件

Ⅳ、传递方式：既去展开state，也去展开props，传递给WrappedComponent

```react
<WrappedComponent {...state} {...props} />
```

![image-20240925190951287](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202409251909359.png)


