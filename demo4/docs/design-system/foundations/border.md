# 边框 · Border

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-26 指定搜索框聚焦描边例外：`1px solid #594DB9`，未聚焦仍为全局 `0.5px`。

最新用户要求（2026-11-26）：全站 CSS border 宽度统一为 `0.5px`，通过 `--border-width` 应用于元素及伪元素，覆盖下方历史 1px 规则。无边框样式（border-style: none）保持不可见；outline 焦点环、SVG 图标描边不属于 CSS border。

> - 边框保持轻量：卡片和分组使用 border-subtle；可交互控件使用 border-control。默认 1px，不将 text-secondary 或更深文字色用作组件描边，也不因 hover 大幅加深。通过标签、背景和焦点环共同表达可交互性。

来源：[usage.md · 第 42 行](../sources/color.txt)

> - 全局搜索、FREE 标签及右侧资源图标使用同一 border token、1px 描边；FREE 透明底。

来源：[demo4-UI规则.md · 第 74 行](../sources/ui.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/lucide-theme.css:12](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:17](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:31](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:45](../../../src/styles/lucide-theme.css)
- [src/styles/demo4-ui.css:29](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:37](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:582](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:651](../../../src/styles/demo4-ui.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)

用户于 2026-11-25 指定：输入框、下拉选择器等控件默认边框调浅。实现记录：两套紫色主题的 border-control 浅色从 neutral-600 调整为 neutral-400；深色从 neutral-500 调整为 neutral-700，使轮廓在对应背景下更柔和。通过 fireworks-theme.css 覆盖语义映射，保留原始色阶；聚焦 focus-ring、错误 danger-text 保持独立。
