# Common Components 文档

## 概述

`src/components/common` 文件夹包含可复用的基础 UI 组件，这些组件遵循统一的设计系统，确保整个项目的样式一致性。

## 可用组件

### 1. Input（输入框）

基础文本输入框，支持各种输入类型，并支持添加前后缀（如图标）。

**使用方式：**

```astro
import { Input } from "../common/index";

<!-- 基础用法 -->
<Input
  name="email"
  placeholder="请输入邮箱"
  type="email"
  required
/>

<!-- 带前缀图标 -->
<Input name="email" placeholder="邮箱" required>
  <i slot="prefix" class="fa-solid fa-envelope text-brand-500"></i>
</Input>

<!-- 带前后缀 -->
<Input name="search" placeholder="搜索" type="search">
  <i slot="prefix" class="fa-solid fa-magnifying-glass text-brand-500"></i>
  <button slot="suffix" type="button" class="text-ink-500 hover:text-brand-500">
    <i class="fa-solid fa-xmark"></i>
  </button>
</Input>
```

**Props:**

- `name`: string - 表单字段名称
- `placeholder`: string - 占位符文字
- `type`: InputType - 输入类型（默认：text），支持 text, email, password, number, tel, url, search, date, time, datetime-local, month, week, color, file, hidden
- `value`: string - 初始值
- `required`: boolean - 是否必填
- `disabled`: boolean - 是否禁用
- `id`: string - 元素 ID
- `class`: string - 额外的 CSS 类

**Slots:**

- `prefix` - 输入框前缀（通常用于图标）
- `suffix` - 输入框后缀（通常用于图标或清空按钮）

---

### 2. Select（下拉框）

下拉选择框，支持多个选项，并支持添加前缀图标。

**使用方式：**

```astro
import { Select } from "../common/index";

<!-- 基础用法 -->
<Select name="major" required placeholder="选择专业">
  <option value="0">计算机类</option>
  <option value="1">其他专业</option>
</Select>

<!-- 带前缀图标 -->
<Select name="department" required placeholder="选择部门">
  <i slot="prefix" class="fa-solid fa-briefcase text-brand-500"></i>
  <option value="frontend">前端</option>
  <option value="backend">后端</option>
</Select>
```

**Props:**

- `name`: string - 表单字段名称
- `placeholder`: string - 占位符文字
- `required`: boolean - 是否必填
- `disabled`: boolean - 是否禁用
- `id`: string - 元素 ID
- `class`: string - 额外的 CSS 类

**Slots:**

- `prefix` - 下拉框前缀（通常用于图标）
- `suffix` - 下拉框后缀

---

### 3. Textarea（多行文本框）

多行文本输入框，支持添加前后缀（如图标）。

**使用方式：**

```astro
import { Textarea } from "../common/index";

<!-- 基础用法 -->
<Textarea
  name="description"
  placeholder="请输入描述"
  rows={4}
  required
/>

<!-- 带前缀图标 -->
<Textarea name="bio" placeholder="个人介绍" rows={4}>
  <i slot="prefix" class="fa-solid fa-pen text-brand-500"></i>
</Textarea>
```

**Props:**

- `name`: string - 表单字段名称
- `placeholder`: string - 占位符文字
- `value`: string - 初始值
- `required`: boolean - 是否必填
- `disabled`: boolean - 是否禁用
- `rows`: number - 行数（默认：4）
- `id`: string - 元素 ID
- `class`: string - 额外的 CSS 类

**Slots:**

- `prefix` - 多行框顶部前缀（通常用于图标）
- `suffix` - 多行框底部后缀（通常用于字数统计）

---

### 4. Button（按钮）

交互式按钮，支持多种样式。

**使用方式：**

```astro
import { Button } from "../common/index";

<Button type="submit" variant="primary">提交</Button>
<Button type="button" variant="secondary">取消</Button>
<Button type="button" variant="outline">了解更多</Button>
```

**Props:**

- `type`: "button" | "submit" | "reset" - 按钮类型（默认：button）
- `variant`: "primary" | "secondary" | "outline" - 样式变体（默认：primary）
- `disabled`: boolean - 是否禁用
- `id`: string - 元素 ID
- `class`: string - 额外的 CSS 类

**Variants:**

- `primary` - 蓝色主色按钮（CTA）
- `secondary` - 浅色辅助按钮
- `outline` - 边框样式按钮

---

### 5. Label（标签）

表单标签，用于标注表单字段。

**使用方式：**

```astro
import { Label } from "../common/index";

<Label for="name" required>姓名</Label>
<Input id="name" name="name" placeholder="请输入姓名" />
```

**Props:**

- `for`: string - 关联的表单元素 ID
- `required`: boolean - 是否显示必填标记
- `class`: string - 额外的 CSS 类

---

### 6. FileUpload（文件上传）

文件上传组件。

**使用方式：**

```astro
import { FileUpload } from "../common/index";

<FileUpload
  id="profile-photo"
  name="photo"
  label="选择照片"
  accept="image/png, image/jpeg"
/>
<span id="file-name">请选择文件</span>
```

**Props:**

- `id`: string - 元素 ID
- `name`: string - 表单字段名称
- `accept`: string - 接受的文件类型
- `label`: string - 按钮标签文字
- `required`: boolean - 是否必填
- `disabled`: boolean - 是否禁用
- `multiple`: boolean - 是否多选
- `class`: string - 额外的 CSS 类

---

### 7. Link（链接）

多功能链接组件，支持按钮样式。

**使用方式：**

```astro
import { Link } from "../common/index";

<!-- 文本链接 -->
<Link href="/about">关于我们</Link>

<!-- 主要操作按钮 -->
<Link href="/join" variant="primary">立即加入</Link>

<!-- 次要操作按钮 -->
<Link href="/blog" variant="secondary">浏览博客</Link>

<!-- 轮廓按钮 -->
<Link href="https://github.com" target="_blank" variant="outline">GitHub</Link>
```

**Props:**

- `href`: string - 链接地址（必填）
- `variant`: "default" | "primary" | "secondary" | "outline" - 样式变体（默认：default）
- `target`: string - 打开方式（如 "\_blank"）
- `rel`: string - 链接关系（如 "noreferrer"）
- `class`: string - 额外的 CSS 类

**Variants:**

- `default` - 普通文本链接
- `primary` - 主色操作按钮
- `secondary` - 辅助操作按钮
- `outline` - 边框样式按钮

---

## 设计系统

所有组件都遵循统一的设计系统：

### 颜色

- 主色：`#0a66f5`（brand-500）
- 深色：`#0f172a`（ink-900）
- 浅灰：`#f7faff`（bg）

### 边框和圆角

- 默认圆角：`rounded-lg`（8px）
- 边框颜色：`border-blue-300`
- 焦点环颜色：`ring-brand-200`

### 间距

- 水平内边距：`px-3`
- 竖直内边距：`py-2.5`
- 字体大小：`text-sm`

### 交互效果

- 焦点状态：`focus:border-blue-400 focus:ring-2`
- 悬停效果：`hover:bg-brand-700`（按钮）
- 过渡动画：`transition`

---

## 使用示例

### 完整的表单示例

```astro
---
import { Input, Select, Textarea, Button, Label, FileUpload } from "../common/index";
---

<form>
  <div>
    <Label for="name" required>姓名</Label>
    <Input id="name" name="name" placeholder="请输入姓名" required>
      <i slot="prefix" class="fa-solid fa-user text-brand-500"></i>
    </Input>
  </div>

  <div>
    <Label for="major" required>专业</Label>
    <Select id="major" name="major" placeholder="选择专业" required>
      <i slot="prefix" class="fa-solid fa-book text-brand-500"></i>
      <option value="cs">计算机类</option>
      <option value="other">其他</option>
    </Select>
  </div>

  <div>
    <Label for="email" required>邮箱</Label>
    <Input
      id="email"
      name="email"
      type="email"
      placeholder="请输入邮箱"
      required
    >
      <i slot="prefix" class="fa-solid fa-envelope text-brand-500"></i>
    </Input>
  </div>

  <div>
    <Label for="intro" required>个人介绍</Label>
    <Textarea id="intro" name="intro" placeholder="请输入介绍" rows={4} required>
      <i slot="prefix" class="fa-solid fa-pen text-brand-500"></i>
    </Textarea>
  </div>

  <div>
    <FileUpload id="photo" name="photo" label="上传照片" />
  </div>

  <Button type="submit" variant="primary">提交</Button>
  <Button type="reset" variant="secondary">重置</Button>
</form>
```

---

## 已集成组件的位置

以下组件已在项目中使用新的 common 组件，并带有图标前缀：

1. **JoinFormSection.astro** - 表单组件使用 Input, Select, Textarea, Button, FileUpload，均带有对应的 Font Awesome 图标前缀
   - 姓名: `fa-user`
   - 学号: `fa-id-card`
   - 专业: `fa-book`
   - 性别: `fa-person`
   - 部门: `fa-briefcase`
   - 邮箱: `fa-envelope`
   - 电话: `fa-phone`
   - 个人介绍: `fa-pen`

2. **CtaSection.astro** - 使用 Link 组件作为主要操作按钮
3. **HeroSection.astro** - 使用 Link 组件作为行动号召
4. **Header.astro** - 导航链接使用 Link 组件

---

## Icon 前缀最佳实践

在使用 `prefix` 或 `suffix` slot 时，建议：

1. **使用 Font Awesome 图标** - 确保项目已加载 Font Awesome CDN 或本地资源
2. **添加颜色类** - 使用 `text-brand-500` 或其他品牌色保持一致性
3. **可访问性** - 对于纯装饰性图标，不需要额外的 aria 标签
4. **间距管理** - 利用容器的 gap 属性自动管理间距

```astro
<!-- ✅ 推荐 -->
<Input name="search" placeholder="搜索">
  <i slot="prefix" class="fa-solid fa-magnifying-glass text-brand-500"></i>
</Input>

<!-- ❌ 避免 -->
<Input name="search" placeholder="搜索" class="pl-10">
  <!-- 不要手动调整 padding，容器已处理 -->
</Input>
```

---

## 样式自定义

所有组件都支持通过 `class` prop 传入额外的 CSS 类来自定义样式：

```astro
<Input
  name="email"
  placeholder="邮箱"
  class="w-full"
/>
```

---

## 维护建议

1. **保持一致性** - 新增表单元素时，优先使用 common 组件
2. **扩展而非修改** - 如需新样式，增加 variant 而不是修改现有样式
3. **颜色系统** - 始终使用 Tailwind 主题中定义的颜色变量
4. **文档更新** - 新增组件时更新本文档
