# 标签页 · Tabs

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

> - 所有 `.tabs` 使用单条 2px 中性下划线，220ms cubic-bezier(.65,0,.35,1)，从当前显示位置移动至目标；只动画 transform，首次渲染不播放。

来源：[demo4-motion-guidelines.md · 第 42 行](../sources/motion.txt)

> - 减少动态效果时直接定位；内容和设置侧栏保持静止。

来源：[demo4-motion-guidelines.md · 第 43 行](../sources/motion.txt)

> - Tab 容器隐藏滚动条且禁用垂直溢出；横向溢出仍可滚动，滑动下划线保留。

来源：[demo4-UI规则.md · 第 75 行](../sources/ui.txt)

用户于 2026-11-27 指定：成员管理的状态标签（已加入、待邀请、已禁用、旧有协作者）不使用矩形背景填充，包括选中与 hover；保留文字、数量徽标和滑动下划线。

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:77](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:78](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:202](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:207](../../../src/styles/demo4-ui.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
