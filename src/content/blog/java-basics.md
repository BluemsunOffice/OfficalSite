---
title: "Java基础知识"
date: 2024-10-06T13:02:51+08:00
image: "/img/blog_pic/java.jpg"
draft: false
weight: 100
author: "张高升"
categories: ["后端"]
description: "Java的异常处理·包装类·String类·DigDecimal类·泛型·列表·set·map"
---
**目录**


[前言](#前言)

[一、Java的异常处理](#一、Java的异常处理)

​	[1.1异常的出现](#1.1异常的出现)

​	[1.2捕获、抛出与异常类](#1.2捕获、抛出与异常类)

​	[1.3throws和throw辨析](#1.3throws和throw辨析)

​	[1.4自定义异常类](#1.4自定义异常类)

[二、包装类](#二、包装类)

​	[2.1包装类](#2.1包装类)

​	[2.2包装类的使用](#2.2包装类的使用)

[三、String类](#三、String类)

​	[3.1了解String类](#3.1了解String类)

​	[3.2String常用方法及实例](#3.2String常用方法及实例)

​	[3.3StringBuffer和StringBuilder](#3.3StringBuffer和StringBuilder)

[四、DigDecimal类](#四、DigDecimal类)

​	[4.1BigDecimal类简介、常用方法](#4.1BigDecimal类简介、常用方法)

​	[4.2小数点的处理](#4.2小数点的处理)

[五、泛型](#五、泛型)

​	[5.1什么是泛型](#5.1什么是泛型)

​	[5.2泛型类的基本语法与使用](#5.2泛型类的基本语法与使用)

​	[5.3泛型接口](#5.3泛型接口)

​	[5.4泛型方法](#5.4泛型方法)

[六、列表](#六、列表)

​	[6.1List简介](#6.1List简介)

​	[6.2ArrayList](#6.2ArrayList)

​	[6.3LinkedList](#6.3LinkedList)

​	[6.4Vector](#6.4Vector)

[七、set](#七、set)

​	[7.1set简介](#7.1set简介)

​	[7.2遍历与常用方法](#7.2遍历与常用方法)

[八、map](#八、map)

​	[8.1map简介](#8.1map简介)

​	[8.2Map的使用](#8.2Map的使用)

​	[8.3Map的遍历](#8.3Map的遍历)



------

# 前言

这篇文章主要学习了Java的捕获、抛出、自定义异常类、包装类、String（buffer、builder）、BigDecimal、泛型简介、列表、set、map等知识。经过上次的培训后，我认识到理论与实践应该相结合，因此在文章中会增添我的实际代码运行图片，而且不光是定义的叙述，还加入自己的理解。并且注意驼峰命名规则。

------

# 一、Java的异常处理

## 1.1异常的出现

**异常**就是我们程序运行过程中产生的**错误**，异常的出现会中断正在运行的程序。简单说就是我们的程序出了BUG跑不起来。

而**Java中的异常**是Java提供的用于**处理程序中错误**的一种机制。好比除以0的溢出、数组下标越界等。在我们设计良好的程序时应该在出现异常时提供处理这些错误的方法，从而使得程序不会因此产生阻断或莫名其妙的错误。

于是乎，Java中应对于这些可能会出现的异常事件，我们可以写一个**异常类（Exception）对象**，这个对象里就封装了异常事件的信息并将被提交给Java运行时系统，在发生时使用**throw关键词抛出**一个Exception子类的实例表示**异常发生**并**终止当前方法的继续执行**。Java运行时接收到异常对象时，会**寻找能处理这一异常的代码**并**把当前异常对象交给其处理**，这一过程即是**catch捕获**过程。

## 1.2捕获、抛出与异常类

在Java中进行异常的处理，会用到：try、catch、finally这几个关键字，其一般的结构如下：

- **try指尝试执行可能出现异常的代码，如果没出现异常，那么不执行catch语句，否则通过catch捕捉异常，并且处理异常。**
- **一个try可以对应多个catch，并且它们都需要同时出现。**
- **finally语句放在最后面，无论是否出现异常都执行**

```java
try {
    //可能出现异常的语句
}
catch(/* 异常类型 异常对象 */){
    //异常处理
}
catch(/* 异常类型 异常对象 */){
    //异常处理
}
//......
finally{
    //不论是否异常都要执行
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

​    例子：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115210.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

结果：

> n=0,m=8888,t=1000
> 发生异常:For input string: "ab123"
> 无论怎么我都会执行!
> 我故意抛出throw一个异常！
> 发生异常：null
> 无论怎么我都会执行!
>
> 
>
> 进程已结束，退出代码为 0

## 1.3throws和throw辨析

​    **throw**

> - throw是用于抛出异常，适用于我们无法处理的一些情况，或给调用者一点提示
> - 有时候对于出现异常的情况我们无法处理，或者给调用者一些提示，会选择抛出异常，把这个异常交给调用者处理，但是在抛出的同时我们必须在方法声明这个异常，告诉可能出现的异常。
> - throw会**抛出一个异常对象**，将这个异常对象传递到调用者处，并结束当前方法的执行。

其语法为：

```java
throw new 异常类型（提示信息）;
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

​    **throws**

> - throws用于**声明异常**
> - 在**方法**声明的时候跟在方法后边声明其可能产生的若干个异常

其语法为：

```java
throws 异常类型1，异常类型2，......;
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

例如：

1.自定义的异常类

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115780.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

2.Score类，在getScore方法中**使用throws声明异常类型**

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115800.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

3.Main类，测试两个例子。

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115780.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

结果：

> 成功录入，你的成绩为100
> 成绩不在0到100之间
>
> 
>
> 进程已结束，退出代码为 0

## 1.4自定义异常类

以上我们对异常有了一定了解，在实际的开发过程中，除了Java中的异常类之外，我们还可以定义自己的异常类用于不同的情景之下，好比说，我们在输入人数的时候不能输入一个小数，在我们的自定义异常类中可以对这种情况进行处理，以提示使用者。

其中：

> - 所有异常都必须是 Throwable 的子类。
> - 检查性异常类，则需要继承 Exception 类。
> - 运行时异常类，那么需要继承 RuntimeException 类。
> - 异常类也更其他类差不多，可以拥有自己的属性和方法

例子同上1.3中的程序中的ScoreException类即为自定义的异常类。

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115702.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

# 二、包装类

## 2.1包装类

Java是一个面向对象的编程语言，但是Java中的**八种基本数据类型却是不面向对象的**，为了使用方便和解决这个不足，在设计类时为**每个基本数据类型设计了一个对应的类**进行代表，这样**八种基本数据类型对应的类统称为包装类(Wrapper Class)**，包装类均位于**java.lang包**。

包装类囊括了：

| Byte | Short | Character | Integer |
| ---- | ----- | --------- | ------- |
| Long | Float | Double    | Boolean |



每个类的主要作用为：作为和基本数据类型对应的类类型存在，方便涉及到对象的操作；包含每种基本数据类型的相关属性如最大值、最小值等，以及相关的操作方法。

特点：

> （1）所有包装类都是final类型，因此不能创建他们的子类。
> （2）包装类是不可变类，一个包装类的对象自创建后，他所包含的基本类型数据就不能被改
>
> ​     变。

## 2.2包装类的使用

**装箱与拆箱：**

以Integer为例子，其常用方法有：praseInt()、toString()、valueOf()、intValue()等。

| praseInt() | 数字字符串类型转成int类型                                    |
| ---------- | ------------------------------------------------------------ |
| toString() | int类型转成数字字符串类型                                    |
| intValue() | 将Integer类转化为int类型（用于拆箱）                         |
| valueOf()  | 给Integer类对象赋值（用于装箱，相当于Integer i = new Integer.valueOf（6）；） |

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115366.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

这里编译器爆红是因为在新版的Java中Integer类已经被弃用，intValue显示不必要的拆箱。因为在Java中已经实现了自动拆箱与装箱。

在看其他两个方法：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115930.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> 字符类型转成整型：123
> int类型转成数字字符串类型:123

# 三、String类

## 3.1了解String类

String类即字符串类型，在Java中可以通过String类直接声明一个字符串类型的变量。**导包**：String类位于java.lang.String下。即：

```java
String s = new String();//初始化新创建的String对象，使其表示空字符序列
String str = "Hello";//直接赋值
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 3.2String常用方法及实例

总和：

| .length()                           | 获取字符串长度                                               |
| ----------------------------------- | ------------------------------------------------------------ |
| .charAt(int index)                  | 获取index位置上的单个字符（越界报错）                        |
| .indexOf(char ch)                   | 返回ch字符第一次出现的位置(int型)，没有返回-1                |
| .indexOf(cahr ch,int fromIndex)     | 从fromIndex开始查找，返回ch字符第一次出现的位置(int型)，没有返回-1 |
| .indexOf(String s)                  | 返回字符串s第一次出现位置的首字母下标，没有返回-1            |
| .indexOf(String s,int fromIndex)    | 从fromIndex开始查找，返回字符串s第一次出现位置的首字母下标，没有返回-1 |
| .lastIndexOf(char ch)               | 从后往前找，返回从后往前找第一次出现ch字符的位置下标         |
| .substring(int start,int end)       | 截取[左，右)长度的字符串，可以省略end                        |
| .replace(char oldchar,char newchar) | 原来字符串不变，创建新的字符串，将oldchar替换为newchar       |
| .split(String s)                    | 将一个完整的字符串按照指定的分隔符分成若干个字符串           |



当然还有很多，在这里贴个[文章](https://blog.csdn.net/m0_58761900/article/details/125014074?ops_request_misc=%7B%22request%5Fid%22%3A%22171127759516800184193030%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=171127759516800184193030&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-125014074-null-null.142^v99^pc_search_result_base5&utm_term=String类&spm=1018.2226.3001.4187)方便查询

3.2.1字符串构造

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115398.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> Hello
> JavaWorld
> abc

3.2.2常用方法

个别方法举例：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115800.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> 5
> 3
> e
> 3
> sda

## 3.3StringBuffer和StringBuilder

在一个String对象创建之后，它就是一个不可改变的字符，直到这个对象被摧毁。而StringBuffer与StringBuilder都继承自AbstractStringBuilder类，AbstractStringBuilder中也是使用字符数组保存字符串，是可变类。并且都提供了一系列插入、追加、改变字符串里的字符序列的方法。就是说我们可以用此对字符串进行一定的改变。

常用方法：

| StringBuilder.append  | 添加任意类型数据的字符串形式，并返回当前对象自身 |
| --------------------- | ------------------------------------------------ |
| StringBuilder.reverse | 逆置字符串                                       |
| StringBuffer.apppend  | 同上                                             |
| StringBuffer.reverse  | 逆置字符串                                       |



实例：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115409.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> hello world
> dlrowolleh

二者就方法来说是大差无几的。其区别在于：

> - （1）String内容不可以修改，而StringBuffer与StringBuilder，提供了一系列插入、追加、 改变字符串里的字符序列的方法，并且修改不产生新的对象，而是在原对象的基础上修改
>
> - （2）就三者效率进行比较：**StringBuilder > StringBuffer > String**
>
> - （3）从安全性和操作数据量来比较：如果要**操作的数量比较小，应优先使用String类**；如果是在**单线程下操作大量数据，应优先使用StringBuilder类**；如果是在**多线程下操作大量数据，应优先使用StringBuffer类**。
>
> - 
>
>   （4）**StringBuffer使用了缓存区**，**StringBuilder没有使用缓存区**，所以没有修改数据的情况下，多次调用StringBuffer的toString方法获取的字符串是共享底层的字符数组的。而StringBuilder不是共享底层数组的，每次都生成了新的字符数组。
>
> 

# 四、DigDecimal类

## 4.1BigDecimal类简介、常用方法

> - **导包**：BigDecimal类位于**java.math.BigDecimal**包下。
> - **特点**：此类可以完成**大的小数操作**，而且也可以使用此类进行**精确的四舍五入。**

常用方法：

1.构造方法：

| BigDecimal(String value) | 构造方法，将String类型转换成BigDecimal类型数据。 |
| ------------------------ | ------------------------------------------------ |
| BigDecimal(double value) | 构造方法，将double类型转换成BigDecimal类型数据。 |
| BigDecimal(int val)      | 构造方法，将int类型转换成BigDecimal类型数据。    |



2.常用操作：

| BigDecimal add(BigDecimal value)         | 加法，求两个BigDecimal类型数据的和。            |
| ---------------------------------------- | ----------------------------------------------- |
| BigDecimal subtract(BigDecimal value)    | 减法，求两个BigDecimal类型数据的差。            |
| BigDecimal multiply(BigDecimal value)    | 乘法，求两个BigDecimal类型数据的积。            |
| BigDecimal divideBigDecimal divisor)     | 除法，求两个BigDecimal类型数据的商。            |
| BigDecimal remainder(BigDecimal divisor) | 求余数，求BigDecimal类型数据除以divisor的余数。 |
| BigDecimal max(BigDecimal value)         | 最大数，求两个BigDecimal类型数据的最大值。      |
| BigDecimal min(BigDecimal value)         | 最小数，求两个BigDecimal类型数据的最小值。      |
| BigDecimal abs()                         | 绝对值，求BigDecimal类型数据的绝对值。          |
| BigDecimal negate()                      | 相反数，求BigDecimal类型数据的相反数。          |



其中对于除法有些特殊：

BigDecimal除法可能出现不能整除的情况，例如9.9/4.6，如果直接按照表格中的格式写会报错。

我们可以用BigDecimal divide(BigDecimal divisor, int scale, int roundingMode)。

> 第一参数表示**除数**。
>
> 第二个参数表示**小数点后保留位数**。
>
> 第三个参数表示**舍入模式**。只有在作除法运算或四舍五入时才用到舍入模式。（对于舍入模式需要的时候进行查询）贴个文章：[BigDecimal 类详解](https://blog.csdn.net/m0_54144956/article/details/130041945?ops_request_misc=%7B%22request%5Fid%22%3A%22171127783716800211518295%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=171127783716800211518295&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-130041945-null-null.142^v99^pc_search_result_base5&utm_term=BigDecimal类&spm=1018.2226.3001.4187)。可用于查找用法。

3.实际应用：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271115534.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果分别显示了BigDecimal的不同操作：

> 5.8761526
> 0.4070326
> 8.590873460256
> 1.1488475659703938
> 0.4070326
> 3.1415926
> 2.73456
> 219
> -3.1415926

## 4.2小数点的处理

BIgDecimal中可以有三种处理小数的方法：导入**DecimalFormat包**

> - 0.000......
> - \#.000......
> - BigDecimal类操作

例如：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116428.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> 3.1416
> 2.73
> 1.141

# 五、泛型

先在这里贴一个[两万字详解的文章](https://blog.csdn.net/weixin_45395059/article/details/126006369?ops_request_misc=%7B%22request%5Fid%22%3A%22171127084016800222870237%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=171127084016800222870237&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-126006369-null-null.142^v99^pc_search_result_base5&utm_term=泛型&spm=1018.2226.3001.4187)。学习于此。当然暂时先学习基本知识。º·(இωஇ)‧º·˚.

## 5.1什么是泛型

泛型即是将参数的数据类型也参数化，即“**参数化类型**”。好比在方法定义时，将方法签名中的形参的数据类型也设置为参数（也可称之为类型参数），在调用该方法时再从外部**传入一个具体的数据类型和变量**。这种参数化类型可以用在类、接口和方法中，被称为**泛型类、泛型接口、泛型方法**。

## 5.2泛型类的基本语法与使用

5.2.1泛型类

将类型参数用于类的定义中，则该类被称为泛型类。

其基本语法：

> class 类名称 <泛型标识>{
>
> ​    private 泛型标识/* 成员变量类型 */ 变量名;
>
> ​    ......
>
> }

<>内的泛型标识被称作类型参数，用于指代任何数据类型。

一般Java常见的标识如下：

> T ：代表一般的任何类。
>
> E ：代表 Element 元素的意思，或者 Exception 异常的意思。
>
> K ：代表 Key 的意思。
>
> V ：代表 Value 的意思，通常与 K 一起配合使用。
>
> S ：代表 Subtype 的意思，文章后面部分会讲解示意。

例如：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116161.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 这样，我们就实现了一个泛型类。在泛型类中，类型参数定义的位置有三处，分别是：

>  1.**非静态**的**成员属性类型**
>  2.**非静态方法**的**形参类型**（包括非静态成员方法和构造器）
>  3.**非静态的成员方法的返回值**类型

也就是说明：泛型类中的**静态方法和静态变量不可以使用泛型类所声明的类型参数。**

那么我们对一个泛型类确实定义了一个类型不确定的类型参数，又什么时候将这个类型参数定下来呢？泛型类中的类型参数的确定是在**创建泛型类对象**的时候。就像上边的代码里写的，在Example中我们以T代表了一个类型参数，在创建对象的时候我们将T换为我们需要的类型。

特别注意的是：

> - **静态泛型方法**中可以使用**自身的方法签名中新定义的类型参数**（即泛型方法，后面会说到），而**不能使用泛型类中定义的类型参数**。
> - 泛型类**不只接受一个类型参数，它还可以接受多个类型参数**。

5.2.2泛型类的使用

在创建泛型类的对象时，**必须指定类型参数 T 的具体数据类型**，即尖括号 <> 中传入的什么数据类型，T 便会被替换成对应的类型。如果 <> 中什么都不传入，则**默认是 < Object >**。

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116577.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果:

>  5
>  org.example.Example@2f4d3709
>  hello
>  abc

## 5.3泛型接口

基本定义：

> public interface 接口名<类型参数>{
>
> ​    ......
>
> }

其中泛型接口中的类型参数，是**在该接口被继承或着被实现的时候确定的**。注意：在泛型接口中，**静态成员也不能使用泛型接口定义的类型参数**。

其在定义时：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116601.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 例：一个简单的泛型接口的实现

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116086.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 运行结果：

> 10.5

## 5.4泛型方法

基本定义：

当在一个方法签名中的返回值前边声明了一个<T>时，则该方法就被声明为一个泛型方法。其中<T>表示该方法声明了一个类型参数T，并且这个类型参数T只在该方法中使用。

> public <类型参数> 返回类型 方法名(类型参数 变量名){
>   .....
>
> }

注意：只有**在方法签名中声明了< T >的方法**才是**泛型方法**，仅使用了泛型类定义的类型参数的方法并不是泛型方法。

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116651.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

> -  泛型方法中**可以同时声明多个类型参数**。
> -  泛型方法中**也可以使用泛型类中定义的泛型参数**。
> -  特别注意的是：**泛型类中定义的类型参数**和**泛型方法中定义的类型参数**是**相互独立**的，它们一点关系都没有。
> -  我们可以将**静态成员方法定义为一个泛型方法**。

例子：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116443.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> the t is5
> t was inputted!
> 5.36

# 六、列表

## 6.1List简介

在Java的集合框架中，List接口是一个有序、可重复的集合，它扩展了Collection接口，并提供了一系列操作和方法来处理元素列表。其实现类包括：ArrayList、LinkedList、Vector。

| ArrayList  | 基于动态数组实现，支持随机访问和快速遍历，适用于读取和修改操作较多的场景。 |
| ---------- | ------------------------------------------------------------ |
| LinkedList | 基于双向链表实现，支持高效的插入和删除操作，适用于频繁的插入和删除操作。 |
| Vector     | 与`ArrayList`类似，但是线程安全，适用于多线程环境。          |

## 6.2ArrayList

`ArrayList`是`List`接口的一个常见实现类，它基于动态数组实现，可以根据需要自动扩展和收缩数组的大小。

常用方法：

| .add(E element)             | 在列表的末尾添加元素。   |
| --------------------------- | ------------------------ |
| .get(int index)             | 获取指定索引位置的元素。 |
| .set(int index , E element) | 替换指定索引位置的元素。 |
| .remove(int index )         | 移除指定索引位置的元素。 |
| .size()                     | 返回列表的大小。         |



代码实现：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116021.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> [Hello]
> World!
> [Hello, World!]
> [Hello, JAVAAGENT]
> 2

## 6.3LinkedList

`LinkedList`是`List`接口的另一个实现类，它基于双向链表实现。与`ArrayList`相比，`LinkedList`对于频繁的插入和删除操作更高效。

常用方法同上，代码操作：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116946.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> Names: [Alice, Bob, Charlie]
> Names after removal: [Alice, Charlie]
> First name: Alice

## 6.4Vector

`Vector`是`List`接口的另一个实现类，与`ArrayList`类似，但是它是线程安全的。`Vector`的操作方法与`ArrayList`相同，但是由于线程同步的额外开销，它的性能可能较低。

常用方法同上，代码操作：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116468.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> Colors: [Red, Green, Blue]
> Colors after removal: [Red, Blue]
> First color: Red
> 2

# 七、set

## 7.1set简介

set和List都是Collection集合的子类，set有无序性（存储顺序不一致）、不重复（可以去除重复）、无索引（没有带索引的方法，所以不能使用普通的for循环遍历）。其具体实现类有：HashSet、LinkedHashSet、TreeSet。其中：

- HashSet：无序，不重复，无索引
- LinkedHashSet：有序，不重复，无索引
- TreeSet：排序，不重复，无索引

## 7.2遍历与常用方法

7.2.1遍历

> - 直接使用System.out.println(set)
> - 增强型for循环
> - 迭代器遍历

例如：结果和上边一样，HashSet的存储是无序的

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116297.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> [我是第三个字符串, 我是第一个字符串, 我是第二个字符串]
> 我是第三个字符串
> 我是第一个字符串
> 我是第二个字符串
> 我是第三个字符串
> 我是第一个字符串
> 我是第二个字符串

8.2.2常用方法

同其他的差不多：

| int size()               | 返回集合的长度   |
| ------------------------ | ---------------- |
| boolean isEmpty()        | 判断集合是否为空 |
| boolean add(E e)         | 添加元素         |
| boolean remove(Object o) | 删除元素         |



这里就不在展示代码了，和其他的相差无几。

在这里贴几篇文章，以便后续更深的学习：[Java Set集合详解](https://blog.csdn.net/qq_51751452/article/details/121467783?ops_request_misc=%7B%22request%5Fid%22%3A%22171151958616800180684589%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=171151958616800180684589&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-6-121467783-null-null.142^v100^pc_search_result_base5&utm_term=setjava&spm=1018.2226.3001.4187)、[Java(七)——集合框架---Set集合](https://blog.csdn.net/MrDaKai/article/details/127727272?ops_request_misc=%7B%22request%5Fid%22%3A%22171151958616800180684589%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=171151958616800180684589&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-127727272-null-null.142^v100^pc_search_result_base5&utm_term=setjava&spm=1018.2226.3001.4187)

# 八、map

## 8.1map简介

map是一种集合，其基本形式为：**public interface Map<K,V>**，Map是一个**接口**，其不可以直接创建对象，可以通过多态的形式创建对象。Map中包含两个参数，一个是**K表示键**，一个是**V表示值，**且一个键有且仅有对应一个值，Map中不能包含重复的键，若是有重复的，按最后一次的键为准，而其他的键会被覆盖。

**Map的导包：java.util.Map**,其具体实现一般有两种：HashMap（无序）和TreeMap（默认升序）。实现接口回调。

例如：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116753.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 运行结果：（键不可以重复，值可以重复）

> {1=张三, 2=张三, 3=王五}

## 8.2Map的使用

| .put(K key, V value)    | 添加元素               |
| ----------------------- | ---------------------- |
| .remove(K key)          | 根据键删除键值对元素   |
| .clear()                | 移除所有键值对元素     |
| .containsKey(K key)     | 判断集合是否包含指定键 |
| .containsValue(V value) | 判断集合是否包含指定值 |
| .isEmpty()              | 判断集合是否为空       |
| .size()                 | 返会键值对的个数       |

例如：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271116135.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> {1=张三, 2=李四, 3=王五}
> {2=李四, 3=王五}
> false
> false
> false
> false
> false
> 2
> true

## 8.3Map的遍历

实现Map的遍历有三种方式：

> 1. 由键找值，创建键的集合，再遍历每一个键，实现键值对的遍历
> 2. 获取所有键值对的集合，遍历键值对集合
> 3. Iterator迭代器

实现：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271117308.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 第二种也可以更简洁一点。

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271117941.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

运行结果：

> {1=张三, 2=李四, 3=王五}
> 1and张三 2and李四 3and王五 
> 1and张三 2and李四 3and王五 
> 1and张三 2and李四 3and王五 

------

学习笔记 如有错误 日后修改(∗ᵒ̶̶̷̀ω˂̶́∗)੭₎₎̊₊♡