# 颜色 · Color

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 当前已确定规则

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
