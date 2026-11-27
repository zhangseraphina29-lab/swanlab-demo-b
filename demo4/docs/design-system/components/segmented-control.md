# 分段选择 · Segmented Control

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-26 指定项目视图切换顺序调换：卡片视图在左，列表视图在右；DOM 顺序同步调整，原视图状态和切换功能保留。

最新色值调整（2026-11-26）：通用 hover 底色由 `#F9F9FE` 改为 `#FAF9FA`，通用选中底色由 `#F6F5FC` 改为 `#F7F7F9`。深紫色主按钮、顶部组织名称与搜索框保留各自已确认的独立交互规则。本条覆盖下方历史通用底色值。

最新用户调整（2026-11-26）：全站 hover 背景为 `#F9F9FE`、选中背景为 `#F6F5FC`，覆盖下方历史色值；选中控件悬停时优先显示 hover 背景。

最新用户要求（2026-11-26）：分段选择及列表／卡片切换选中底色统一为 `#F2F1F9`，hover 为 `#F6F5FC`，覆盖下方历史 `#F7F7F7` 及品牌底色规则。

用户于 2026-11-26 批注指定：项目列表／卡片视图切换按钮的选中填充底色为 `#F7F7F7`，两种视图共用该规则；图标颜色保持既有品牌色，hover 继续使用 `#EEF2FF`。此要求仅针对 `.projects-toolbar .segments`，不扩展至其他分段选择组件。

> - 列表／卡片视图和 Tab 切换使用背景、颜色、边框的滑动式过渡，约 180–220ms。

来源：[demo4-motion-guidelines.md · 第 23 行](../sources/motion.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:53](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:56](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:201](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:207](../../../src/styles/demo4-ui.css)
- [src/styles/lucide-theme.css:23](../../../src/styles/lucide-theme.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
