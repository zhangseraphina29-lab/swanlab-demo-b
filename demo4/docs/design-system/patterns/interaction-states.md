# 交互状态 · Interaction States

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

Hover 覆盖修复（2026-11-26）：项目筛选/排序纯白背景仅用于非 hover 状态，防止高优先级白底覆盖通用 hover；悬停恢复 #F7F7F9。搜索框独立交互不变。

最新调整（2026-11-26）：通用 hover 底色由 `#FAF9FA` 改为 `#F7F7F9`；选中底色仍为 `#F7F7F9`，深紫主按钮、组织名称、纯文字操作、搜索框及卡片的独立交互规则保留。

用户于 2026-11-26 指定纯文字操作 hover 仅文字变浅，不填充背景：文字按钮、项目名称、账户名称、最近更新文字入口及文字链接操作使用透明背景、`text-secondary` 文字、无阴影和下划线。通用 hover 选择器显式排除这些入口。深紫主按钮和其他控件规则保留。

最新色值调整（2026-11-26）：通用 hover 底色由 `#F9F9FE` 改为 `#FAF9FA`，通用选中底色由 `#F6F5FC` 改为 `#F7F7F9`。深紫色主按钮、顶部组织名称与搜索框保留各自已确认的独立交互规则。本条覆盖下方历史通用底色值。

搜索框最新例外（2026-11-26）：未聚焦 hover 仅边框颜色加深，聚焦仍为 1px 深紫色视觉描边且优先于 hover，无背景变化及内容位移。详见[搜索框](../components/search.md)。

用户于 2026-11-26 新增搜索框例外：不带 hover 效果，点击聚焦时仅使用 `1px` 的 `#594DB9` 单层描边（宽度由同日最新批注更新）。见[搜索框](../components/search.md)。

用户约定（2026-11-26，持续适用）：后续“所有”的统一样式修改默认排除两部分：① 深紫色主按钮保持默认 `#594DB9`、hover `#443998`、白字；② 顶部组织名称入口保持透明背景、无下划线，hover 仅名称文字使用 `--text-secondary` 变浅。除非用户明确针对这两部分提出新要求，否则保留这些独立规则。本约定覆盖下方历史统一 hover 范围。

最新补充（2026-11-26）：深紫色主按钮不使用浅色 hover，保持静止 `#594DB9`、hover `#443998`，均配白字；一般控件 hover 为 `#F9F9FE`、选中为 `#F6F5FC`。此例外优先于下方“全站 hover”的描述。

最新用户调整（2026-11-26）：全站 hover 背景为 `#F9F9FE`、选中背景为 `#F6F5FC`，覆盖下方历史色值；选中控件悬停时优先显示 hover 背景。

最新用户要求（2026-11-26）：全站选中背景 `#F2F1F9`、hover 背景 `#F6F5FC`，选中控件悬停时优先显示 hover 背景。覆盖下方历史主按钮与组织名称例外。文字配深色，危险操作保留红字；焦点环保留。

顶部组织名称入口为用户于 2026-11-26 指定的 hover 例外：不改变背景、不显示下划线或阴影；最新批注补充仅组织名称文字 hover 时使用 `--text-secondary` 变浅，保留点击与焦点环。见[面包屑](../components/breadcrumb.md)。

用户随后指定主按钮 hover 例外：背景为 `#443998`，文字保持白色，包括「创建项目」及共用主按钮样式。其余 hover 背景继续为 `#EEF2FF`。

用户于 2026-11-26 指定所有 hover 颜色统一为 `#EEF2FF`：交互控件、链接、导航、菜单选项、项目卡片和表格行的悬停背景统一使用 `--hover-bg`，两套配色及浅/深色模式一致。浅色悬停背景配 `--hover-fg` 深色文字，危险按钮保留红字；禁用元素不触发。文字链接的下划线、焦点环及静止选中态保留。本规则覆盖下方历史 hover 背景要求；实现见 [fireworks-theme.css](../../../src/styles/fireworks-theme.css)。

> - 持续选中态与 hover 分开定义；所有按钮保留独立键盘焦点环与禁用行为。避免将 ghost 类统一映射成 text。

来源：[usage.md · 第 55 行](../sources/color.txt)

> - 禁用使用 bg-muted + text-disabled，并在行为上禁止触发；必要的原因说明仍用 text-secondary。

来源：[usage.md · 第 38 行](../sources/color.txt)

> - 深色模式主按钮：默认 coral-500 → hover coral-600 → active coral-700，明度逐步降低。

来源：[usage.md · 第 64 行](../sources/color.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/lucide-theme.css:11](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:13](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:111](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:166](../../../src/styles/lucide-theme.css)
- [src/styles/demo4-ui.css:32](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:35](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:447](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:518](../../../src/styles/demo4-ui.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
