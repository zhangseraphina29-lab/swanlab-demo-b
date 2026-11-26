# 主题 · Theme

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

> Light / Dark 切换只调整明度与必要的饱和度，不改变主色相。Lucide 红的 OKLCH 色相固定为 22.946°，默认、hover、active、选中底色均从同一红色派生；禁止用紫红或莓红替代深色交互态。中性色使用无彩灰（OKLCH chroma = 0），避免暗部呈蓝紫色。深色品牌选中底色由主红 12% 与画布混合，不再使用偏暗莓色作为底色。Magenta 是验证面板主动选择的独立对比方案，不由深色模式自动启用。

来源：[usage.md · 第 70 行](../sources/color.txt)

> Light / Dark 切换只调整明度与必要的饱和度，不改变主色相。Lucide 红的 OKLCH 色相固定为 22.946°，默认、hover、active、选中底色均从同一红色派生；禁止用紫红或莓红替代深色交互态。中性色使用无彩灰（OKLCH chroma = 0），避免暗部呈蓝紫色。深色品牌选中底色由主红 12% 与画布混合，不再使用偏暗莓色作为底色。Magenta 是验证面板主动选择的独立对比方案，不由深色模式自动启用。

来源：[usage.md · 第 70 行](../sources/color.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/lucide-tokens.css:89](../../../src/styles/lucide-tokens.css)
- [src/styles/lucide-tokens.css:162](../../../src/styles/lucide-tokens.css)
- [src/styles/lucide-tokens.css:183](../../../src/styles/lucide-tokens.css)
- [src/styles/lucide-tokens.css:185](../../../src/styles/lucide-tokens.css)
- [src/styles/lucide-theme.css:2](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:39](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:69](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:100](../../../src/styles/lucide-theme.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
