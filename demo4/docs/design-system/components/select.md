# 单选选择器 · Select

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

> | 排序菜单选项 | 13px / 20px，字重 450 |

来源：[demo4-UI规则.md · 第 18 行](../sources/ui.txt)

> - 单选排序菜单的文字及线性选择图标使用 text-primary，选中与 hover 使用 bg-muted，不使用红色。

来源：[demo4-UI规则.md · 第 32 行](../sources/ui.txt)

> - 单选菜单 Hover 使用浅色背景反馈，不缩放、不位移。

来源：[demo4-motion-guidelines.md · 第 24 行](../sources/motion.txt)

> - 单选菜单参考 https://reactbits.dev/c/micro/glide-select ，但文字不得位移或缩放，使用中性灰反馈。

来源：[demo4-motion-guidelines.md · 第 46 行](../sources/motion.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:51](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:53](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:632](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:636](../../../src/styles/demo4-ui.css)
- [src/styles/lucide-theme.css:23](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:24](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:146](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:149](../../../src/styles/lucide-theme.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)

## 语言偏好

用户于 2026-11-25 指定语言支持中文、英文、日语、俄语。实现记录：设置提供「简体中文 / English / 日本語 / Русский」，保存到账户语言偏好并回显。当前原型未实现全站翻译，选择语言仅保存偏好。

用户于 2026-11-25 指定：输入框、下拉选择器等控件默认边框调浅。实现记录：两套紫色主题的 border-control 浅色从 neutral-600 调整为 neutral-400；深色从 neutral-500 调整为 neutral-700，使轮廓在对应背景下更柔和。通过 fireworks-theme.css 覆盖语义映射，保留原始色阶；聚焦 focus-ring、错误 danger-text 保持独立。
