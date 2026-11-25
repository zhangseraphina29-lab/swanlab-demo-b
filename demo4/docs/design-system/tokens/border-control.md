# --border-control

[返回 Token 目录](../reference/token-catalog.md) · [返回总目录](../README.md)

## 已确定用途

> 角色：控件边框；Token：border-control；用途：输入框、下拉框、复选框的默认浅灰边界；只略强于分割线，不使用文字灰作为常态描边。

来源：[usage.md · 第 11 行](../sources/color.txt)

## 其他使用规则

## 代码声明记录（不表示已冻结的规范）

<!-- generated:start -->
## 当前代码定义（按样式导入和声明顺序）

- [src/styles/fireworks-tokens.css:66](../../../src/styles/fireworks-tokens.css) · 条件：`:root`
  - 值：`var(--neutral-600)`
- [src/styles/fireworks-tokens.css:95](../../../src/styles/fireworks-tokens.css) · 条件：`[data-theme="dark"]`
  - 值：`var(--neutral-500)`
- [src/styles/fireworks-neutral-tokens.css:67](../../../src/styles/fireworks-neutral-tokens.css) · 条件：`html[data-palette="neutral-purple"]`
  - 值：`var(--neutral-600)`
- [src/styles/fireworks-neutral-tokens.css:96](../../../src/styles/fireworks-neutral-tokens.css) · 条件：`html[data-palette="neutral-purple"][data-theme="dark"]`
  - 值：`var(--neutral-500)`
- [src/styles/fireworks-theme.css:15](../../../src/styles/fireworks-theme.css) · 条件：`html[data-demo="4"]`
  - 值：`var(--neutral-400)`
- [src/styles/fireworks-theme.css:16](../../../src/styles/fireworks-theme.css) · 条件：`html[data-demo="4"][data-theme="dark"]`
  - 值：`var(--neutral-700)`

这些是声明记录，并非浏览器计算值；具体元素还受选择器优先级、继承和媒体条件影响。

## 直接引用示例（最多六处）

- [src/styles/lucide-theme.css:4](../../../src/styles/lucide-theme.css)：`--d4-input: var(--border-control)`
- [src/styles/lucide-theme.css:4](../../../src/styles/lucide-theme.css)：`--d4-hover-border: var(--border-control)`
- [src/styles/auth.css:49](../../../src/styles/auth.css)：`--particle-guide: var(--border-control)`
- [src/styles/pricing.css:8](../../../src/styles/pricing.css)：`border: 1px solid var(--border-control)`
<!-- generated:end -->
