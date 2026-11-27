# 卡片 · Card

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-26 指定所有项目卡片外框圆角最新调整为 4px，其他尺寸、背景及动效保持原规则。

用户于 2026-11-26 指定卡片实验数量旁的实验瓶图标为深紫色 #594DB9，数量文字保持原色。

用户于 2026-11-26 指定已置顶按钮鼠标移开后无背景填充，仅保留深紫实心图钉；active 非 hover 状态显式透明。卡片底部更新人圆形头像由 20px 增至 24px，内部文字居中。

用户于 2026-11-26 最新指定：置顶前后均使用 pushpin-diagonal，已置顶时图标为 #594DB9 实心，不再切换取消置顶图标；按钮仍可再次点击取消置顶。卡片标签在固定标签区域内垂直居中，使其位于描述与实验数量之间。

用户于 2026-11-26 要求标题右侧范围标签靠近标题：项目名称容器按内容宽度布局并可收缩省略，范围标签距名称 8px；置顶与更多操作仍靠右。

用户于 2026-11-26 提供公开标签参考图：项目卡片可见范围（组织、公开、指定成员）移至标题右侧，使用透明背景、轻描边、圆形胶囊、次要文字的纯文字标签；不带原范围图标。标题必要时省略，操作保持右侧。底部移除范围标签，实验数量成为最左信息，更新时间保持右侧。表格列表范围列不变。

用户于 2026-11-26 指定卡片置顶按钮与右侧更多按钮 hover 填充区域尺寸一致：两者统一为 28×28px、同圆角、图标居中；置顶不位移。

用户于 2026-11-26 指定置顶/取消置顶按钮 hover 不位移：`.card-pin` 及图标在 hover、active、focus 时禁用 transform、translate 和缩放，保留颜色反馈。卡片整体既有 hover 动效保留。

用户于 2026-11-26 指定项目卡片 hover 去掉颜色填充，保持原画布背景，保留既有紫色边框与上浮/阴影动效；通用 hover 背景规则须显式排除 `.project-card`。

> - 卡片信息层级大改已撤回，不重新引入 22–24px 大标题方案。

来源：[demo4-UI规则.md · 第 11 行](../sources/ui.txt)

> - 项目卡片保留信息；去掉底部分割线与 hover 顶部粗红线。更多按钮不旋转，交互反馈限制在按钮边界内。

来源：[demo4-UI规则.md · 第 49 行](../sources/ui.txt)

> - 置顶/取消置顶后卡片不移动；更多菜单距省略号 4px，首次显示前完成定位，不闪到远处，不遮挡主要内容。

来源：[demo4-UI规则.md · 第 50 行](../sources/ui.txt)

> - 组织名 hover 下划线；项目名称 hover 无下划线，各页面项目卡片保持一致。

来源：[demo4-UI规则.md · 第 43 行](../sources/ui.txt)

组织概览的管理卡片见[组织概览](../patterns/organization-overview.md)，与项目内容卡片分开维护。

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:81](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:91](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:640](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:645](../../../src/styles/demo4-ui.css)
- [src/styles/foundations.css:51](../../../src/styles/foundations.css)
- [src/styles/foundations.css:54](../../../src/styles/foundations.css)
- [src/styles/foundations.css:134](../../../src/styles/foundations.css)
- [src/styles/foundations.css:136](../../../src/styles/foundations.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
