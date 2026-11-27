# 圆角 · Border Radius

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-27 指定：所有组件圆角统一为 `4px`，覆盖此前工具栏、表格、卡片、下拉菜单和复选框的单独数值。头像、圆点等圆形元素保持圆形；拼接边界原有的直角保持不变。仅调整圆角，不改变颜色、交互或尺寸。

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

- 所有已导入样式中的非零组件圆角及 radius Token 统一为 `4px`。
- 保留 `50%` 圆形、`0` 拼接边界及 `inherit` 继承行为。
- 来源：2026-11-27 用户要求；代码为 `src/styles/index.css` 的实际导入链及共享 Token。
