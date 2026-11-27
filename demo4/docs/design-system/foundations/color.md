# 颜色 · Color

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 当前已确定规则

最新调整（2026-11-26）：通用 hover 底色由 `#FAF9FA` 改为 `#F7F7F9`；选中底色仍为 `#F7F7F9`，深紫主按钮、组织名称、纯文字操作、搜索框及卡片的独立交互规则保留。

用户于 2026-11-27 指定主内容区大背景为 `#FEFEFF`，覆盖此前纯白方案。仅作用于浅色模式 `.shell > .main`，卡片、表格和顶部导航的独立底色保留。

最新色值调整（2026-11-26）：通用 hover 底色由 `#F9F9FE` 改为 `#FAF9FA`，通用选中底色由 `#F6F5FC` 改为 `#F7F7F9`。深紫色主按钮、顶部组织名称与搜索框保留各自已确认的独立交互规则。本条覆盖下方历史通用底色值。

用户约定（2026-11-26，持续适用）：后续“所有”的统一样式修改默认排除两部分：① 深紫色主按钮保持默认 `#594DB9`、hover `#443998`、白字；② 顶部组织名称入口保持透明背景、无下划线，hover 仅名称文字使用 `--text-secondary` 变浅。除非用户明确针对这两部分提出新要求，否则保留这些独立规则。本约定覆盖下方历史统一 hover 范围。

最新补充（2026-11-26）：深紫色主按钮不使用浅色 hover，保持静止 `#594DB9`、hover `#443998`，均配白字；一般控件 hover 为 `#F9F9FE`、选中为 `#F6F5FC`。此例外优先于下方“全站 hover”的描述。

最新用户调整（2026-11-26）：全站 hover 背景为 `#F9F9FE`、选中背景为 `#F6F5FC`，覆盖下方历史色值；选中控件悬停时优先显示 hover 背景。

最新用户要求（2026-11-26）：所有选中背景统一为 `#F2F1F9`，所有 hover 背景统一为 `#F6F5FC`，分别使用 `--selection-bg`、`--hover-bg`。包含主按钮、导航、菜单、Tab 和视图切换，覆盖下方历史背景与组织名称 hover 例外。配深色文字以适配浅色背景；静止品牌主色保持 `#594DB9`。

用户于 2026-11-26 指定一般控件悬停背景统一为 `#EEF2FF`（主按钮后续指定 hover 为 `#443998`，配白字），对应 `--hover-bg`，独立于静止底色及品牌色；悬停文字采用深色以保持可读性，危险按钮保留红字。适用范围见[交互状态](../patterns/interaction-states.md)。

用户于 2026-11-26 通过「创建项目」批注指定所有同类紫色统一为 `#594DB9`。两套配色共用 `--action-primary`；品牌文字、展示色和焦点使用该紫色，浅色品牌底按 8% 与画布混合；主按钮 hover 为用户最新指定的 `#443998`，active 按 80% 与黑色混合。深色主按钮同样为该精确紫色并配白字，品牌文字与焦点混合 45% 白色，柔和底混合 80% 深色画布。具体派生比例为本次实现选择，非用户另行指定。该规则覆盖原 Fireworks 品牌色映射。

用户于 2026-11-26 通过「所有项目」侧栏批注指定同类浅灰底统一为 `#F7F7F7`。浅色模式下，两套配色的 `--bg-subtle`、`--bg-muted` 均使用该精确色值；主侧栏选中态直接使用 `--bg-muted`，不再混合白色。深色模式沿用原映射。实现位于 [fireworks-theme.css](../../../src/styles/fireworks-theme.css)。本条覆盖下述来源中的对应浅色背景值。

用户于 2026-11-25 指定两种配色，可在验证面板「色彩系统」切换：

- **暖调紫色**：当前默认，来自 [Fireworks Soft](../../../design-reference/fireworks-soft-colors/usage.md)，使用暖中性色及柔和配套状态色。
- **中性紫色**：来自 [Fireworks](../../../design-reference/fireworks-colors/usage.md)，使用中性灰及其配套状态色。

两套均保留来源的完整 Token 与浅色/深色映射，品牌主操作相同，切换包含背景、文字、边框及状态色。浅色/深色外观与色彩系统分别控制。

实现记录：暖调入口 [fireworks-tokens.css](../../../src/styles/fireworks-tokens.css)，中性入口 [fireworks-neutral-tokens.css](../../../src/styles/fireworks-neutral-tokens.css)，共用 [兼容映射](../../../src/styles/fireworks-theme.css)。选择保存到浏览器，刷新保留；旧 red/magenta 偏好回落为暖调紫色。历史 Magenta 样式已停止导入。完整声明对照见 [主题 Token 对照](../reference/purple-palettes.md)。

## 历史规则（与本次指定色彩系统冲突时已被替代）

> - Lucide 主红为 #F56565，主按钮配浅色文字。Light/Dark 保持色相，深色 hover/active 降低明度，不能自动偏紫。

来源：[demo4-UI规则.md · 第 29 行](../sources/ui.txt)

> - 中性灰使用无彩灰；普通边框轻，控件边框用 border-control，焦点环柔和但清晰。

来源：[demo4-UI规则.md · 第 30 行](../sources/ui.txt)

> - 状态色只用于状态标签、提示、相关图标与错误字段，不扩散到整个页面。状态底色必须配对应状态文字色。

来源：[usage.md · 第 34 行](../sources/color.txt)

> - 不在业务组件里直接引用 50–900 色阶或硬编码 HEX；引用语义 token。图表、插画等额外色彩需求另行定义。

来源：[usage.md · 第 40 行](../sources/color.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/lucide-tokens.css:68](../../../src/styles/lucide-tokens.css)
- [src/styles/lucide-tokens.css:95](../../../src/styles/lucide-tokens.css)
- [src/styles/lucide-theme.css:3](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:7](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:112](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:130](../../../src/styles/lucide-theme.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)

完整色值变化见 [Fireworks 颜色替换记录](../reference/fireworks-migration.md)。
