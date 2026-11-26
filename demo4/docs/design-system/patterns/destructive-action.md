# 危险操作 · Destructive Action

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

> - 危险操作（包括操作菜单里的删除）用 danger-text 红字，不能被 ghost/text 普通文字色覆盖。

来源：[demo4-UI规则.md · 第 38 行](../sources/ui.txt)

> - 品牌色表示推进与选中，血红表示错误与有损失的操作。主按钮与危险按钮尽量不作为同级相邻操作；删除确认中以危险按钮作为主要动作。

来源：[usage.md · 第 33 行](../sources/color.txt)

## 其他样式与规格

## 其他使用规则

用户于 2026-11-26 要求：彻底移除成员必须先完成资源交接。资源转移成功后仍需单独确认移除；无资源时跳过资源转移提示，直接进入最终移除确认（2026-11-26 最新要求）。最终执行时重新校验资源，避免直接调用或过期确认绕过限制。见[成员移除](../components/table.md)。

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/lucide-theme.css:12](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:13](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:31](../../../src/styles/lucide-theme.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
