---
title: 动画
date: 2024-12-30T12:33:45+10:00
image: "/img/blog_pic/前端.jpg"
draft: false
featured: true
author: "万晓煜"
categories: ["前端"]
weight: 1
description: "动画"
---

### 01-平面转换

作用：为元素添加动态效果，一般与过渡配合使用
概念：改变盒子在平面内的形态，平面转换又叫 2D 转换

#### 平移

属性：transform: translate(X 轴移动距离, Y 轴移动距离);

##### **取值**

（1）像素单位数值

（2）百分比

（3）正负均可

**技巧**

translate() ，表示沿着 x 轴移动

单独设置 X 或 Y 轴移动距离：`translateX() 或 translateY()`

#### 绝对定位实现元素居中效果

法一：

```css
div {
    position: absolute;
    background-color: aqua;
    height: 100px;
    width: 200px;
    left: 50%;
    bottom: 50%;
    margin-left: -100px;
    margin-bottom: -50px;
}
```

法二：

```css
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%,-50%);
```

#### 旋转

属性：transform

取值：角度单位是 **deg**

**注意：**

取值正负均可

取值为正，顺时针旋转

取值为负，逆时针旋转

#### 改变转换原点

> 默认情况下，转换原点是盒子中心点

属性：transform-origin

取值：

（1）方位名词

（2）像素单位数值

（3）百分比

#### 多重转换

技巧：先平移再旋转

属性：transform: translate() rotate();

原理：以第一种转换方式坐标轴为准转换形态

#### 缩放

属性：transform: scale();

技巧：

（1）通常，只为 scale() 设置一个值，表示 X 轴和 Y 轴等比例缩放

（2）取值大于 1 表示放大，取值小于 1 表示缩小

#### 倾斜

属性：transform: skew();

取值：角度

#### 渐变

渐变是多个颜色逐渐变化的效果，一般用于设置盒子背景

分类：线性渐变和径向渐变

#### 线性渐变

```css
background-image: linear-gradient(
  渐变方向,
  颜色1 终点位置,
  颜色2 终点位置,
  ......
);
```

取值：

渐变方向：可选

- to 方位名词
- 角度度数

终点位置：可选

综合案例：

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
.mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(transparent,
    rgba(0, 0, 0, .5));
    opacity: 0;
    transition: all .5s;
}

.box:hover .mask {
    opacity: 1;
}

.box {
    position: relative;
    height: 300px;
    width: 300px;
    margin: auto;
    background-color: aquamarine;
    background-image: url(../images/微信图片_20230906220156.jpg);
    background-size: 100%;
}


.box .title {
    position: absolute;
    bottom: 10%;
    left: 30%;
    z-index: 4;
    color: #fff;
    font-size: 30px;
}
    </style>
</head>

<body>
    <div class="box">
<div class="title">你好啊！</div>
<div class="mask"></div>
    </div>
</body>
```

![](https://vichywhite.oss-cn-beijing.aliyuncs.com/wxy2023013440/202404102308180.png)

#### 径向渐变

```css
background-image: radial-gradient(
  半径 at 圆心位置,
  颜色1 终点位置,
  颜色2 终点位置,
  ......
);
```

取值：

- 半径可以是 2 条，则为椭圆
- 圆心位置取值：像素单位数值 / 百分比 / 方位名词

### 空间转换

#### 平移

```css
transform: translate3d(x, y, z);
transform: translateX();
transform: translateY();
transform: translateZ();
```

> 取值与平面转换相同
>
> 默认情况下，Z 轴平移没有效果
>
> 原因：电脑屏幕默认是平面，无法展示 z 轴效果

#### 视距

作用：指定了观察者与 Z=0 平面的距离，为元素添加透视效果

透视效果：近大远小、近实远虚

属性：添加给父级，取值范围 800-1200

```css
perspective:视距;
```

### 旋转

x 轴：`rotateX()`
y 轴：`rotateY()`
z 轴：`rotateZ()`
`rotate3d(x, y, z)` ：用来设置自定义旋转轴的位置及旋转的角度

左手法则：左手握住旋转轴, 拇指指向正值方向, 其他四个手指弯曲方向为旋转正值方向

(用来判断方向)

#### 立体呈现

作用：设置元素的子元素是位于 `3D` 空间中还是平面中

属性名：transform-style

属性值：

- flat：子级处于平面中
- `preserve-3d：子级处于 3D 空间`

步骤：

（1）搭建立方体

（2）鼠标悬停，立方体旋转

综合案例：`3d导航`

```html
<style>
.box {
    height: 30px;
    width: 100px;
    position: relative;
    margin: auto;
    transition: all .5s;
    text-align: center;
    line-height: 30px;
    transform-style: preserve-3d;
}

.box .font {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background-color: antiquewhite;
    transform: translateZ(15px);
}

.box .last {
    background-color: lightcyan;
    transform: translateZ(15px) rotateX(90deg);
}

.box:hover {
    transform: rotateX(-90deg);
}
    </style>
</head>

<body>
    <div class="box">
<div class="font">首页</div>
<div class="last">index</div>
    </div>
</body>
```

#### 缩放

```css
transform: scale3d(x, y, z);
transform: scaleX();
transform: scaleY();
transform: scaleZ();
```

### 02- 动画

#### 动画实现步骤

1、定义动画

```css
/* 方式一 */
@keyframes 动画名称 {
  from {}
  to {}
}

/* 方式二 */
@keyframes 动画名称 {
  0% {}
  10% {}
  ......
  100% {}
}
```

2、使用动画

```css
animation: 动画名称 动画花费时长;
```

#### animation 复合属性

animation:动画名称 动画时长 速度曲线 延迟时间 重复次数 动画方向 执行完毕时状态

提示：

- 动画名称和动画时长必须赋值
- 取值不分先后顺序
- 如果有两个时间值，第一个时间表示动画时长，第二个时间表示延迟时间

| 属性      | 作用       | 取值       |
| ------------------------- | ------------------ | ---------------------------------- |
| animation-name    | 动画名称   |    |
| animation-duration| 动画时长   |    |
| animation-delay   | 延迟时间   |    |
| animation-fill-mode       | 动画执行完毕时状态 | forwards backwards |
| animation-timing-function | 速度曲线   | steps（数字）：逐帧动画    |
| animation-iteration-count | 重复次数   | infinite 为无限循环|
| animation-direction       | 动画执行方向       | alternate 为反向   |
| animation-play-state      | 暂停动画   | paused 为暂停，通常配合:hover 使用 |

#### 精灵动画

核心：

| 属性      | 作用     | 取值    |
| ------------------------- | -------- | ----------------------- |
| animation-timing-function | 速度曲线 | steps（数字）：逐帧动画 |

制作步骤

1.准备显示区域

盒子尺寸与一张精灵小图尺寸相同

2.定义动画

移动背景图（移动距离 = 精灵图宽度）

3.使用动画

steps(N)，N 与精灵小图个数相同

#### 多组动画

```css
animation:
  动画一,
  动画二,
  ... ...
;
```

### 03-rem 适配

一般逻辑分辨率与物理分辨率不同

记住：375\*667

二倍图：防止在高分辨率屏幕下失真（每个元素的尺寸的倍数）

（一般 375 宽度的设计稿是`750px`）

#### rem

- rem 单位，是相对单位
- rem 单位是相对于 HTML 标签的字号计算结果
- `1rem = 1HTML`字号大小

#### 媒体查询

```css
@media (媒体特性) {
  选择器 {
    css属性
  }
}
```

使用案例：

![微信截图_20240410235641](https://vichywhite.oss-cn-beijing.aliyuncs.com/wxy2023013440/202404110017312.png)

目前 rem 布局方案中，将网页等分成 10 份， HTML 标签的字号为视口宽度的 1/10

#### `flexible.js`

`flexible.js` 是手淘开发出的一个用来适配移动端的 `js` 库。

核心原理就是根据不同的视口宽度给网页中 `html` 根节点设置不同的 font-size。

（一般开发中不用自己写）

#### rem 移动适配

rem 单位尺寸

1.确定基准根字号

查看设计稿宽度 → 确定参考设备宽度(视口宽度) → 确定基准根字号（1/10 视口宽度）

2`.rem`单位的尺寸

rem 单位的尺寸 = `px`单位数值 / 基准根字号

#### less

运算

- 加、减、乘直接书写计算表达式
- 除法需要添加小括号 （单位直接写在后面）

#### less-嵌套

作用：快速生成后代选择器

![微信截图_20240411000222](https://vichywhite.oss-cn-beijing.aliyuncs.com/wxy2023013440/202404111217892.png)

注意：用 & 表示当前选择器，不会生成后代选择器，通常配合伪类或伪元素使用

#### less-变量

概念：容器，存储数据

作用：存储数据，方便使用和修改

语法：

（1）定义变量：@变量名: 数据;

（2）使用变量：`CSS`属性：@变量名;

![微信截图_20240411000658](https://vichywhite.oss-cn-beijing.aliyuncs.com/wxy2023013440/202404111217404.png)

#### less-导入

作用：导入 less 公共样式文件

语法：导入: @import “文件路径”;

提示：如果是 less 文件可以省略后缀

```css
@import './base.less';
@import './common';
```

#### less-导出

写法：在 less 文件的第一行添加 // out: 存储 URL

提示：文件夹名称后面添加 /

```css
// out: ./index.css
// out: ./css/
```

#### less-禁止导出

写法：在 less 文件第一行添加: `// out: false`

### 04-`vw`适配方案

#### 适配方案

- 相对单位
- 相对视口尺寸计算结果
- `vw：viewport width ( 1vw = 1/100视口高度 )`
- `vh：viewport height ( 1vh = 1/100视口高度 )`

#### `vw`布局

1.确定设计稿对应的`vw`尺寸

2.`vw`单位尺寸=`px`单位数据/(1/100 视口宽度)

#### `vh`布局

1.确定设计稿对应的`vh`尺寸

2.`vh`单位尺寸=`px`单位数据/(1/100 视口高度)

#### 注意

在实际开发中，不要将`vh`和`vw`混用
