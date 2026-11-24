# SwanLab Design System

面向当前 `prototype-demo4` 的 UI 规范。规则从已有项目文件摘录；没有明确依据的字段留空。

目录中的每个名词都可点开独立 Markdown。“代码存在”和“规则已确定”分开记录；Token 自动提取值不等于已确认规范。

## 开始使用

- [规则来源与取舍](reference/rule-sources.md)
- [维护与同步](MAINTENANCE.md) · [变更记录](CHANGELOG.md) · [实现来源](reference/source-map.md) · [全部 Token](reference/token-catalog.md)
- 开发前读取对应条目；样式改变后同步文档并运行 `npm run docs:sync` / `npm run docs:check`。
- 当前仅主布局已拆为 React 组件，其余存在模板兼容层；目录名词不是可直接 import 的组件清单。

## 基础与 Token

- [产品风格 · Product Style](foundations/product-style.md)

- [设计 Token · Design Token](foundations/design-token.md)
- [颜色 · Color](foundations/color.md)
- [主题 · Theme](foundations/theme.md)
- [字体与文字样式 · Typography](foundations/typography.md)
- [间距 · Spacing](foundations/spacing.md)
- [尺寸与密度 · Sizing & Density](foundations/sizing.md)
- [圆角 · Border Radius](foundations/radius.md)
- [边框 · Border](foundations/border.md)
- [阴影与层级 · Elevation](foundations/elevation.md)
- [图标 · Iconography](foundations/iconography.md)
- [动效 · Motion](foundations/motion.md)
- [响应式 · Responsive](foundations/responsive.md)
- [叠放顺序 · Layering](foundations/layering.md)
- [无障碍 · Accessibility](foundations/accessibility.md)
- [样式级联 · CSS Cascade](foundations/css-cascade.md)
- [Tailwind CSS](foundations/tailwind.md)

## 组件

- [按钮 · Button](components/button.md)
- [图标按钮 · Icon Button](components/icon-button.md)
- [链接 · Link](components/link.md)
- [单行输入 · Input](components/input.md)
- [多行输入 · Textarea](components/textarea.md)
- [单选选择器 · Select](components/select.md)
- [复选框 · Checkbox](components/checkbox.md)
- [单选项 · Radio](components/radio.md)
- [表单项 · Form Field](components/field.md)
- [搜索框 · Search](components/search.md)
- [筛选器 · Filter](components/filter.md)
- [分段选择 · Segmented Control](components/segmented-control.md)
- [标签页 · Tabs](components/tabs.md)
- [徽标 · Badge](components/badge.md)
- [标签 · Tag](components/tag.md)
- [头像 · Avatar](components/avatar.md)
- [提示气泡 · Tooltip](components/tooltip.md)
- [浮出面板 · Popover](components/popover.md)
- [操作菜单 · Menu](components/menu.md)
- [对话框 · Dialog](components/dialog.md)
- [抽屉 · Drawer](components/drawer.md)
- [提示条 · Alert](components/alert.md)
- [轻提示 · Toast](components/toast.md)
- [数据表格 · Table](components/table.md)
- [卡片 · Card](components/card.md)
- [面板 · Panel](components/panel.md)
- [面包屑 · Breadcrumb](components/breadcrumb.md)
- [侧边栏 · Sidebar](components/sidebar.md)
- [顶栏 · Header](components/header.md)
- [设置导航 · Settings Navigation](components/settings-navigation.md)
- [空状态 · Empty State](components/empty-state.md)
- [骨架屏 · Skeleton](components/skeleton.md)
- [进度条 · Progress Bar](components/progress.md)
- [分页 · Pagination](components/pagination.md)
- [命令面板 · Command Palette](components/command-palette.md)

## 交互与页面模式

- [组织概览 · Organization Overview](patterns/organization-overview.md)

- [表单校验 · Validation](patterns/form-validation.md)
- [焦点管理 · Focus Management](patterns/focus.md)
- [交互状态 · Interaction States](patterns/interaction-states.md)
- [错误状态 · Error State](patterns/error-state.md)
- [危险操作 · Destructive Action](patterns/destructive-action.md)
- [未保存修改 · Unsaved Changes](patterns/unsaved-changes.md)
- [文本截断 · Truncation](patterns/truncation.md)
- [套餐比较 · Pricing](patterns/pricing.md)
- [用量与账单 · Billing](patterns/billing.md)
- [引导与创建流程 · Onboarding](patterns/onboarding.md)
- [登录与注册界面 · Authentication](patterns/authentication.md)

## 常用 UI 名词 · 暂留空

- [开关 · Switch](reference/switch.md) · [组合框 · Combobox](reference/combobox.md)
- [滑块 · Slider](reference/slider.md) · [折叠面板 · Accordion](reference/accordion.md)
- [日期选择器 · Date Picker](reference/date-picker.md) · [树形控件 · Tree](reference/tree.md)
- [步骤指示器 · Stepper](reference/stepper.md) · [拖放上传区 · Dropzone](reference/dropzone.md)
- [分隔线 · Divider](reference/divider.md) · [滚动区域 · Scroll Area](reference/scroll-area.md)
