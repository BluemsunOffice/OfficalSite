---
title: "蓝旭官网或将移除jQuery"
date: 2022-02-20
image: "/img/news_pic/news.jpg"
draft: false
featured: true
weight: 100
description: "蓝旭官网或将移除jQuery"
---

##  
##
其实官网的开发是经过了多次的迭代的，当前版本是3.0.1



版本1的时候，开发是采用很老的手段，框架方面的选择是jquery和bootstrap，用户体验很不好，并且代码的可读性也很差，就有了版本2，版本2主要采用的技术包括webpack，es6，jquery等，ui和用户体验有了极大的提升，但是因为当时的开发人（Okabe）是边学边做，导致不少的问题，难以解决，代码非常的难读，并且在webpack的使用上也存在纰漏。痛定思痛，为了给大家留下好的产品，BluemSun3.0诞生了，但是！！！！有一个问题其实在1.0版本就遗留下了，就是框架jquery的问题![image-20250301161236063](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202503011612201.png)，并不是说jquery不好，而是在我们代码中，jquery用到的部分是远远小于它实际的部分的，也就是说有大量废弃的代码，![image-20250301161306792](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202503011613853.png)其实用到的模块无非就是最最简单的dom查询，简单到可以用原生无痛开发，还有ajax模块，所以，我决心在下次迭代中，废弃jquery，该用我自己开发的包，这个包采用和jquery相似的用法，用适配器模式调整老代码与新代码的关系，将包含简单的dom查询和ajax模块![image-20250301161324834](https://vichywhite.oss-cn-beijing.aliyuncs.com/zlz2023012957/202503011613876.png)

