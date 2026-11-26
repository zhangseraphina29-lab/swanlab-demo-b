# GitHub Pages 自动部署

- 源码目录：`demo4/`。
- `main` 每次推送都会安装依赖、执行测试、构建并发布；也可在 Actions 手动运行。
- 使用 Node.js 24 和 `npm ci`；安装后自动恢复项目内置图片和字体。
- Pages 的 Source 必须选择 **GitHub Actions**。
- 预览路径保持为：/swanlab-demo-b/demo4-preview/。
- 保留仓库根目录的其他静态演示，使用新构建完整替换旧的 demo4-preview，避免旧文件残留。
- 构建或测试失败时不部署，继续保留上次成功发布的版本。
- `demo4-preview/version.json` 记录线上提交 SHA 和 Actions 运行 ID，可用于确认部署版本。
- workflow 只在部署 job 授予 Pages 发布和 OIDC 权限；不需要个人访问令牌。

工作流：`.github/workflows/deploy-pages.yml`。
