# 动效 · Motion

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

> 动效用于说明状态变化、层级关系和交互反馈。默认轻量、快速、可中断；不改变页面功能和信息架构。

来源：[demo4-motion-guidelines.md · 第 4 行](../../../../../设计系统搭建/demo4-motion-guidelines.md)

> - 已撤回内容 reveal：页面刷新、搜索、筛选和一级导航切换均不额外上移/淡入内容。

来源：[demo4-motion-guidelines.md · 第 8 行](../../../../../设计系统搭建/demo4-motion-guidelines.md)

> 所有动效必须响应 `prefers-reduced-motion: reduce`：取消动画和过渡，保留最终状态和焦点反馈。

来源：[demo4-motion-guidelines.md · 第 38 行](../../../../../设计系统搭建/demo4-motion-guidelines.md)

> - 所有 `.tabs` 使用单条 2px 中性下划线，220ms cubic-bezier(.65,0,.35,1)，从当前显示位置移动至目标；只动画 transform，首次渲染不播放。

来源：[demo4-motion-guidelines.md · 第 42 行](../../../../../设计系统搭建/demo4-motion-guidelines.md)

> - 展开时旋转约 180°，缓动使用 `cubic-bezier(.22,1,.36,1)`，约 220ms。

来源：[demo4-motion-guidelines.md · 第 29 行](../../../../../设计系统搭建/demo4-motion-guidelines.md)

> - 省略号点击不旋转；展开箭头默认向下、展开向上，收起时翻回，约 220ms；点击空白同步收起。

来源：[demo4-motion-guidelines.md · 第 48 行](../../../../../设计系统搭建/demo4-motion-guidelines.md)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:25](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:98](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:668](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:674](../../../src/styles/demo4-ui.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
