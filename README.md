# Bluemsun Site (Astro + Bun)

蓝旭官网使用 Astro + TOML 页面编排，日常维护入口固定为三类：

1. 全站配置：`src/config/site.ts`
2. 页面编排：`src/config/pages/*.toml`
3. 内容目录：`src/content/blog/**`（同理可维护 `news` / `projects`）

## 技术栈

- 包管理：`bun`
- 框架：`astro`
- 样式：`tailwindcss`（蓝白主题基线）
- 动效：`react` + `motion`（局部 islands）
- 配置解析：`smol-toml` + `zod`

## 目录结构

```text
src/
  config/
    site.ts
    pages/*.toml
  content/
    blog/
    news/
    projects/
  components/
    composition/PageComposer.astro
    motion/*.tsx
    sections/*.astro
  lib/
    page-composition.ts
    collections.ts
```

## 页面编排亮点

- TOML section 组合渲染
- 支持 `gallery` 照片墙 section
- `collectionPreview` 支持首页筛选：`homepageOnly = true`

## 内容字段（新增）

在 `src/content.config.ts` 中，`blog/news/projects` 统一支持：

- `homepage: boolean`：是否出现在首页聚合区
- `sticky: number`：首页聚合优先级（越小越靠前）

排序规则：`sticky` 升序 -> `date` 降序。

## 性能策略

- 首屏保持 Astro 静态渲染
- 动效组件采用局部 hydration（`client:idle` / `client:visible`）
- 照片墙图片默认懒加载（`loading="lazy"`）
- 建议将图片压缩后放入 `public/images/`

## 开发命令

```bash
bun install
bun run dev
bun run check
bun run build
```

## 迁移文档

- 页面编排：`docs/page-composition.md`
- 内容迁移：`docs/content-migration.md`
- 资源迁移：`docs/asset-migration.md`
