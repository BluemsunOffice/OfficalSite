# Bluemsun Site (Astro + Bun)

蓝旭工作室官网项目，采用 **Astro + 内容集合 + TOML 页面编排**。
当前站点包含首页、关于、报名、博客、新闻、项目模块，支持 Markdown 内容发布与静态构建。

## TODO 列表：

- [x] 列表页增加布局切换（每行 1/2/4 列，可记忆用户选择）
- [x] 收集报名表单组件调整。
- [ ] 优化文章封面展示（统一比例、兜底图、列表/详情图策略一致）
- [ ] 优化文章代码块主题（语法高亮 + 深浅色方案）
- [ ] 全站文案与间距节奏优化（标题、副标题、按钮、空态）
- [ ] 丰富关于页内容，并在报名页增加技术栈跳转入口

- [ ] 接入评论系统（先第三方托管方案，后续可切自建）
- [ ] 新增匿名吐槽/问题收集页（轻反馈入口）
- [ ] 报名页增加“常见问题 / 团队技术栈”联动说明
- [ ] 内容详情页增加相关推荐与互动引导（点赞、分享、评论）

- [ ] 设计投稿系统 MVP（前台投稿 + 后台审核流）
- [ ] 梳理后端需求：鉴权、草稿、审核状态、通知
- [ ] 将投稿系统拆分为独立服务或独立项目（与官网解耦）
- [ ] 为内容实体补充 SEO 与统计字段（阅读量、推荐位、来源）

## 快速开始

### 环境要求

- Node.js `>= 22.12.0`
- Bun `1.3.11+`

### 安装与开发

```bash
bun install
bun run dev
```

### 检查与构建

```bash
bun run check
bun run build
bun run preview
```

## 环境变量

参考 `.env.example`：

```env
PUBLIC_JOIN_FORM_ENDPOINT=https://example.com/form-endpoint
```

`JoinFormSection` 会优先读取 `PUBLIC_JOIN_FORM_ENDPOINT`，未配置时回退到组件内默认提交地址。

## 项目结构（与当前 src 对齐）

```text
src/
  components/
    cards/                 # 内容卡片
    common/                # 表单通用组件（Input/Select/Modal 等）
    composition/           # 页面编排入口（PageComposer）
    content/               # 内容列表与文章容器
    motion/                # React + motion 动效 islands
    sections/              # 各类页面 section
    ui/                    # Header/Footer/SurfaceCard 等基础 UI
  config/
    site.ts                # 站点信息、导航、主题色
    pages/*.toml           # 页面编排配置（home/about/join）
  content/
    blog/                  # 博客 Markdown
    news/                  # 新闻 Markdown
    projects/              # 项目 Markdown
  layouts/
    MainLayout.astro       # 全站布局
  lib/
    collections.ts         # 内容读取、过滤、排序
    page-composition.ts    # TOML 解析 + schema 校验
  pages/
    index.astro
    about.astro
    join.astro
    blog/**
    news/**
    projects/**
  styles/
    global.css             # Tailwind v4 + 全局样式
```

## 页面编排机制

- 页面入口：`src/pages/index.astro` / `about.astro` / `join.astro`
- 页面配置：`src/config/pages/*.toml`
- 解析与校验：`src/lib/page-composition.ts`（`smol-toml` + `zod`）
- 渲染分发：`src/components/composition/PageComposer.astro`

当前支持 section 类型：

- `hero`
- `featureGrid`
- `stats`
- `collectionPreview`
- `gallery`
- `richText`
- `joinForm`
- `cta`

## 内容系统

`src/content.config.ts` 中定义了 `blog/news/projects` 三个集合，共享基础字段：

- `title`
- `description?`
- `date`
- `updated?`
- `author?`
- `image?`
- `tags[]`
- `categories[]`
- `homepage`（是否可进入首页聚合）
- `sticky`（置顶优先级，越小越靠前）
- `featured`
- `draft`

额外字段：

- `blog`: `series?`
- `projects`: `repo?` `demo?` `stack[]`

排序逻辑（`src/lib/collections.ts`）：

1. `sticky` 升序
2. `date` 降序

并且在生产环境自动过滤 `draft: true`。

## 已有能力摘要

- Astro 静态构建输出
- 基于内容集合的博客/新闻/项目列表与详情页
- 标签与分类路由（博客）
- 页面 section 的配置化编排
- 报名表单（图片上传、前端校验、提交状态反馈）
- 局部动效 islands（React + motion）

## 维护入口

日常维护主要集中在三处：

1. `src/config/site.ts`：站点标题、导航、主题信息
2. `src/config/pages/*.toml`：页面区块结构与文案
3. `src/content/**`：博客/新闻/项目内容维护
