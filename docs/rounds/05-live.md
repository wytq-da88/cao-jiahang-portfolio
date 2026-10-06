# 独立作品集发布验收

2026-10-06，新作品集已上线：[曹佳航 · 东方器物研究室](https://wytq-da88.github.io/cao-jiahang-portfolio/)。源码位于 [独立 GitHub 仓库](https://github.com/wytq-da88/cao-jiahang-portfolio)，main 发布，codex/portfolio-rebuild 保留三轮提交。原网站和仓库继续保留。

首个成功发布的源码提交为 `0f25470225513c15dae4afe5e83b80bc147c5fcf`。发布前 [PR #1](https://github.com/wytq-da88/cao-jiahang-portfolio/pull/1) 的检查 [run 37458838736](https://github.com/wytq-da88/cao-jiahang-portfolio/actions/runs/37458838736) 成功；合并采用 merge commit，保留三个优化提交。main 的 [run 37459029041](https://github.com/wytq-da88/cao-jiahang-portfolio/actions/runs/37459029041) 中 build 和 deploy 均成功。后续只补充验收记录与截图，产品代码保持这个发布版本的行为。

## 线上证据

- 首页和四个案例的独立 HTML 请求返回 200，canonical 各自对应正确子路径。未知案例返回 404，正文包含专用 404 提示。
- 壁时主图、造型推导网页图及原图、画廊原图、视频、简历共七个关键资源返回 200。详细请求、内容类型与体积见 `05-live-http.json`。
- 实际下载简历 PDF，151690 字节，SHA-256 与本地迁移原件相同，见 `05-live-resume.json`。
- 内置浏览器直接打开线上首页：本地标题字体 loaded，壁时主图 complete、天然宽度 1400px；桌面 DOM clientWidth 与 scrollWidth 同为 1425px。保存线上桌面截图 `05-live-desktop.png`。
- 在 390×844px 浏览器视口检查线上首页：菜单展开时首个“作品”入口获得焦点；Escape 关闭后焦点回到“打开菜单”。保存线上手机截图 `05-live-mobile.png`。检查完已恢复默认浏览器视口。
- 全部本地真实浏览器交互、四案例刷新、15 个路由/尺寸状态、失败和延迟媒体，以及无脚本正文证据见 `02-motion.md`、`03-validation.md`。线上记录分别注明实际检查方式。

原站发布后仍返回 200。本地 HEAD `93a580884611ff2bb66bd3139d8c70a41c96fc62`、原远端 main `0e2ed003c8f44a97744708d2b840cec3d1b8735b` 均未改变，仅保留既存未跟踪 `.netlify/`。复核记录见 `05-old-site-preserved.json`。

## 执行与限制

Git smart-HTTP 通道连接停滞，改用官方 Git 数据 API 传送已有对象，逐一验证 140 个初始唯一 blob、树和原提交 SHA。空仓库初始化用独立 `codex/api-bootstrap` 分支，作品集发布主线仍为 main；没有强制覆盖远端工作。GitHub 签名的 merge commit 按原始 payload/签名恢复到本地并核对完整 SHA，保留原有三轮历史。

首次工作流服务器校验因 job env 不支持 `runner.temp` 失败；已用 actionlint 复现 RED，改为允许的 `github.workspace` 缓存路径后 GREEN。没有重跑失败版本掩盖错误，记录见 `../workflow-validation.md`。完整用户行为测试 29/29 通过，正式云端检查还运行锁文件安装、根路径和 Pages 子路径构建及导出核查。

浏览器工具期间出现连接超时，恢复同一个已选浏览器和已有标签后继续；已落盘截图实际复看，超时没有被当作网站故障或虚构验收证据。

实体手机、Safari、读屏器和低端设备未实测；没有 Lighthouse、LCP 或帧率成绩。原作品按设计概念呈现，材料工艺、样机与硬件性能没有被写成已验证成果。审查暂缓一项桌面 Lenis 生命周期测试补强，详见 `../whole-branch-review.md`；所有执行裁决见 `../implementation-record.md`。
