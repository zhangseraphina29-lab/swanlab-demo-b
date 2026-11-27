# 复选框 · Checkbox

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-26 要求筛选复选框圆角再小一些，本次由 3px 改为 2px；保持 14×14px、深紫色选中填充及白色细对号。

用户于 2026-11-26 指定选中维持深紫色 #594DB9 填充、白色细对号。背景颜色和对号 SVG 使用明确优先级，防止通用 input hover 的 background 简写清空对号。尺寸仍为 14px。

用户于 2026-11-26 再次明确下拉筛选复选框为 14×14px，尺寸与 appearance 使用明确优先级避免旧输入样式覆盖；对号线宽调为 1px，保持深紫底、白色细对号。

用户于 2026-11-26 指定筛选菜单复选框从 16px 改为 14×14px，对号改为 1.2px 细线；使用自定义外观，保持原 input 语义、选中深紫及键盘交互。

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/lucide-theme.css:25](../../../src/styles/lucide-theme.css)
- [src/styles/foundations.css:23](../../../src/styles/foundations.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
