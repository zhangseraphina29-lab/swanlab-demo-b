# 套餐比较 · Pricing

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

> - 升级套餐入口打开完整套餐弹窗，不先跳转到用量与账单；组织管理员也可浏览方案。

来源：[demo4-UI规则.md · 第 83 行](../sources/ui.txt)

> - 最大宽 1240px，桌面四列；1050px 以下两列、580px 以下单列，弹窗内容内部滚动，关闭按钮固定在头部。

来源：[demo4-UI规则.md · 第 85 行](../sources/ui.txt)

> - Free / Pro / Team / Enterprise，按月/按年切换显示对应价格和节省金额，保留卡片顺序：套餐名→价格→按钮→额度→权益分组。

来源：[demo4-UI规则.md · 第 86 行](../sources/ui.txt)

> - 使用现有明暗语义色；新弹窗样式仅限 pricing-dialog，不改变既有界面的字号和尺寸。

来源：[demo4-UI规则.md · 第 87 行](../sources/ui.txt)

> - 当前价格为方案预览；不接入旧账单单套餐价格、不生成真实订单、不发放权益。未交付的企业安全能力注明规划中。销售入口未配置时不虚构联系方式。

来源：[demo4-UI规则.md · 第 88 行](../sources/ui.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/pricing.css:1](../../../src/styles/pricing.css)
- [src/styles/pricing.css:2](../../../src/styles/pricing.css)
- [src/styles/pricing.css:11](../../../src/styles/pricing.css)
- [src/styles/pricing.css:12](../../../src/styles/pricing.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)


## 权限组付费范围（2026-11-25）

依据最新 V0.5.3 方案及本次用户批准：套餐入口展示 Free / Team 公有云与 Enterprise 私有化。指定成员项目及权限组为付费能力，权益以当前组织为单位，资源包不解锁。具体价格、资源额度、组数量和到期处理细则待定，套餐预览不发放权益。账单服务中的既有模拟套餐金额仍为历史演示配置，不作为本期正式报价。详见[权限组](permission-group.md)。
