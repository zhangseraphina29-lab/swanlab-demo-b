# 尺寸与密度 · Sizing & Density

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-26 追加要求：所有项目页工具栏每个控件宽度增加 4px。搜索框桌面最大宽度 300→304px、flex-basis 200→204px；筛选、排序和创建按钮水平内边距两侧各增加 2px；视图切换每个按钮宽度 26→30px。高度仍为 30px，内容垂直居中，窄屏保留弹性收缩。

用户于 2026-11-26 通过项目搜索框批注指定：所有项目页工具栏这一排组件高度从 26px 增加 4px 至 30px，包括搜索、筛选、排序、视图切换、创建项目及条件出现的重置按钮。搜索内层输入自适应容器内高，避免超出边框；内部图标和文字垂直居中，搜索文字保留左对齐；字号保持既有值。该要求仅作用于 `.page-projects .projects-toolbar`，覆盖该行历史 26px 规格。

> | 工具栏搜索、筛选、排序触发器、按钮 | 26px 高；触发器 12px / 16px |

来源：[demo4-UI规则.md · 第 17 行](../sources/ui.txt)

> | 访问范围和成员状态标签 | 高度 24px；保持一致 |

来源：[demo4-UI规则.md · 第 22 行](../sources/ui.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:22](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:52](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:129](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:135](../../../src/styles/demo4-ui.css)
- [src/styles/foundations.css:151](../../../src/styles/foundations.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
