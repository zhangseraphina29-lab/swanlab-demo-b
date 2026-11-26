# 开关 · Switch

[返回总目录](../README.md)

## 已确定规则

来源：用户于 2026-11-26 要求在「最近更新设置」弹窗提供「优先展示我参与的」开关，默认开启。

## 样式与规格

实现记录：[概览样式](../../../src/styles/organization-overview.css) 中 `.recent-switch` 为 36×20px，内边距 2px，圆形滑块 16px；开启背景 `--brand-text`，关闭背景 `--text-tertiary`，滑块 `--bg-canvas`。标签与开关横向排列，两套主题使用相同语义 Token。

## 使用规则

当前仅用于最近更新偏好，切换立即生效并保存到当前演示账号。原生 button 设置 `role="switch"`、`aria-checked` 和关联标签，支持点击及键盘 Space / Enter；切换保留焦点，沿用按钮焦点环。没有独立导出的 React 开关 API。

## 示例

[最近更新偏好](../patterns/organization-overview.md)，源码：[弹窗与事件](../../../src/controller.js)。
