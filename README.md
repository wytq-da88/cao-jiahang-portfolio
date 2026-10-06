# 曹佳航 · 东方器物研究室

以「壁时」为主角的个人工业设计作品集。四个独立案例与消费电子练习，使用作者原有渲染、展板与简历。新项目独立于 [原作品集](https://wytq-da88.github.io/)。

[查看新版作品集](https://wytq-da88.github.io/cao-jiahang-portfolio/) · [三轮优化与线上验收](docs/rounds/05-live.md)

## 开发

Node 22。依赖版本固定于 package-lock.json。

```sh
npm ci
npm run dev
npm test
npm run build
npm run check:export
npm run preview
```

生产 GitHub Pages 构建设置 `NEXT_PUBLIC_BASE_PATH=/cao-jiahang-portfolio`；本地根目录构建留空。环境变量必须在构建时设置，改后重新构建。预览脚本按相同前缀提供静态文件。

本机 `.npmrc` 将 npm 缓存固定到 D 盘。其他机器可通过 `npm_config_cache` 覆盖缓存路径；GitHub Actions 已设置为 runner 的独立缓存，项目构建使用 Node 22.23.3。

素材重新生成：`npm run assets -- "D:/workspace/03-Portfolio-Career/portfolio-site/public"`。只读取旧文件，复制原件、生成适合网页的派生图并输出 SHA-256 追溯清单；原件不改写。

## 内容维护

作者与项目入口在 `data/portfolio.js`，各案例章节在 `data/case-sections.js`；展示图、原图尺寸与路径在 `data/media.json`。原始作品位于 `public/media/originals/`。简历、邮箱与电话来自原站公开资料。

中文标题使用本地 Noto Serif SC 子集。更新中文文案后，可用 fontTools/brotli 和官方源 TTF 执行 `python scripts/subset-font.py /path/to/NotoSerifSC.ttf`；文件参数必须提供，来源与许可见 `docs/font-source.json`。

「壁时」为设计概念；原效果图中的界面文字是视觉示意，视频为带原水印的 AI 辅助动态概念演示。不将渲染、结构概念或工艺视觉提案表述为已完成的硬件、量产或实物验证。

三轮变更、真实浏览器截图与检查范围记录于 `docs/rounds/`。设计规格和实施计划位于 `docs/superpowers/`。原站基线记录于 `docs/old-site-baseline.json`。

## 发布

独立仓库为 `wytq-da88/cao-jiahang-portfolio`，Pages 地址为 `https://wytq-da88.github.io/cao-jiahang-portfolio/`。该地址在工作流成功与线上验收后才视为发布完成，原站仍由原仓库维护。

2026-10-06 已完成首次成功部署与线上验收，具体源码提交、Actions run、原站保护和真实截图见发布记录。

PR 运行测试、根路径及子路径构建与导出检查；仅 main 可上传通过检查的 `out/` 并部署。官方 GitHub Actions 固定到经核验的提交，记录在 `docs/action-sources.json`。Pages 使用 GitHub Actions 来源，发布流程参考 [GitHub 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 使用与授权

作品图片、视频、文字和简历版权属于作者；此仓库不自动授予这些内容的再分发权。第三方库与设计方法出处见 `THIRD_PARTY_NOTICES.md`。没有复制完整商业模板或 Apple、Anthropic 官网的图片/字体/品牌资产。
