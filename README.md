# 曹佳航 · 东方器物研究室

以「壁时」为主角的个人工业设计作品集。四个独立案例与消费电子练习，使用作者原有渲染、展板与简历。新项目独立于 [原作品集](https://wytq-da88.github.io/)。

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

素材重新生成：`npm run assets -- "D:/workspace/03-Portfolio-Career/portfolio-site/public"`。只读取旧文件，复制原件、生成适合网页的派生图并输出 SHA-256 追溯清单；原件不改写。

## 内容维护

项目文字与章节在 `data/portfolio.js`；展示图、原图尺寸与路径在 `data/media.json`。原始作品位于 `public/media/originals/`。简历、邮箱与电话来自原站公开资料。

「壁时」为设计概念；原效果图中的界面文字是视觉示意，视频为带原水印的 AI 辅助动态概念演示。不将渲染、结构概念或工艺视觉提案表述为已完成的硬件、量产或实物验证。

三轮变更、真实浏览器截图与检查范围记录于 `docs/rounds/`。设计规格和实施计划位于 `docs/superpowers/`。原站基线记录于 `docs/old-site-baseline.json`。

## 使用与授权

作品图片、视频、文字和简历版权属于作者；此仓库不自动授予这些内容的再分发权。第三方库与设计方法出处见 `THIRD_PARTY_NOTICES.md`。没有复制完整商业模板或 Apple、Anthropic 官网的图片/字体/品牌资产。
