# 单行输入 · Input

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

> 其他正文、菜单、表单、标题字号沿用原组件 CSS。不得把表单输入、说明文字及菜单项一律改成工具栏的 12px。

来源：[demo4-UI规则.md · 第 24 行](../sources/ui.txt)

> - 输入框错误时采用 danger-text 边框，字段下方提供具体错误原因；聚焦时保留独立 focus-ring。

来源：[usage.md · 第 36 行](../sources/color.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:5](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:13](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:486](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:492](../../../src/styles/demo4-ui.css)
- [src/styles/lucide-theme.css:4](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:14](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:25](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:27](../../../src/styles/lucide-theme.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)

用户于 2026-11-25 指定：输入框、下拉选择器等控件默认边框调浅。实现记录：两套紫色主题的 border-control 浅色从 neutral-600 调整为 neutral-400；深色从 neutral-500 调整为 neutral-700，使轮廓在对应背景下更柔和。通过 fireworks-theme.css 覆盖语义映射，保留原始色阶；聚焦 focus-ring、错误 danger-text 保持独立。
