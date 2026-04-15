---
title: "Servlet"
date: 2024-05-26T13:02:51+08:00
image: "/img/blog_pic/servlet.jpg"
draft: false
weight: 100
author: "李超平"
categories: ["后端"]
description: "applet是小型的程序，server是服务，servlet是小型的服务程序"
---
# Servlet

servlet(server applet)，顾名思义，applet是小型的程序，server是服务，servlet是小型的服务程序，通常用来处理某个或多个请求。在web程序启动时，服务器会创建一个Servlet的对象，然后进行相关的操作。

## Tomcat

tomcat是一个服务器，重要的是它免费。前端的请求就是由服务器来处理的，而Servlet就是服务器内部的一个组件，它用来进行具体的请求处理。

## 创建Web项目

在IDEA中使用Maven管理，创建一个Java EE项目：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271133417.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

下一步后，依赖项只需Servlet即可： 

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271133614.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

点击创建后：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271133360.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

可以看到JavaWeb项目的目录结构是：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271133278.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 有HelloServlet类(这是自动生成的)，还有web.xml配置文件

## HelloServlet类

HelloServlet类的内容如下：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271133823.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

这里我们先把第八行的

```java
@WebServlet(name = "helloServlet", value = "/hello-servlet")
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

这行注解先注释掉，这个留到后面再说（如果不注释掉，后面的web.xml配置中可能会报错）。

它是HttpServlet的子类，而：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271133722.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

HttpServlet是GenericServlet的子类

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271133988.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

GenericServlet实现了Servlet接口。

HelloServlet中有doGet方法:

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271133117.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

顾名思义，它是用来处理get请求的，它的两个参数：request和response分别代表着请求和响应。从doGet方法的代码我们可以看到，response的setContentType方法规定了响应文件的类型，也就是传回前端的文件类型：text或html文件，接下来的PrintWriter，就是一种功能强大的字符输出流，它返还的内容就是后面println里面的东西，可以发现println输出的就是html代码，再通过浏览器解析，在前端显示出来。

## web.xml

这个是一个配置文件。当服务器启动web项目时，首先会加载web.xml。这里面通常配置一些初始化信息(欢迎页面，默认是和WEB-INF同级的index.jsp)；设置URL的映射规则(某个具体请求由哪个Servlet来处理)，初始化参数，错误处理页面等。

### 设置欢迎页

启动服务器，然后就可以看到一个页面：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271133555.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

注意地址栏的信息：

```html
http://localhost:8080/myServlet_war_exploded/
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

这个留到后面再说。

这个页面是哪来的呢？就是和WEB-INF同级的index.jsp![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134785.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

观察它的代码可以发现，index.jsp和html基本差不多。它打开时默认的欢迎页面就是index.jsp，我们也可以在web.xml中写入：

```XML
<welcome-file-list>
    <welcome-file>index.jsp</welcome-file>
</welcome-file-list>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

这时指定了欢迎界面是index.jsp，当然我们也可以指定我们自己写的欢迎界面，可以自己创建一个index.html：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134618.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 然后在web.xml中写入：

```XML
<welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.jsp</welcome-file>
</welcome-file-list>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

就像这样：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134045.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

此时欢迎界面会首先选择第一个，如果第一个找不到再找第二个。重启服务器后：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134603.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

### 为Servlet分配请求

此外，web.xml中还可以指定哪种请求由哪个Servlet类来处理：

```XML
<servlet>
    <servlet-name>hello</servlet-name>
    <servlet-class>org.example.myservlet.HelloServlet</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>hello</servlet-name>
    <url-pattern>/hello-servlet</url-pattern>
</servlet-mapping>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

这是一种映射的关系，url-pattern中就是我们要处理的请求，它的/hello-servlet和index.jsp中的超链接的href内容对应：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134188.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134386.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

我们超链接的请求就是一个get请求，再获取一个页面，此时这个请求的url模式就是它的href，我们在web.xml中指定了这种url模式的请求由servlet-class中的类来完成，servlet-class的内容是类的全称（包括包名和类名），而servlet-name标签是一个名字，它用来连接一个映射，我们上面的xml代码的意思就是：url模式为/hello-servlet的请求，它的servlet-name是hello，把这个请求交给servlet-name同样为hello的 servlet标签 所对应的servlet-class这个类去处理。

前面说我们HelloServlet类的一个方法是：

```java
public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("text/html");

    // Hello
    PrintWriter out = response.getWriter();
    out.println("<html><body>");
    out.println("<h1>" + message + "</h1>");
    out.println("</body></html>");
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

它用来处理get请求，当对应的url-pattern为/hello-servlet的get请求过来，此时调用HelloServlet对象(servlet对象由服务器自动创建，不需要我们再去写相关代码)的doGet方法，此时就会执行println，out.println输出的差不多是这样的内容：

```html
<html><body>
<h1>Hello World!</h1>
</body></html>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

这样子的html代码（前面的代码截图可以看到，定义message时赋了初始值“Hello world!”），此时再被浏览器解析，就是这样的页面：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134825.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

此时地址栏中的信息：

```html
http://localhost:8080/myServlet_war_exploded/hello-servlet
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

localhost:8080就是我们本地服务器的端口号，myServlet_war_exploded是我们部署的“应用程序上下文”，就像网页的路径(类似于url)，这两项在我们的 运行/调试配置 中有所体现：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134297.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134911.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑 上面地址栏中最后的hello-servlet就是我们超链接的目标，也是这个get请求的url-pattern

上面的地址栏的内容可能有点太长，我们也可以自己指定“应用程序上下文”，或者直接指定为一个/：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134353.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

 然后我们重启服务器：

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271134020.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

这时欢迎页的url就成了简单的localhost:8080，之前我们说过，未改变“应用程序上下文”之前我们打开服务器出来的url是：

```html
http://localhost:8080/myServlet_war_exploded/
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

在指定HelloServlet来处理href为hello-servlet的超链接的get请求之前，我们点击超链接也可以正确跳转，这是因为在HelloServlet中有一行注解：

```java
@WebServlet(name = "helloServlet", value = "/hello-servlet")
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

就是之前被注释掉的那个，这个注解规定了name是helloServlet，这个name和xml中的servlet-name标签类似，value和url-pattern类似，这行注解可以注明HelloServlet类用来处理url-pattern是/hello-servlet的请求。之所以前面要注释掉，是因为我们在web.xml中指定了servlet-name是hello，和注解中的name不同，如果不注释掉的话会报错。

