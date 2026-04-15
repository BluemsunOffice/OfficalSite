---
title: "File和Path、流"
date: 2024-10-11T12:02:51+08:00
image: "/img/blog_pic/houduan.jpg"
draft: false
weight: 100
author: "林律融"
categories: ["后端"]
description: "File和Path、流"
---
#  File

我们无论使用什么编程语言的时候，只要涉及到实际的应用开发，就不可能逃不开文件传输的问题，像是我们若是想对于一个文件提取我们所相应的信息，或是讲我们已经计算完成的东西自动的储存在一个文件中，我们都需要与实际的文件打交道。

因此我们之后就要具体讲讲java中是如何与File进行一个交互的。

## 路径

如果我们想要找到一个文件的话我们就必然要知道这个文件在哪里，如果搜索的是人的话，我们会相应的打开对应的文件夹，然后查看对应的文件，最后我们就能找到我们想要打开的文件就比如说，我们可以通过点击图标来打开《原神》。

![](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271110881.png)![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")​编辑

开个玩笑，但是我们知道计算机是无法看到我们看到的图标的，那如果计算机想要打开我们想要打开的文件那应该怎么办呢。

这时候我们就会运用到了路径，路径就像是一个地址，位置，我们也可以通过地址来找到我们想去的地方，所以计算机也同样可以用地址来获得位置。

但是路径我们通常在传值给编程语言的时候会提及两种地址，他们分别是绝对路径和相对路径。

### 绝对路径

绝对路径顾名思义他是绝对会跟着外部环境所处的位置而改变的，就比如在电脑中绝对路径往往是从哪个盘开始写起，就像这样：

```
c://
```

![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")

他是绝对的，只要文件中的路径或是什么没有改动的话，就不会进行变更。

### 相对路径

他是相对的，我们往往在开发的过程中我们的应用程序所处的环境是不断变更的，像是当别人下载了一款app的话，开发者是不可能提前知道用户会将文件放到哪个地方的，所以开发时往往是用绝对路径来引用其他文件的。

其中，绝对路径中我们往往用"../"来描述返回上一级的文件。

```
..\..\index.html
```

![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")

这样就访问到了上上级目录中的index.html这个文件。

## 创建File对象

接下来，我们正式开始将如何在java中进行访问别的文件。

### 朴素创建法

首先我们可以直接用最朴素的创建方法。

```java
File file = new File("e://")
```

![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")

我们直接用File这个类创建了一个File的对象，其中在定义的时候只需在后面的括号中写下路径即可，这个路径可以是相对的，也可以是绝对的。

### 通过父路径进行创建

顾名思义就是通过将付路径进行一个使用，然后拼接在外面想要的文件前面，就像下面这样：

```java
public File(String parent, String child)
```

![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")

### 通过父文件类型创建

少说废话直接上实例：

```java
public File(String parent, String child)
```

![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")

##  文件对象的用法

我们可以通过文件进行一系列的操作，就像询问给文件是否存在，或是直接创建一个我们想要的文件，最后再进行删除。

从下面的代码我们可以看出文件从无到有最后变为无的状态：

![](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271110001.png)![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")​编辑

# Path

接下来我们来讲一下path，想要定位到一个文件，我们最好是通过相应的路径来进行搜索，于是我们就要用到了path类型。

path这种类里面的可以是一个完整的路径，也可以是一段承载着信息的字符串。

```java
Path absolute = Paths.get("/Users", "acton_zhang");
Path relative = Paths.get("pers", "zhang", "ThreadDemo.java");
System.out.println(absolute);
System.out.println(relative);

System.out.println(absolute.resolve("/bin"));
System.out.println(absolute.resolve("bin"));

//输出：
/Users/acton_zhang
pers/zhang/ThreadDemo.java
/bin
/Users/acton_zhang/bin
```

![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")

就像上式一样，.get()方法可以获得我们想要的对应位置的路径。

而resolve（）主要是进行对已有的path进行添加处理的。

resolvSibling是对于现在所在的位置进行一个同等的替换。

```java
Path workPath = Paths.get("/opt", "myapp", "word");
Path temp = workPath.resolveSibling("temp");
System.out.println(temp);///opt/myapp/temp
```

![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")

诸如此类的方法还有很多，我们可以对应需求进行查询。

# 流

流在java之中有非常多的表现形式，我们接下来会按照不同流的特性来进行与阐述。

### 按照处理的的数据类别

我们可以详细的讲他分为两大类：

#### 字节流

以字节为单位获取数据，命名上以Stream结屋的流一般是字节流 。如FilelnputStream、FileOutputStream。

相应的我们不能直接打开我们传输出去的二进制文件，我们只能通过我们相应的解码的语言进行一个解码才行。

InputStream和OutputStream，都实现了Closeable接口，所以支持try-resources。

##### InputStream

InputStream操作用于实现数据的读取操作

- read():int 注意这里只是读取一个字节，0-255之间，-1表示流结束
- read(byte[]):int 返回值表示读取的具体字节个数，-1流结束
- close():void 关闭流

##### OutputStream

OutputStream操作方法用于实现数据的写出操作

- write(int):void 写出一个字节，int的低8位
- write(byte[]具体数据，int起始下标，int长度):
- void close():void 关闭流 不重要的方法
- write(byte[])、flush()

通过一下这种方式我们可以将应该文件里面的内容拷贝到另一个文件之中。

```java
        InputStream is = null;
		OutputStream os = null;
		try {
			is = new FileInputStream("data/a1.txt");
			File file = new File("out/");
			if(!file.exists())
				file.mkdirs();
			os=new FileOutputStream("out/a1.bak");//自动创建文件，如果文件已存在
则采用覆盖
			int data=0;
			while((data=is.read())!=-1) {
				os.write(data);
			}
			} catch (Exception e) {
				System.out.println(e);
			} finally {
				try {
                    if (is != null)
					is.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				try {
					if (os != null)
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
			}
		}
```

![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")

#### 字符流

顶级父抽象类Reader和Writer，一次一字符的操作，实现了Closeable接口。如果涉及中文信息，则需 要考虑编码字符集的问题，如果编码字符集错误，则显示乱码

##### Reader

Reader用于封装字符读取操作

- read():int 返回读取到的字符数据，0-65535 2B，返回-1 表示流末尾
- read(char[]):int 返回读取的字符个数，流结束返回-1
- close():void 关闭流

##### Writer

Writer用于封装字符写出操作

- write(int):void 写出低16位
- write(char[]数据，int起始下标，int写出的字符数):void
- close():void 关闭流，释放资源 write(String):void 写出一个字符串内容到输出流中

我们具体还有以下种种的对应不同需求而产生的流供大家的各种需求，他们也蕴含着不同的特性，我们可以在需要用到的时候具体查看，这里不多赘述了。

![](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271110665.png)![](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw== "点击并拖拽以移动")​编辑

