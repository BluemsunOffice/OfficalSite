---
title: NGINX 常用命令
date: 2025-03-12
image: /img/blog_pic/nginx.png
draft: false
featured: true
author: 丰浩
categories: ["后端"]
weight: 1
description: 简单讲解一下Nginx的命令及其作用
---

# NGINX 常用命令：从基础到底层原理的全景指南

NGINX 是目前全球最受欢迎的高性能 Web 服务器和反向代理服务器之一。无论你是前端开发、后端开发还是运维工程师，掌握 NGINX 的常用命令都是日常工作中的必修课。

很多新手在使用 NGINX 时，往往只会背一个 `nginx -s reload`。但实际在生产环境中，处理多实例运行、日志切割、性能监控、Docker 容器部署等场景时，你需要掌握更全面的命令体系。

本文将为你详细梳理 NGINX 的常用命令，并结合底层原理与实际业务场景，帮你快速建立完整的 NGINX 操作与排障体系。

---

## 🧠 前置知识：NGINX 的 Master-Worker 架构

在学习命令之前，非常有必要了解 NGINX 的进程模型。当你启动 NGINX 后，它通常会在后台运行两种进程：

1. **Master（主进程）**：只有一个。负责读取和验证配置文件、管理工作进程、接收我们在命令行发送的 `-s` 信号。
2. **Worker（工作进程）**：通常有多个（数量一般与 CPU 核心数一致）。真正负责处理客户端的网络请求。

> **⚠️ 核心理解**：我们输入的所有 `nginx -s` 信号，其实都是发送给 **Master 进程**的，再由 Master 进程去调度 Worker 进程完成平滑过渡。

---

## 一、 基础与进阶服务控制（启停与重载）

控制 NGINX 服务状态通常有两种方式：**NGINX 原生命令（信号控制）** 和 **系统服务管理命令（Systemd）**。

### 1. NGINX 原生信号控制（`-s` 信号）

`-s` 代表 signal（信号），用于向正在运行的 NGINX Master 进程发送控制指令。

* **启动 NGINX**
  
  ```bash
  nginx
  ```
  
  *(注意：原生 NGINX 没有 `nginx -s start` 这个命令，直接输入 `nginx` 即可启动守护进程。)*

* **快速停止 NGINX（强杀）**
  
  ```bash
  nginx -s stop
  ```
  
  > **说明**：立即强制终止所有 NGINX 进程。如果 Worker 进程正在处理用户请求，请求会被强制中断，**生产环境慎用**！

* **优雅停止 NGINX（推荐）**
  
  ```bash
  nginx -s quit
  ```
  
  > **说明**：Master 进程接收到此信号后，不再接收新请求，并通知 Worker 进程把当前正在处理的请求处理完毕后，再安全退出。

* **平滑重载配置**
  
  ```bash
  nginx -s reload
  ```
  
  > **原理说明**：修改 `nginx.conf` 后无需重启！Master 进程会先检查新配置语法，通过后启动一批新的 Worker 进程处理新请求；同时通知旧的 Worker 进程不要再接客，等手头上的活干完就自杀。真正做到**零停机更新**。

### 2. 高级启动参数（`-g` 与 `-p`）

在 Docker 容器化部署或单机多实例部署时，这几个参数极其重要：

* **指定运行目录（`-p` 参数）**
  
  ```bash
  nginx -p /usr/local/nginx/app1/
  ```
  
  > **说明**：设置 NGINX 的全局前缀路径。常用于一台服务器运行多个 NGINX 实例，相互隔离。

* **在命令行注入全局配置**
  
  ```bash
  nginx -g "daemon off;"
  ```
  
  > **说明**：覆盖 `nginx.conf` 中的配置。上面这条命令在 Docker 制作 NGINX 镜像时必用，它强制 NGINX 在前台运行（而不是作为守护进程），否则 Docker 容器一启动就会立刻退出。

### 3. 使用 Systemd 管理（现代 Linux 推荐做法）

如果你是通过 `yum` (CentOS) 或 `apt` (Ubuntu) 安装的 NGINX，强烈推荐使用系统的 `systemctl` 命令：

```bash
systemctl start nginx    # 启动
systemctl stop nginx     # 停止
systemctl restart nginx  # 重启
systemctl reload nginx   # 平滑重载
systemctl status nginx   # 查看运行状态及报错信息
systemctl enable nginx   # 设置开机自启动（运维必备）
```

---

## 二、 配置文件管理与测试

配置文件（通常是 `nginx.conf`）是 NGINX 的灵魂。在修改配置后，**第一步永远是测试语法，而不是直接重载！**

* **检查配置文件语法**
  
  ```bash
  nginx -t
  ```
  
  > **说明**：解析配置文件并检查语法错误。如果配置正确，会输出 `syntax is ok` 和 `test is successful`。如果有错，它会精准提示你在第几行少加了分号（`;`）或大括号匹配错误。

* **检查并打印完整配置**
  
  ```bash
  nginx -T
  ```
  
  > **说明**：大写 `T`。除了测试语法，它还会把最终合并后的所有配置内容打印到屏幕上。如果你的 NGINX 配置了数十个 `include conf.d/*.conf;`，用它排查配置究竟有没有生效非常有用。

* **指定配置文件启动**
  
  ```bash
  nginx -c /path/to/custom_nginx.conf
  ```
  
  > **说明**：覆盖默认读取路径（默认通常是 `/etc/nginx/nginx.conf`）。

---

## 三、 排障必备：进程与端口查看

很多时候服务起不来，不是配置有问题，而是端口被占用或进程卡死了。你需要结合 Linux 原生命令进行排查：

* **查看 NGINX 进程状态**
  
  ```bash
  ps -ef | grep nginx
  ```
  
  > **实战意义**：你可以清晰地看到 1 个 root 运行的 master 进程和多个 nobody/nginx 运行的 worker 进程。

* **查看 NGINX 监听的端口号**
  
  ```bash
  netstat -tulnp | grep nginx
  # 或者现代 Linux 系统推荐使用：
  ss -tulnp | grep nginx
  ```
  
  > **实战意义**：如果启动失败提示 `Address already in use`，可以用此命令查看 80 或 443 端口被哪个内鬼应用占用了。

---

## 四、 版本、模块与底层参数查看

接手一台陌生的服务器，你需要知道当前的 NGINX 支持哪些功能？或者是否编译了 SSL、HTTP2 模块？

* **极简查看版本号**
  
  ```bash
  nginx -v
  ```
  
  > *输出示例：`nginx version: nginx/1.24.0`*

* **查看详细编译参数及模块**
  
  ```bash
  nginx -V
  ```
  
  > **实战意义**：大写 `V`。它不仅显示版本号，还会详细列出该 NGINX 编译时加载的所有模块（`--with-` 开头的参数，例如看到 `--with-http_ssl_module` 就代表支持 HTTPS，看到 `--conf-path=` 可以知道配置文件的默认安装路径）。

---

## 五、 日志管理与实战分析

NGINX 的访问日志（Access Log）和错误日志（Error Log）是排查线上问题的金矿。

### 1. NGINX 原生日志切割命令

* **重新打开日志文件**
  
  ```bash
  nginx -s reopen
  ```
  
  > **实战场景**：日志太大怎么办？你可以结合 Shell 脚本，先把旧日志重命名（`mv access.log access-20231024.log`），但此时 NGINX 依然会往旧文件写数据。执行 `nginx -s reopen` 后，NGINX 会立刻生成一个全新的 `access.log` 并开始写入，这就是实现**日志轮转切割**的底层原理。

### 2. 结合 Linux 命令的日常巡检

* **实时滚动查看最新访问日志**
  
  ```bash
  tail -f /var/log/nginx/access.log
  ```

* **统计访问量最高的前 10 个 IP（日志分析实战）**
  
  ```bash
  awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10
  ```

---

## 六、 NGINX 性能监视与指标解读

要知道 NGINX 到底扛着多少并发，需要开启内置的 `http_stub_status_module` 模块。

### 第 1 步：配置性能监控面板

打开 `nginx.conf`，在 `server` 块中添加：

```nginx
location /nginx_status {
    stub_status on;
    access_log off;       # 监控接口不记录日志，避免日志狂刷
    allow 127.0.0.1;      # 强烈建议：为了安全，只允许内网或特定 IP 访问
    deny all;
}
```

### 第 2 步：重载配置

```bash
nginx -t && nginx -s reload
```

### 第 3 步：查看性能指标

在命令行运行：

```bash
curl http://127.0.0.1/nginx_status
```

**输出内容深度解读：**

```text
Active connections: 291 
server accepts handled requests
 16630948 16630948 31070465 
Reading: 6 Writing: 179 Waiting: 106 
```

* **Active connections**：当前 NGINX 正在处理的活动连接总数（包含处于 Waiting 状态的）。
* **accepts / handled / requests**：自 NGINX 启动以来，共接收了 16630948 个连接，成功处理了 16630948 个连接，并处理了 31070465 个请求（通常请求数大于连接数，因为启用了 HTTP Keep-Alive 长连接）。
* **Reading**：NGINX 正在读取客户端请求头的数量（一般很小）。
* **Writing**：NGINX 正在处理请求或向客户端发送响应数据的数量。
* **Waiting**：开启了 Keep-Alive 下，已经处理完请求，正在空闲等待下一次请求的连接数。
