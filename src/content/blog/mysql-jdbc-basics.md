---
title: "2024春季蓝旭工作室培训第五周预习"
date: 2024-10-06T13:02:51+08:00
image: "/img/blog_pic/java.jpg"
draft: false
weight: 100
author: "张高升"
categories: ["后端"]
description: "MySql的基本语法·JDBC"
---

**目录**

[一、MySql的基本语法](#一、MySql的基本语法)

[1.1先贴三个解决我下载问题的好文章](#1.1先贴三个解决我下载问题的好文章)

[1.2什么是数据库](#1.2什么是数据库)

[1.3MySql的结构](#1.3MySql的结构)

[1.4MySql的基本语法](#1.4MySql的基本语法)

[1.4.1打开命令列](#1.4.1打开命令列)

[ 1.4.2语句规则与分类](# 1.4.2语句规则与分类)

[1.4.3具体使用](#1.4.3具体使用)

[1.4.3.1操作数据库](#1.4.3.1操作数据库)

[1.4.3.2操作数据库表](#1.4.3.2操作数据库表)

[二、JDBC](#二、JDBC)

[2.1什么是JDBC](#2.1什么是JDBC)

[2.2JDBC的一般流程](#2.2JDBC的一般流程)

[ 2.3JDBC中的一些接口和类](# 2.3JDBC中的一些接口和类)

[2.4代码实践](#2.4代码实践)

------

前言：

这篇文章主要学习数据库、MySql的基本语法、JDBC。

------

# 一、MySql的基本语法

## 1.1先贴三个解决我下载问题的好文章

[Navicat16安装和激活详细讲解（全网最简单且靠谱）](https://blog.csdn.net/weixin_50670076/article/details/136350060?ops_request_misc=%7B%22request%5Fid%22%3A%22171316055016800227496270%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=171316055016800227496270&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-4-136350060-null-null.142^v100^pc_search_result_base5&utm_term=Navicat&spm=1018.2226.3001.4187)

[2024 年 MySQL 8.0 安装 配置 教程 最简易（保姆级）](https://blog.csdn.net/m0_52559040/article/details/121843945?ops_request_misc=%7B%22request%5Fid%22%3A%22171314009616800182159156%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=171314009616800182159156&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-4-121843945-null-null.142^v100^pc_search_result_base5&utm_term=mysql&spm=1018.2226.3001.4187)

[Navicat连接Mysql教程](https://blog.csdn.net/weixin_43891901/article/details/109522839?ops_request_misc=%7B%22request%5Fid%22%3A%22171316236116800182144002%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=171316236116800182144002&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-109522839-null-null.142^v100^pc_search_result_base5&utm_term=navicat连接mysql&spm=1018.2226.3001.4187)

## 1.2什么是数据库

定义：数据库是指**一个存储数据的仓库**,可以**存储和管理大量的数据**.数据库通常**由一个或多个数据表组成**,每个表都包含了一系列有关联的数据记录.数据库可以用于存储,管理和查询数据,常用于各种应用程序,网站和服务中。

而我们的MySql就是一种**关系型数据库管理系统**，它使用**结构化查询语言（SQL）**进行管理，而在Java中呢，我们可以**用JDBC API来访问MySql**。

## 1.3MySql的结构

MySql作为一种数据库管理系统,它**可以管理多个数据库**;而每个数据库中又是在**用多个表为单位来存储数据**;一个表类似于一个**二维数组**,**每一行都是一个记录,每一列都是一个字段**;**一个字段相当于一个属性。**

## **1.4MySql的基本语法**

### 1.4.1打开命令列

如图点击，打开命令列。

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129438.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

###  1.4.2语句规则与分类

- SQL命令每输入完一个**一定要末尾加分号。**
- SQL命令中的关键字是**不区分大小写的。**

| 数据定义语言 | 简称DDL,用来**定义数据库对象**:数据库,表,列等.例如:**`create`(创建数据库对象)**,**`alter`(修改数据库表的字段),`drop`(删除数据库对象),`use`(选择当前会话要使用的数据库)**等. |
| ------------ | ------------------------------------------------------------ |
| 数据操作语言 | 简称DML,用来**对数据库中表的记录进行更新**.例如:**`insert`(向数据库表中插入记录)**,**`delete`(删除记录)**,**`update`(修改表中现有的记**录)等. |
| 数据控制语言 | 简称DCL,用来**控制数据库用户访问权限和数据完整性**.例如:**`grant`(给用户或用户组授予数据库或表的特定权限),`revoke`(撤销用户或用户组的权限)**,**`commit`(提交数据库事务,并把已完成的更改保存到数据库中)**,**`rollback`(撤销事务所做的所有更改,将数据库恢复到事务开始之前的状态)**等. |
| 数据查询语言 | 简称DQL,用来**查询数据库中表的记录**.例如:**`select`(从数据库中查询数据)**,**`from`(指定一个或多个表)**,**`where`(从表中选择符合某些条件的行)**等. |

### 1.4.3具体使用

#### 1.4.3.1操作数据库

1.查看数据库 show databases; 输出数据库列表

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129066.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 2.创建数据库 create database database_name; 

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129535.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

Student数据库被创建。

3. 删除数据库：drop database database_name;

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129539.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

test数据库被删除。

4. 使用数据库：ues database_name;

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129019.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

#### 1.4.3.2操作数据库表

数据库表的数据类型：

更多详细见：[MySQL数据类型](https://blog.csdn.net/m0_52982868/article/details/123032241?ops_request_misc=%7B%22request%5Fid%22%3A%22171326085416800197098636%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=171326085416800197098636&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-123032241-null-null.142^v100^pc_search_result_base5&utm_term=Mysql的数据类型&spm=1018.2226.3001.4187)

| 整型         | INT,TINYINT,SMALLINT,MEDIUMINT,BIGINT,BOOLEAN                |
| ------------ | ------------------------------------------------------------ |
| 浮点型       | FLOAT,DOUBLE,DECIMAL                                         |
| 字符串型     | CHAR,VARCHAR,TEXT,MEDIUMTEXT,LONGTEXT                        |
| 日期型       | DATE,TIME,DATETIME,TIMESTAMP                                 |
| 枚举型       | ENUM                                                         |
| 集合型       | SET                                                          |
| 二进制类型   | BINARY,VARBINARY,BLOB                                        |
| 空间数据类型 | POINT,LINESTRING,POLYGON,GEOMETRY,MULTIPOINT,MULTILINESTRING, MULTIPOLYGON,GEOMETRYCOLLECTION |

 1.创建、查看数据库表

一般数据表的创建：

> CREATE TABLE table_name (
> column1 datatype1,
> column2 datatype2,
> column3 datatype3,
> ...
> );

例如：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129216.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑



![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129106.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

可以看到成功创建。 

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129067.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 查看数据表。

2.删除数据库表

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129326.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 我们先创建好一个table，然后删除

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129688.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

3.修改表名：

数据表名的修改：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129775.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑



![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271129335.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

4.添加新列：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130959.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑



![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130419.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

6.修改列名和数据类型

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130861.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑



![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130113.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

7.删除列

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130932.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

8.修改列的数据类型

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130137.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

9.添加记录

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130042.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

10.更新记录

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130405.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

11.删除记录

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130576.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

12.查询记录

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130357.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

13.字符串匹配

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130624.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

14.自动去重

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130443.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

15.分组

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130162.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130052.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑



16.排序

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130092.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

17.查看数据表结构

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130832.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

# 二、JDBC

## 2.1什么是JDBC

JDBC 是一个用于**在 Java 应用程序和数据库之间**进行通信的 API,它**提供了一系列接口**,使得我们可以**使用 Java 代码访问各种关系型数据库**。

## 2.2JDBC的一般流程

| 第一步：注册驱动           | 作用：告诉Java程序，即将要连接的是哪个品牌的数据库           |
| -------------------------- | ------------------------------------------------------------ |
| 第二步：获取连接           | 表示JVM的进程和数据库进程之间的通道打开了，这属于进程之间的通信使用完之后一定要关闭通道 |
| 第三步：获取数据库操作对象 | 专门执行sql语句的对象                                        |
| 第四步：执行SQL语句        | DQL DML…                                                     |
| 第五步：处理查询结果集     | 只有当第四步执行的是select语句的时候，才有这第五步处理查询结果集 |
| 第六步：释放资源           | 使用完资源之后一定要关闭资源。Java和数据库属于进程间的通信，开启之后一定要关闭 |

##  2.3JDBC中的一些接口和类

**DriverManager类**（驱动管理类）里面全是静态方法，我们用它来注册驱动：

| DriverManager 类中的静态方法                                 | 说明                          |
| ------------------------------------------------------------ | ----------------------------- |
| static void registerDriver(Driver driver)                    | 向 DriverManager 注册驱动程序 |
| static Connection getConnection(String url, String user, String password) | 建立到给定数据库 URL 的连接   |

**Statement接口**（执行sql）用于执行静态 SQL 语句并返回它所生成结果的对象：

| statement中的方法                  | 说明                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| int executeUpdate(String sql)      | 执行更新语句，该语句可能为 INSERT、UPDATE 或 DELETE 语句，返回值是“影响数据库中的记录条数” |
| ResultSet executeQuery(String sql) | 执行 SQL查询语句，该语句返回单个 ResultSet 对象              |

**ResultSet接口**（查询结果集），sql查询语句后可以将结果封装到ResultSet中：

| ResultSet中的方法                    | 说明                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| boolean next()                       | 将光标从当前位置向前移一行。ResultSet 光标最初位于第一行之前；第一次调用 next 方法使第一行成为当前行；第二次调用使第二行成为当前行，依此类推（用来查询结果） |
| String getString(int columnIndex)    | 不管数据库中的数据类型是什么，都以String的形式取出（columnIndex是指取列数，第一列，第二列…） |
| String getString(String columnLabel) | 不管数据库中的数据类型是什么，都以String的形式取出（ columnLabel指查询语句中的列名） |

## 2.4代码实践

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130930.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130814.png)

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271130039.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

------

学习笔记 如有错误 日后修改(∗ᵒ̶̶̷̀ω˂̶́∗)੭₎₎̊₊♡

