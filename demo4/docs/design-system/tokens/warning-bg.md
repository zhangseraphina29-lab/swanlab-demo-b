# --warning-bg

[返回 Token 目录](../reference/token-catalog.md) · [返回总目录](../README.md)

## 已确定用途

> 角色：警告；Token：warning-text / warning-bg；用途：有风险但可继续、即将到期、需要注意；配警告图标。

来源：[usage.md · 第 23 行](../../../../outputs/lucide-colors/usage.md)

## 其他使用规则

## 代码声明记录（不表示已冻结的规范）

<!-- generated:start -->
## 当前代码定义（按样式导入和声明顺序）

- [src/styles/lucide-tokens.css:81](../../../src/styles/lucide-tokens.css) · 条件：`:root`
  - 值：`var(--warning-50)`
- [src/styles/lucide-tokens.css:108](../../../src/styles/lucide-tokens.css) · 条件：`[data-theme="dark"]`
  - 值：`var(--warning-900)`

这些是声明记录，并非浏览器计算值；具体元素还受选择器优先级、继承和媒体条件影响。

## 直接引用示例（最多六处）

- [src/styles/lucide-theme.css:6](../../../src/styles/lucide-theme.css)：`--d4-warning-bg: var(--warning-bg)`
- [src/styles/lucide-theme.css:6](../../../src/styles/lucide-theme.css)：`--d4-warning-border: color-mix(in oklch,var(--warning-text) 18%,var(--warning-bg))`
- [src/styles/lucide-theme.css:19](../../../src/styles/lucide-theme.css)：`background: var(--warning-bg)`
- [src/styles/auth.css:2](../../../src/styles/auth.css)：`background: radial-gradient(ellipse at 25% 85%,color-mix(in srgb,var(--brand-display) 65%,transparent),transparent 65%),radial-gradient(ellipse at 90% 60%,color-mix(in srgb,var(--warning-bg) 75%,transparent),transparent 70%),var(--brand-soft)`
<!-- generated:end -->
