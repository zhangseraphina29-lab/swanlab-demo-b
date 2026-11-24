# 无障碍 · Accessibility

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

> 4. 普通文字对比度至少 4.5:1，大文字至少 3:1；必要控件边界与状态提示目标至少 3:1；状态不只依赖颜色。键盘与焦点规则明确，设计检查与实现验收分开记录。

来源：[结论.md · 第 43 行](../../../../Project改版/版本记录/V0.3.1_设计目标与边界/结论.md)

> - 主按钮文字统一为 action-text（#FFFFFF），保留 Lucide 主红。浅色文字与该品牌底色的小字号对比低于 WCAG AA，此处按视觉选择使用，不宣称满足正文对比标准。

来源：[usage.md · 第 63 行](../../../../outputs/lucide-colors/usage.md)

> 所有动效必须响应 `prefers-reduced-motion: reduce`：取消动画和过渡，保留最终状态和焦点反馈。

来源：[demo4-motion-guidelines.md · 第 38 行](../../../../../设计系统搭建/demo4-motion-guidelines.md)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/lucide-theme.css:14](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:84](../../../src/styles/lucide-theme.css)
- [src/styles/foundations.css:22](../../../src/styles/foundations.css)
- [src/styles/foundations.css:37](../../../src/styles/foundations.css)
- [src/styles/foundations.css:83](../../../src/styles/foundations.css)
- [src/styles/foundations.css:114](../../../src/styles/foundations.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
