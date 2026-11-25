# 按钮 · Button

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

- 权限组列表的文字操作按钮左右不留内边距；操作之间单独留间隔，删除仍用危险色。来源：用户于 2026-11-25 页面批注。

> - 文字按钮：透明底，hover 加下划线；用于 Alert 操作和表格文字操作。

来源：[demo4-UI规则.md · 第 36 行](../sources/ui.txt)

> - 幽灵按钮：hover 浅灰，不加下划线。主侧栏 hover 例外为浅红，静止选中为中性灰。

来源：[demo4-UI规则.md · 第 37 行](../sources/ui.txt)

> - 危险操作（包括操作菜单里的删除）用 danger-text 红字，不能被 ghost/text 普通文字色覆盖。

来源：[demo4-UI规则.md · 第 38 行](../sources/ui.txt)

> - 默认使用中性灰；一块操作区域通常只放一个实心主按钮。取消、返回等次要操作用中性背景和主文字。

来源：[usage.md · 第 32 行](../sources/color.txt)

> - 主按钮文字统一为 action-text（#FFFFFF），保留 Lucide 主红。浅色文字与该品牌底色的小字号对比低于 WCAG AA，此处按视觉选择使用，不宣称满足正文对比标准。

来源：[usage.md · 第 63 行](../sources/color.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:20](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:27](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:168](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:446](../../../src/styles/demo4-ui.css)
- [src/styles/lucide-theme.css:10](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:11](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:49](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:53](../../../src/styles/lucide-theme.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
