# 图标 · Iconography

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-26 更新置顶规则：置顶前后均使用 pushpin-diagonal，已置顶为 #594DB9 实心；不再使用 pushpin-diagonal-off。操作含义和无障碍名称仍随状态切换。

用户于 2026-11-26 指定取消置顶 `pushpin-diagonal-off` 内部不填充；SVG 及内部路径固定 `fill:none`，包括已置顶状态及 hover，保持线性描边。

用户于 2026-11-26 指定 Qingicon 线性图标映射：置顶 `pushpin-diagonal`、取消置顶 `pushpin-diagonal-off`、官方文档 `book-open-2`、搜索 `search-2`。SVG 来自 Qingicon 官方 `assets.qingicon.com/icons/line/{Map,Education,System}.json`；置顶图标按可执行操作切换，卡片及更多菜单一致。图标名称映射同步于 `qingicon-mapping.json`。

> - 图标统一 QingIcon 对应语义的线性图标、1.5px 线宽；升级按钮使用指定四芒星 SVG，当前为 outline 样式。

来源：[demo4-UI规则.md · 第 42 行](../sources/ui.txt)

> - 基线社区、官方文档等图标 hover 底色浅红，原有边框、圆角及图标色不变，不加阴影。

来源：[demo4-UI规则.md · 第 40 行](../sources/ui.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [QingIcon 本地路径定义：src/icons.js](../../../src/icons.js)
- [QingIcon 笔画与局部覆盖：src/styles/demo4-ui.css](../../../src/styles/demo4-ui.css)
- [src/styles/foundations.css:54](../../../src/styles/foundations.css)
- [src/styles/foundations.css:57](../../../src/styles/foundations.css)
- [src/styles/foundations.css:134](../../../src/styles/foundations.css)
- [src/styles/foundations.css:151](../../../src/styles/foundations.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
