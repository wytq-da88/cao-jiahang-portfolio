# Pages 工作流验证

首次服务器校验 run `37457740403`（源码 `d232280`）在启动 job 前失败：`jobs.build.env` 中的 `runner.temp` 不属于该位置允许的表达式上下文。没有重跑该失败版本，也没有将它当作部署成功。

用官方 actionlint v1.7.12 在本地未修改工作流上复现相同失败（RED），再将缓存设置改为该位置允许的 `github.workspace`：`${{ github.workspace }}/.npm-cache`。缓存仍在 CI runner 内，覆盖本机固定 D 盘的 `.npmrc`，未修改本机或旧站的全局设置。修正后的完整工作流校验通过（GREEN）；用户行为测试仍为 29 项通过。

校验命令：`actionlint -shellcheck= -pyflakes= .github/workflows/pages.yml`。该命令验证完整 YAML、表达式与上下文；此处未声称运行另外两个可选的 Python/Shell 外部分析器。

工具来源：[rhysd/actionlint 官方 v1.7.12](https://github.com/rhysd/actionlint/releases/tag/v1.7.12)，Windows amd64 ZIP SHA-256：`6e7241b51e6817ea6a047693d8e6fed13b31819c9a0dd6c5a726e1592d22f6e9`。只保存到 D 盘任务工具目录，未安装为全局依赖。

表达式位置依据：[GitHub 官方上下文可用范围](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#context-availability)。具体成功的发布 run 和线上检查见发布记录。
