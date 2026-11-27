# 侧边栏 · Sidebar

[返回总目录](../README.md) · [规则来源与取舍](../reference/rule-sources.md)

## 已确定规则

用户于 2026-11-26 指定底部侧边栏显示方式图标也增至 18×18px，与所有项目、组织管理一致。

用户于 2026-11-26 指定侧栏所有项目及组织管理图标均增加 2px，从 16px 改为 18×18px，按钮尺寸与居中布局保留。

侧栏实际颜色修复（2026-11-26）：用户反馈截图选中与 hover 不一致。侧栏导航分别显式固定选中与 hover 背景为 #F7F7F9；hover 取消背景色过渡，避免浅色过渡中间帧造成不一致。

最新色值调整（2026-11-26）：通用 hover 底色由 `#F9F9FE` 改为 `#FAF9FA`，通用选中底色由 `#F6F5FC` 改为 `#F7F7F9`。深紫色主按钮、顶部组织名称与搜索框保留各自已确认的独立交互规则。本条覆盖下方历史通用底色值。

最新用户调整（2026-11-26）：全站 hover 背景为 `#F9F9FE`、选中背景为 `#F6F5FC`，覆盖下方历史色值；选中控件悬停时优先显示 hover 背景。

最新用户要求（2026-11-26）：主侧栏与设置导航选中底色统一为 `#F2F1F9`，hover 为 `#F6F5FC`，覆盖下方历史混色及浅灰选中规则。

> - 侧栏显示控制只显示对齐的图标，可选择固定展开、固定收起、hover 展开。

来源：[demo4-UI规则.md · 第 55 行](../sources/ui.txt)

浅色模式主侧栏选中底色为 `#F7F7F7`，直接使用 `--bg-muted`；文字保持 `--text-primary`，hover 仍为 `--brand-soft`。深色模式保留 `--bg-muted` 65% 与 `--bg-canvas` 35% 的 sRGB 混合。

来源：用户于 2026-11-26 的「所有项目」浏览器批注；覆盖 [demo4-UI规则.md · 第 78 行](../sources/ui.txt) 的浅色选中背景。共用浅灰底规则见 [颜色](../foundations/color.md)。

> - 幽灵按钮：hover 浅灰，不加下划线。主侧栏 hover 例外为浅红，静止选中为中性灰。

来源：[demo4-UI规则.md · 第 37 行](../sources/ui.txt)

> - 展开宽度变化约 100ms，文字淡入延迟约 60ms。

来源：[demo4-motion-guidelines.md · 第 34 行](../sources/motion.txt)

## 其他样式与规格

## 其他使用规则

## 待补示例

## 代码定位（不作为规则确认依据）

- [src/styles/demo4-ui.css:142](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:143](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:364](../../../src/styles/demo4-ui.css)
- [src/styles/demo4-ui.css:528](../../../src/styles/demo4-ui.css)
- [src/styles/lucide-theme.css:54](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:74](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:162](../../../src/styles/lucide-theme.css)
- [src/styles/lucide-theme.css:166](../../../src/styles/lucide-theme.css)
- [业务模板与事件：controller.js](../../../src/controller.js)
- [按钮与导航装饰：demo4-ui.js](../../../src/demo4-ui.js)

## 超级管理员看板入口

用户于 2026-11-26 要求替换底部「查看用量」为「超级管理员看板」；正式使用范围为私有化部署，demo 仅展示入口按钮。当前 `VITE_DEPLOYMENT_MODE` 默认为 `demo`，`private` 同样展示，其他值隐藏；沿用原用量可见权限及页面范围。点击只显示入口演示提示，未实现看板。收起侧栏时显示图标及可访问名称。
