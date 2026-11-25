# 圆角 · Border Radius

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-25 要求整体圆角调小，覆盖控件、卡片、菜单与弹窗。

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:22](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:44](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:652](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:676](../../../src/styles/demo4-ui.css)
- [src/styles/pricing.css:1](../../../src/styles/pricing.css)
- [src/styles/pricing.css:6](../../../src/styles/pricing.css)
- [src/styles/pricing.css:10](../../../src/styles/pricing.css)
- [src/styles/pricing.css:12](../../../src/styles/pricing.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)


## 当前实现记录

- 圆角统一引用 `foundations.css` 的半径变量，保留各选择器与媒体条件的原有优先级。两套紫色主题及浅深外观共用尺寸。
- 旧 6–7px 收紧到 4px，8px 到 5px，9–10.6667px 到 6px，11–13px 到 8px，14px 到 10px，18–20px 到 12px；更小装饰圆角使用 1–3px。数字为本次实现选值，不升级为冻结规范。
- 原胶囊形按钮、搜索框、徽标也收紧到 4px；50% 圆形头像、圆点，以及 0 直角、inherit 保持原本形状。
- 四角分开指定的圆角按原位置映射，保持抽屉、Tab、页头页脚已有的直角边界。

代码：[基础变量](../../../src/styles/foundations.css)、[控件](../../../src/styles/supabase.css)、[界面覆盖](../../../src/styles/demo4-ui.css)、[组织概览](../../../src/styles/organization-overview.css)、[弹窗套餐](../../../src/styles/pricing.css)。
