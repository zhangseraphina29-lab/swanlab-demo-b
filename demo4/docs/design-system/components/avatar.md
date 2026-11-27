# 头像 · Avatar

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-26 反馈卡片更新人头像错位：卡片底部 card-update 使用 align-items:center、24px 行高，头像 align-self:center、line-height:1、零外边距，保留 24px 圆形尺寸，时间与头像中心对齐。

用户于 2026-11-26 指定卡片底部更新人圆形头像放大至 24×24px，文字 10px 居中；顶栏账号头像仍为 32px。

用户于 2026-11-26 指定右上角账号圆形头像尺寸为 `32×32px`；账号入口同步 32px，保持圆形、文字居中及原有交互，其他头像不变。

> - 账号头像 hover 不增加描边或外圈；保留键盘焦点提示。账号菜单只显示实际 ID，不显示 ID: account: 前缀。

来源：[demo4-UI规则.md · 第 41 行](../sources/ui.txt)

> - 登录页全屏左右结构、左侧交互粒子，保留现有文案；不恢复暂停按钮和演示说明。创建流程头像始终可点击。

来源：[demo4-UI规则.md · 第 57 行](../sources/ui.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/lucide-theme.css:85](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:86](../../../src/styles/lucide-theme.css)
- [src/styles/foundations.css:48](../../../src/styles/foundations.css)
- [src/styles/foundations.css:121](../../../src/styles/foundations.css)
- [src/styles/foundations.css:125](../../../src/styles/foundations.css)
- [src/styles/foundations.css:143](../../../src/styles/foundations.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)
