---
title: "Sa-token"
date: 2024-10-08T10:02:51+08:00
image: "/img/blog_pic/java.jpg"
draft: false
weight: 100
author: "张绍启"
categories: ["后端"]
description: "轻量级Java权限认证框架"
---
## Sa-token简介:



SA-Token是一个轻量级Java权限认证框架，主要解决：登录认证、权限认证、Session会话、单点登录、OAuth2.0等功能。你可以使用SA-Token来轻松地实现项目的权限控制，并且几乎零学习成本。SA-Token以简单、易用、安全为主要设计目标，提供了丰富的API和灵活的扩展机制，可以满足大多数项目的需求。

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271910370.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

## 基础流程图:

## 

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271910023.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

## 

## 参考资料:

官方文档:[Sa-Token](https://sa-token.cc/index.html)



## 依赖:

```
        基本:
        <dependency>
            <groupId>cn.dev33</groupId>
            <artifactId>sa-token-spring-boot3-starter</artifactId>
            <version>1.39.0</version>
        </dependency>
 <!-- Sa-Token 整合 Redis （使用 jdk 默认序列化方式） -->
        <dependency>
            <groupId>cn.dev33</groupId>
            <artifactId>sa-token-redis</artifactId>
            <version>1.39.0</version>
        </dependency>

        <!-- 提供Redis连接池 -->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId>
        </dependency>

        <!-- Sa-Token OAuth2.0 模块 -->
        <dependency>
            <groupId>cn.dev33</groupId>
            <artifactId>sa-token-oauth2</artifactId>
            <version>1.39.0</version>
        </dependency>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 框架配置:

```
# Sa-Token配置
sa-token:
  # token名称 (同时也是cookie名称)
  token-name: xc_satoken
  # token有效期，单位s 默认30天, -1代表永不过期
  timeout: 2592000
  # 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录)
  is-concurrent: true
  # 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token)
  is-share: false
  # token风格
  token-style: uuid
  # 是否输出操作日志
  is-log: true
  # 不从 Cookie 中读取 Token
  is-read-cookie: false
  # 不将 Token 写入 Cookie
  is-write-cookie: false





    # redis配置
    redis:
      # Redis数据库索引（默认为0）
      database: 1
      # Redis服务器地址
      host: 127.0.0.1
      # Redis服务器连接端口
      port: 6379
      # Redis服务器连接密码（默认为空）
      # password:
      # 连接超时时间
      timeout: 10s
      lettuce:
        pool:
          # 连接池最大连接数
          max-active: 200
          # 连接池最大阻塞等待时间（使用负值表示没有限制）
          max-wait: -1ms
          # 连接池中的最大空闲连接
          max-idle: 10
          # 连接池中的最小空闲连接
          min-idle: 0
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 全局异常处理:

在使用框架时候出现的异常他都写好了异常类，我们直接处理就可以了

```
package com.pj.current;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import cn.dev33.satoken.exception.DisableServiceException;
import cn.dev33.satoken.exception.NotHttpBasicAuthException;
import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import cn.dev33.satoken.exception.NotRoleException;
import cn.dev33.satoken.exception.NotSafeException;
import cn.dev33.satoken.util.SaResult;

/**
 * 全局异常处理 
 */
@RestControllerAdvice
public class GlobalException {

	// 拦截：未登录异常
	@ExceptionHandler(NotLoginException.class)
	public SaResult handlerException(NotLoginException e) {

		// 打印堆栈，以供调试
		e.printStackTrace(); 

		// 返回给前端
		return SaResult.error(e.getMessage());
	}

	// 拦截：缺少权限异常
	@ExceptionHandler(NotPermissionException.class)
	public SaResult handlerException(NotPermissionException e) {
		e.printStackTrace(); 
		return SaResult.error("缺少权限：" + e.getPermission());
	}

	// 拦截：缺少角色异常
	@ExceptionHandler(NotRoleException.class)
	public SaResult handlerException(NotRoleException e) {
		e.printStackTrace(); 
		return SaResult.error("缺少角色：" + e.getRole());
	}

	// 拦截：二级认证校验失败异常
	@ExceptionHandler(NotSafeException.class)
	public SaResult handlerException(NotSafeException e) {
		e.printStackTrace(); 
		return SaResult.error("二级认证校验失败：" + e.getService());
	}

	// 拦截：服务封禁异常 
	@ExceptionHandler(DisableServiceException.class)
	public SaResult handlerException(DisableServiceException e) {
		e.printStackTrace(); 
		return SaResult.error("当前账号 " + e.getService() + " 服务已被封禁 (level=" + e.getLevel() + ")：" + e.getDisableTime() + "秒后解封");
	}

	// 拦截：Http Basic 校验失败异常 
	@ExceptionHandler(NotHttpBasicAuthException.class)
	public SaResult handlerException(NotHttpBasicAuthException e) {
		e.printStackTrace(); 
		return SaResult.error(e.getMessage());
	}

	// 拦截：其它所有异常
	@ExceptionHandler(Exception.class)
	public SaResult handlerException(Exception e) {
		e.printStackTrace(); 
		return SaResult.error(e.getMessage());
	}
	
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 基础方法:

satoken提供的相关方法:

登录方法:

```
StpUtil.login(userId);
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

调用方法后，服务端会创建session，session用用户id来标记，session存储会话相关的信息，生成token,如果开启缓存会将信息存储到redis中

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271910966.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

判断是否登录的方法:

```
StpUtil.checkLogin():

StpUtil.isLogin();
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

通过请求头中的tokenName中的tokenValue来获取userId，再去session中找有无对应的会话记录

这两个方法的区别在于第一个方法会抛出异常.

//我禁用了缓存，我讲令牌添加到请求头，调用需要登录验证的接口,可以验证登录成功，但是我重启服务器以后登录就失败了，我感觉satoekn在服务端的session中保存了会话信息。





退出方法:

```
StpUtil.logout(userId);
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

会将缓存中的会话信息还有令牌全都删除。



与用户会话信息相关的方法:

```
StpUtil.getLoginId();// 获取当前会话账号id, 如果未登录，则抛出异常：`NotLoginException`
StpUtil.getLoginIdAsString();    // 获取当前会话账号id, 并转化为`String`类型
StpUtil.getLoginIdAsInt();       // 获取当前会话账号id, 并转化为`int`类型
StpUtil.getLoginIdAsLong();      // 获取当前会话账号id, 并转化为`long`类型



// 获取当前会话的 token 值
StpUtil.getTokenValue();

// 获取当前`StpLogic`的 token 名称
StpUtil.getTokenName();

// 获取指定 token 对应的账号id，如果未登录，则返回 null
StpUtil.getLoginIdByToken(String tokenValue);

// 获取当前会话剩余有效期（单位：s，返回-1代表永久有效）
StpUtil.getTokenTimeout();

// 获取当前会话的 token 信息参数
StpUtil.getTokenInfo();
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

通过sasession来获取会话中的详细数据。



踢人下线:

```
StpUtil.kickout(id);
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

将指定用户的session记录删除。

## 踢人下线，强制注销:

1. **踢人下线**：
   - **意图**：通常是出于管理需要，可能是管理员主动决定让某个用户下线。
   - **用户体验**：用户会收到通知，告知他们已被踢下线，通常会有明确的提示，允许他们重新登录.

1. **强制注销**：
   - **意图**：通常是出于安全考虑，例如检测到异常活动或账户被盗用。
   - **用户体验**：用户可能在尝试访问资源时直接被拒绝，通常没有提前的提示，可能会感到困惑。

## ![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271910028.gif)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

## 

## 权限认证:

在讲权限认证以前先了解一下RBAC模型:

### RBAC模型：

参考连接:

[RBAC——基于角色权限的模型-CSDN博客](https://blog.csdn.net/m0_62006803/article/details/133962328?ops_request_misc=%7B%22request%5Fid%22%3A%2298D9C6AF-D3C3-481A-B421-94E565EEC0E0%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=98D9C6AF-D3C3-481A-B421-94E565EEC0E0&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-133962328-null-null.142^v100^pc_search_result_base3&utm_term=RBAC&spm=1018.2226.3001.4187)

### 流程:

根据RBAC模型创建表单:
 ![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271910863.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)​编辑

实现接口:

1:实现根据userId获取用户角色和用户权限的接口

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.example.demo.mapper.RoleUserMapper">
    <!-- 获取用户的角色列表 -->
    <select id="getRoleList" resultType="String">
        SELECT r.role_name
        FROM role_user ru
                 INNER JOIN role r ON ru.role_id = r.id
        WHERE ru.user_id = #{userId}
    </select>
</mapper>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.example.demo.mapper.RolePermissionMapper">
    <!-- 获取用户的所有权限名称 -->
    <select id="getPermissionList" resultType="String">
        SELECT p.permission_name
        FROM role_user ru
                 INNER JOIN role r ON ru.role_id = r.id
                 INNER JOIN role_permission rp ON r.id = rp.role_id
                 INNER JOIN permission p ON rp.permission_id = p.id
        WHERE ru.user_id = #{userId}
    </select>
</mapper>
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

2:实现satoken的鉴权的接口:

在调用checkRole时候会调用getRoleList,并且检查list里是否有方法需要的角色信息

在调用checkPermission时候会调用getPermissionList，并且检查list里是否有方法需要的角色权限

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271910260.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

方法中的参数:

o:这个参数通常用来代表当前用户的身份或上下文信息。具体来说，它可能是用户对象的引用，例如用户ID或用户的其他特征。这个参数的类型是 `Object`，意味着它可以是任何类型的对象，具体含义依赖于实现的上下文和使用的框架。通常是用户id

s:这个参数经常用于表示额外的上下文信息，例如请求的资源、操作类型或角色名称等。这个字符串的具体含义取决于业务逻辑和应用程序的需求。通常是状态如login

![img](https://i-blog.csdnimg.cn/direct/5eddedff3bc74bada3b8133409bf1cf6.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

注解鉴权:

在接口上添加注解即可：

![img](https://i-blog.csdnimg.cn/direct/bc86de9ff3724af1887325842f6089ac.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

当有多个权限或者角色时候:

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271910910.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

当既有角色又有权限要求时候:

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271910757.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

批量注解:

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271910618.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

添加的注解还可以自定义实现:[自定义注解 (sa-token.cc)](https://sa-token.cc/doc.html#/fun/custom-annotations)

在业务层实现权限校验:[AOP注解鉴权 (sa-token.cc)](https://sa-token.cc/doc.html#/plugin/aop-at)

拦截器鉴权:

```
package com.example.demo.config;

import cn.dev33.satoken.SaManager;
import cn.dev33.satoken.context.SaHolder;
import cn.dev33.satoken.filter.SaServletFilter;
import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.router.SaHttpMethod;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {


    //启用注解模式，并且拦截
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        System.out.println("启用注解模式，并且拦截");
        registry.addInterceptor(new SaInterceptor(handle -> StpUtil.checkLogin()))//相当于在每个接口上都写一个checklogin的注解
                .addPathPatterns("/**")//拦截所有请求
                .excludePathPatterns("/sa/login", "/sa/register","/callback","/gitee/auth");//排除登录注册请求
    }


    
}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

在handle处添加你想要的鉴权方法。

## 扩展：

集成redis：只需要添加相应的依赖，还有配置redis的文件。

集成jwt:添加相应的依赖

再更改一下配置

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271910767.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271911031.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

全局日志输出:

![img](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202502271911328.png)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)编辑

