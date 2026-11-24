# SwanLab UI 规范入口

完整目录见 [Design System](docs/design-system/README.md)。每个基础名词、组件、模式及实际导入的 Token 都有独立 Markdown。

## 规则记录边界

只填写已有明确依据的规则，附来源；未确定字段留空。代码声明是实现记录，不等于已冻结设计规范。来源与冲突处理见[规则来源与取舍](docs/design-system/reference/rule-sources.md)。

## 开发约定

- 修改 UI 前阅读对应条目；样式数值来自当前代码及作用条件，不能只参考早期 CSS。
- 新组件使用语义颜色，不直接引用原始色阶；已有 d4/sb 变量属于兼容映射。
- 不把文档里的组件名词误认成已经导出的 React 组件 API；尚未实现的条目已单列。
- 当前主布局使用 React，复杂模板和原生事件仍有兼容层，新增控件必须核对两者边界。
- UI 修改与对应文档在同一任务中更新，流程见[维护约定](docs/design-system/MAINTENANCE.md)。

```sh
npm run docs:sync
npm run docs:check
```

同步命令只刷新生成区和源码快照，不能推断设计意图。人工规则、例外和修改理由需要同步编辑。
