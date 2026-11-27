# 单选选择器 · Select

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-26 要求下拉菜单圆角变小：所有项目工具栏可见范围、标签、排序浮层最新统一为 4px 圆角，宽度及动效保持原规则。

用户于 2026-11-26 指定所有项目工具栏可见范围、标签及排序三个下拉菜单宽度一致，随后按用户反馈收窄为 200px（border-box），窄屏最大宽为视口减 16px。覆盖排序浮层此前按触发器及最小 180px 设置的宽度。

用户于 2026-11-26 指定排序菜单选中对号置于文字后方：选项文字在左，single-select-check 在右并以 margin-left:auto 对齐；保留原选中语义及键盘操作。

用户于 2026-11-26 要求排序下拉与筛选相同：180ms 弹出动画、重复点击触发器收起，使用 popovertarget 避免原生提前 light-dismiss 后重开，保留键盘操作和 reduced-motion。

用户于 2026-11-26 最新指定项目排序描边与表格外框同色，单选触发器改用 `0.5px solid var(--border-subtle)`，保留无 inset 阴影。覆盖此前 border-control 映射。

用户于 2026-11-26 的「项目排序」批注要求描边与其他控件统一：单选触发器使用 `0.5px solid var(--border-control)` 实体边框，移除旧的 1px inset 阴影模拟描边及外部阴影；hover 也不恢复阴影描边。选中与 hover 背景沿用最新统一交互色。

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
