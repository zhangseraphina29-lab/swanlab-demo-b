# 操作菜单 · Menu

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-26 最新指定：管理项目使用 Qingicon server-settings；项目操作菜单图标与文字间距由 8px 增至 12px；菜单取消置顶使用 pushpin-diagonal-off，置顶使用 pushpin-diagonal。卡片标题栏的已置顶深紫实心图钉保持不变。

用户于 2026-11-26 要求项目操作菜单补齐图标：管理项目使用现有 settings 图标，移动项目使用现有 move（folder-arrow-right）图标，与置顶、编辑标签图标同列对齐。卡片和表格项目菜单共用。

用户于 2026-11-26 指定项目卡片更多菜单与三个点触发按钮垂直间距为 4px；卡片内绝对定位菜单使用 top:calc(100% + 4px)，表格 popover 继续使用触发器边界加 4px。菜单项 hover 不显示边框或阴影，保留背景反馈和键盘焦点环。

> - 危险操作（包括操作菜单里的删除）用 danger-text 红字，不能被 ghost/text 普通文字色覆盖。

来源：[demo4-UI规则.md · 第 38 行](../sources/ui.txt)

> - 账号头像 hover 不增加描边或外圈；保留键盘焦点提示。账号菜单只显示实际 ID，不显示 ID: account: 前缀。

来源：[demo4-UI规则.md · 第 41 行](../sources/ui.txt)

> - 账号菜单使用轻微下移、缩放和淡入，约 180ms。

来源：[demo4-motion-guidelines.md · 第 19 行](../sources/motion.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:81](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:111](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:640](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:645](../../../src/styles/demo4-ui.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
