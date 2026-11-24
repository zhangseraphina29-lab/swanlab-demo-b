# SwanLab demo4

UI 规范入口：[Design System](DESIGN.md) · [全部名词目录](docs/design-system/README.md) · [持续维护约定](docs/design-system/MAINTENANCE.md)

基于已部署的 demo3 重新创建，线上基线：
https://zhangseraphina29-lab.github.io/swanlab-demo-b/demo3.html

已下载页面与部署源码构建快照 SHA-256 一致：
`d4b9090282bbaafc1d26b542643e478292477b2a43edeb2e7eccc68ddb84cd1d`。
原始线上页面与源码哈希保存在 `baseline/`，用于对照，不作为 demo4 入口。

## React + Vite + Tailwind CSS

当前入口已迁移为 React 19，开发和生产构建使用 Vite 8，Tailwind CSS 4 通过官方 `@tailwindcss/vite` 插件接入。

```sh
npm install
npm start
# 生产构建
npm run build
# 预览生产构建（4176）
npm run preview
# 业务回归测试
npm test
```

开发地址：http://127.0.0.1:4175/ 。`dist/` 为构建产物，不能再用 Python 静态服务器直接运行源码入口。

### 代码结构

- `src/main.jsx`：入口，加载样式和业务控制器。
- `src/App.jsx`：React 页面组件，适配模板中的非受控表单。
- `src/components/DashboardLayout.jsx`：React 顶部导航、侧栏和主内容布局，替代原来的 DOM 搬移逻辑。
- `src/render-page.jsx`：唯一 React root，负责页面更新及热更新清理。
- `src/controller.js`：现有路由、页面模板、表单交互和本地存储逻辑。
- `src/model.js`、`src/billing-*.js`：业务模型和账单逻辑。
- `src/styles/index.css`：统一样式入口与 Tailwind 配置。
- `public/`：图片、字体等静态资源。
- `vite.config.js`：React、Tailwind 插件与服务端口。

### 迁移边界

所有顶层页面通过 React 渲染，主布局已使用 JSX 组件。为保留已有业务行为，页面内容暂时使用 `html-react-parser` 将原有模板转换成 React 元素，复杂表单、弹窗和控件仍沿用原生事件绑定，并非全部改写为 Hooks 与 JSX。每次页面更新替换兼容边界，防止控件移动 DOM 后与 React 的节点复用冲突。原有 localStorage 键保持不变。

新组件直接编写 JSX，可使用 Tailwind 工具类。样式入口采用 Tailwind 官方支持的 theme/utilities 分别导入方式，暂不启用 Preflight，以保留现有表单、表格和排版的默认样式；原有 CSS 按原顺序导入。`App` 的 `contents` 类已实际使用 Tailwind。

### 验证

- `npm test`：40 个业务场景及 7 个账单测试。
- `npm run build`：生成可部署的 `dist/`。
- 浏览器检查：列表/卡片切换、创建项目表单及取消、组织设置、账户设置与返回、静态图片加载、Tailwind 工具类生效。

历史主题和发布记录如下，仅作为之前版本的记录。

## Crimson 主题

`crimson-theme.css` 使用用户图片给出的12阶 Crimson Light/Dark 色板。品牌主色9阶为 #E93D82；浅色实心按钮采用11阶 #CB1D63 配白字，深色采用9阶配1阶深字，保证可读性。链接、选中态和焦点环使用对应色阶；中性色及成功、警告、错误语义不更换。

## 当前主题：Fireworks（克制版）

已用 `fireworks-palette.css` 与 `fireworks-theme.css` 替换 Crimson 主题引用；Crimson 文件保留用于比较。色值来自本地 `fireworks-ds/tokens.json`，副本保存在 `design-reference/fireworks/`。

仅主操作采用 bloom-700 #610A45；焦点、勾选和 hover 使用同色阶。导航、Tab、视图切换及大面积表面保持中性色；橙色不额外加入普通组件，原有警告/成功/错误语义保留。未修改字体、尺寸、页面布局或功能。源规范没有深色主题，深色适配使用原 Bloom 色板的 500/200/300 阶。

## demo4 线上发布（2026-11-23）

- 地址：https://zhangseraphina29-lab.github.io/swanlab-demo-b/demo4/
- GitHub Pages 提交：`bf48249b00f229bb7112ce621a32e822c13bcf7f`
- 独立 `/demo4/` 资源目录；`/demo4.html` 跳转入口保留查询参数。
- 仅新增 demo4 文件，未修改线上 demo3 或根目录既有文件。
- 发布前验证：40 项模型场景、7 项账单测试通过。

## 当前 UI 规则索引

统一规则：`/Users/zhangnan/Documents/情感机器/项目/设计系统搭建/demo4-UI规则.md`。
动效规则：同目录 `demo4-motion-guidelines.md`。字号和尺寸沿用既有组件，配色及图标修改不得顺带改字级；冲突时以最新明确用户要求为准。

## 2026-11-24 demo4 更新

发布提交：`0fe3e3d0ff661394ae13510e1edfbd0d99c02aac`。同步此前本地标签、状态、菜单和 Tab 修改；本次设置导航统一 13px、顶栏描边一致、FREE 透明底、Tab 隐藏滚动条。只更新 demo4 目录。

## 仓库资源与规则副本

GitHub 插件使用文本上传，图片和字体以 `scripts/static-assets.json` 保存，`npm install` 后自动还原至 `public/`；也可以执行 `node scripts/restore-assets.mjs`。设计规则原文副本位于 `docs/design-system/sources/`，文档检查不再依赖本机外部目录。
