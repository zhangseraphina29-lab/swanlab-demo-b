# 按钮 · Button

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-27 针对“创建项目”要求颜色亮一点，并进一步提高饱和度：该按钮常态改为 `#6050D0`，白字；随后用户要求 hover 同步变化，改为更深且饱和的 `#493AB0`。仅覆盖项目工具栏该按钮，其他深紫主按钮保持原规则。

用户于 2026-11-26 指定纯文字操作 hover 仅文字变浅，不填充背景：文字按钮、项目名称、账户名称、最近更新文字入口及文字链接操作使用透明背景、`text-secondary` 文字、无阴影和下划线。通用 hover 选择器显式排除这些入口。深紫主按钮和其他控件规则保留。

深紫色主按钮固定规则（用户于 2026-11-26 再次强调不得改动）：默认 `#594DB9`、hover `#443998`、白字。通用 hover 选择器必须显式排除主按钮，避免后续新增选择器条件提高优先级后覆盖主按钮例外。

用户约定（2026-11-26，持续适用）：后续“所有”的统一样式修改默认排除两部分：① 深紫色主按钮保持默认 `#594DB9`、hover `#443998`、白字；② 顶部组织名称入口保持透明背景、无下划线，hover 仅名称文字使用 `--text-secondary` 变浅。除非用户明确针对这两部分提出新要求，否则保留这些独立规则。本约定覆盖下方历史统一 hover 范围。

最新补充（2026-11-26）：深紫色主按钮不使用浅色 hover，保持静止 `#594DB9`、hover `#443998`，均配白字；一般控件 hover 为 `#F9F9FE`、选中为 `#F6F5FC`。此例外优先于下方“全站 hover”的描述。

最新用户调整（2026-11-26）：全站 hover 背景为 `#F9F9FE`、选中背景为 `#F6F5FC`，覆盖下方历史色值；选中控件悬停时优先显示 hover 背景。

最新用户要求（2026-11-26）：所有按钮选中背景统一为 `#F2F1F9`，hover 背景统一为 `#F6F5FC`，包含主按钮；浅色背景配深色字。覆盖下方历史 hover 例外。静止主按钮仍为 `#594DB9` 配白字。

- 用户于 2026-11-26 的「创建项目」批注指定：共用紫色主按钮底色为 `#594DB9`，hover 加深至 `#443998`，两种状态均配白字。hover 色来自随后同日的最新批注，覆盖统一浅色 hover 背景规则。两套配色与浅色/深色模式一致，交互派生色见[颜色](../foundations/color.md)。本条覆盖下方历史 Lucide 主红规则。

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
