# 表单校验 · Validation

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

> - 输入框错误时采用 danger-text 边框，字段下方提供具体错误原因；聚焦时保留独立 focus-ring。

来源：[usage.md · 第 36 行](../sources/color.txt)

> 3. 区分未创建、无结果、零值、加载、失败；表单错误、提交及成功有反馈。

来源：[结论.md · 第 42 行](../sources/scope.txt)

权限组实现：预览提交时验证名称及授权范围；名称错误使用字段下方提示并聚焦输入框，其他预检错误在表单内持续显示，修正后可继续预览。来源：用户于 2026-11-25 的保存按钮反馈及现有错误规范。

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:103](../../../src/styles/demo4-ui.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
