# 面包屑 · Breadcrumb

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

实现保护（2026-11-26）：通用 hover 选择器须显式排除 `.org-overview-link`，防止通用选择器优先级提高后覆盖组织入口的独立规则；该入口保持透明背景、无下划线，仅名称文字 hover 变浅。

用户约定（2026-11-26，持续适用）：后续“所有”的统一样式修改默认排除两部分：① 深紫色主按钮保持默认 `#594DB9`、hover `#443998`、白字；② 顶部组织名称入口保持透明背景、无下划线，hover 仅名称文字使用 `--text-secondary` 变浅。除非用户明确针对这两部分提出新要求，否则保留这些独立规则。本约定覆盖下方历史统一 hover 范围。

最新用户调整（2026-11-26）：全站 hover 背景为 `#F9F9FE`、选中背景为 `#F6F5FC`，覆盖下方历史色值；选中控件悬停时优先显示 hover 背景。

最新用户要求（2026-11-26）：所有 hover 背景统一为 `#F6F5FC`，组织名称入口也使用该背景与深色文字；覆盖下方历史透明背景及文字单独变浅规则。

用户于 2026-11-26 批注要求去掉顶部组织名称入口的 hover 效果：`.org-overview-link` 悬停时保持透明背景，无下划线和阴影；随后同日用户补充组织名称文字 hover 时稍微变浅，使用 `--text-secondary`，仅作用于 `.org-crumb-name`。点击进入组织概览及键盘焦点环保留。本条覆盖统一 hover 背景及历史组织名称下划线规则。

- 权限组当前名称使用与其他页面一致的当前项文字样式，分隔符单独显示。来源：用户于 2026-11-25 页面批注。

用户于 2026-11-25 指定：面包屑统一显示在顶部导航栏，权限组新建及详情内容区不再重复显示；顶部「权限组」可返回列表，当前项为新建权限组或组名称。

> - 组织名 hover 下划线；项目名称 hover 无下划线，各页面项目卡片保持一致。

来源：[demo4-UI规则.md · 第 43 行](../sources/ui.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:167](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:236](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:316](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:317](../../../src/styles/demo4-ui.css)
- [src/styles/linear.css:16](../../../src/styles/linear.css)
- [src/styles/linear.css:33](../../../src/styles/linear.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
