# Fireworks 衍生色彩系统

来源为指定链接跳转后的登录页，未读取登录后的账户首页。实测锚点见 tokens.json；其他色阶、状态及深色主题是设计提案。

| 角色 | Token | 浅色 | 场景 |
|---|---|---|---|
|画布|bg-canvas|#ffffff|页面主内容|
|次级背景|bg-subtle|#f9f7f5|侧栏、工具栏、分组容器|
|弱填充|bg-muted|#f0ece8|中性控件悬停、禁用底色|
|弱边框|border-subtle|#e2ddd8|卡片分组与列表分割|
|控件边框|border-control|#7c736b|输入框、下拉框和复选框轮廓|
|主文字|text-primary|#1e1d1b|标题、正文、字段标签|
|次文字|text-secondary|#595959|说明、元数据、占位提示|
|禁用文字|text-disabled|#a2978e|仅用于不可交互状态|
|品牌|brand-display|#610a45|标识和有限的品牌强调|
|选中|brand-soft|#fcf3f9|搭配 brand-text 和勾选标识|
|主要动作|action-primary|#610a45|创建、保存、确认；配 action-text|
|悬停 / 按下|action-hover|#7a155c|按下使用 action-active|
|焦点|focus-ring|#7a155c|2px 焦点环，外偏移 3px|
|成功|success-text|#365130|搭配 success-bg；完成与通过|
|警告|warning-text|#6c4c22|搭配 warning-bg；有风险但可继续|
|信息|info-text|#503b69|搭配 info-bg；处理中、帮助提示|
|错误|danger-text|#752720|搭配 danger-bg；失败、字段错误|
|危险动作|danger-action|#752720|删除、撤销授权；浅色白字，深色 action-text|

主按钮每区域通常一个；状态配图标或文案；深色主题使用语义映射。状态色重新配套：成功采用苔绿，警告采用赭金，信息采用灰蓝紫，Danger 采用暖砖红；替代上一版状态色。
