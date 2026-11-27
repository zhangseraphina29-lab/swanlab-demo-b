# --focus-ring

[返回 Token 目录](../reference/token-catalog.md) · [返回总目录](../README.md)

## 已确定用途

> 角色：柔和焦点环；Token：focus-ring；用途：键盘焦点提示；独立于默认边框，不使用实心深红。

来源：[usage.md · 第 18 行](../sources/color.txt)

## 其他使用规则

## 代码声明记录（不表示已冻结的规范）

<!-- generated:start -->
## 当前代码定义（按样式导入和声明顺序）

- [src/styles/fireworks-tokens.css:77](../../../src/styles/fireworks-tokens.css) · 条件：`:root`
  - 值：`var(--wine-600)`
- [src/styles/fireworks-tokens.css:106](../../../src/styles/fireworks-tokens.css) · 条件：`[data-theme="dark"]`
  - 值：`var(--wine-300)`
- [src/styles/fireworks-neutral-tokens.css:78](../../../src/styles/fireworks-neutral-tokens.css) · 条件：`html[data-palette="neutral-purple"]`
  - 值：`var(--wine-600)`
- [src/styles/fireworks-neutral-tokens.css:107](../../../src/styles/fireworks-neutral-tokens.css) · 条件：`html[data-palette="neutral-purple"][data-theme="dark"]`
  - 值：`var(--wine-300)`
- [src/styles/lucide-theme.css:37](../../../src/styles/lucide-theme.css) · 条件：`html[data-demo="4"][data-palette="magenta"]`
  - 值：`color-mix(in oklch,var(--magenta-500) 35%,transparent)`
- [src/styles/lucide-theme.css:40](../../../src/styles/lucide-theme.css) · 条件：`html[data-demo="4"][data-palette="magenta"][data-theme="dark"]`
  - 值：`color-mix(in oklch,var(--magenta-300) 40%,transparent)`
- [src/styles/fireworks-theme.css:36](../../../src/styles/fireworks-theme.css) · 条件：`html[data-demo="4"],html[data-demo="4"][data-theme="dark"]`
  - 值：`var(--action-primary)`
- [src/styles/fireworks-theme.css:41](../../../src/styles/fireworks-theme.css) · 条件：`html[data-demo="4"][data-theme="dark"]`
  - 值：`var(--brand-text)`

这些是声明记录，并非浏览器计算值；具体元素还受选择器优先级、继承和媒体条件影响。

## 直接引用示例（最多六处）

- [src/styles/lucide-theme.css:5](../../../src/styles/lucide-theme.css)：`--d4-ring: var(--focus-ring)`
- [src/styles/lucide-theme.css:7](../../../src/styles/lucide-theme.css)：`--focus: var(--focus-ring)`
- [src/styles/lucide-theme.css:8](../../../src/styles/lucide-theme.css)：`--sb-color-proposed-focus-strong: var(--focus-ring)`
- [src/styles/lucide-theme.css:8](../../../src/styles/lucide-theme.css)：`--sb-color-raw-focus: var(--focus-ring)`
- [src/styles/lucide-theme.css:14](../../../src/styles/lucide-theme.css)：`outline: 2px solid var(--focus-ring)`
<!-- generated:end -->
