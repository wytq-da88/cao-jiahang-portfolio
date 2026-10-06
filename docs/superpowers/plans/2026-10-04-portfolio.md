# 曹佳航作品集三轮改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在独立新仓库完成“东方器物研究室”方向的曹佳航作品集，实际执行三轮优化、部署和验收，保留原站。

**Architecture:** 使用 Next.js App Router 静态导出，首页与四个独立案例由同一份项目数据生成。客户端交互仅用于滚动、移动导航、图片画廊与按需视频；原生图像和链接构成可直接阅读的基础。

**Tech Stack:** Node 22、Next.js、React、CSS、framer-motion、Lenis；Vitest 与 Testing Library 验证功能逻辑，CUA 浏览器验证真实访问路径，GitHub Actions 发布 Pages。

**Spec:** ../specs/2026-10-04-portfolio.md

**执行安排：** 默认由当前会话逐项实施并记录每轮变化，用户可在审阅时调整。2026-10-06：五项任务已实际执行，三轮变更与独立上线证据见docs/rounds/05-live.md。

## Global Constraints

- 所有本机新增、修改、构建、缓存、截图和导出产物均位于 D:\workspace 或其子目录。新项目根目录为 D:\workspace\03-Portfolio-Career\cao-jiahang-portfolio。
- 原项目 D:\workspace\03-Portfolio-Career\portfolio-site、原仓库 wytq-da88/wytq-da88.github.io 和原网站保持原样；其既存未跟踪 .netlify/ 保留。
- 拟新仓库为 wytq-da88/cao-jiahang-portfolio，独立 Pages 路径为 /cao-jiahang-portfolio。当前查询没有解析到该仓库，创建前再次核验，不覆盖同名已有仓库。
- 仅迁移作品集需要的作品、简历与内容；排除 public/zeshang-ai/、.netlify/、账号资料、旧构建目录及旧测试缓存。
- 工艺名称的澄清属于文案事实核对，已确认的视觉方向可以继续实现。确认真实工艺前使用“东方器物”“CMF”“墨漆黑”“描金色调”等已可对应素材的表述，不声称大漆实物制作、非遗传承、量产或实验已完成。
- 不新增不存在的项目、调研人数、获奖、就业经历、可测量成效或硬件实现。保留现有作品名“壁时”，概念、渲染、界面演示与实物成果分清楚。
- 初版采用 Next.js App Router 静态导出、React、CSS、framer-motion 与 Lenis；本机和 CI 的 Node 主版本为 22。旧锁文件核验基线：Next 16.2.9、React/React DOM 19.2.7、framer-motion 12.42.0、Lenis 1.3.24。执行时核验可用补丁及依赖审计，最终版本写入新 package-lock.json；不照搬未使用的 three、R3F 或 GSAP 依赖。
- 静态配置为 output: "export"、trailingSlash: true、images.unoptimized: true；生产 NEXT_PUBLIC_BASE_PATH 为 /cao-jiahang-portfolio，本地根路径模式为 ""。静态资源、简历、原图、站点元数据均经过路径核验。
- 首屏和正文默认可见；没有遮挡内容的加载屏。图片与原生链接在脚本未运行时仍可使用。
- 不整仓搬运受再分发限制的模板。主要开源复用为 Motion、Lenis；引用的设计提示词保留原始链接、版本与许可记录。

## Review Focus

1. GitHub Pages 子路径与案例直接刷新：图片、简历、原图和 canonical 路径正确，未知案例呈现404。
2. 键盘与触摸输入：菜单/画廊可打开和关闭，焦点恢复，入口44px，操作不依赖悬停。
3. 减少动态偏好及运行时偏好变化：关闭视差和平滑滚动，正文与导航可用。
4. 图片或视频失败、慢加载及未运行脚本：保留文本、封面、原生原图入口和明确说明。
5. 中文长标题与窄屏：390、768、1440px下无溢出、遮挡、错误裁切或不可读正文。

---

## 文件结构

以下路径均相对新项目根目录。

| 文件 | 职责 |
| --- | --- |
| app/layout.jsx、app/globals.css | 全站语言、元数据与视觉样式 |
| app/page.jsx | 首页结构 |
| app/projects/[slug]/page.jsx、app/not-found.jsx | 四个静态案例与未知路径反馈 |
| data/portfolio.js | 作者、项目内容、原图与展示图映射 |
| lib/site-path.js | 本地/Pages 路径统一处理 |
| components/SiteHeader.jsx、HomePage.jsx | 全站导航与首页 |
| components/CasePage.jsx、CaseNav.jsx | 案例结构及章节导航 |
| components/MediaGallery.jsx、ConceptVideo.jsx | 原图画廊、按需视频和失败反馈 |
| components/MotionProvider.jsx | 平滑滚动、减少动态偏好与生命周期管理 |
| public/media/、public/downloads/ | 网站展示素材及简历；原图保留可追溯映射 |
| scripts/prepare-assets.mjs、scripts/check-export.mjs | 派生网页素材和导出资源检查 |
| tests/site-path.test.js、tests/media-gallery.test.jsx、tests/site-header.test.jsx | 路径、画廊和菜单的功能测试 |
| .github/workflows/pages.yml、next.config.mjs | 新站静态构建与Pages部署 |
| README.md、THIRD_PARTY_NOTICES.md、docs/rounds/ | 维护说明、来源、三轮截图和验收记录 |

组件与工具共用接口：

- withBasePath(path: string, basePath: string = process.env.NEXT_PUBLIC_BASE_PATH || ""): string；根路径只加一次前缀，http(s)、mailto、tel 与本页片段保持原样。
- portfolio.projects: Array<{slug,title,summary,kind,cover,sections}>；四个 slug 为 walltime、cooling-fan、pill-box、fuling-packaging。
- MediaItem: {src,originalSrc,alt,caption,width,height}；src 用于正文，originalSrc 用于放大，均由真实素材映射而来。
- MediaGallery({items: MediaItem[]})；基础输出为原图链接，客户端增强为模态画廊。
- ConceptVideo({src,poster,caption})；默认为封面和播放入口，不在首页自动请求视频。
- CaseNav({sections: Array<{id,label}>})；链接目标来自案例数据，返回首页链接固定可见。

## 第一轮：内容与视觉身份

### Task 1：建立独立项目和可访问的静态首页

**Files:** 新建 package.json、package-lock.json、next.config.mjs、data/portfolio.js、lib/site-path.js、app/layout.jsx、app/page.jsx、app/globals.css、components/SiteHeader.jsx、components/HomePage.jsx、tests/site-path.test.js、README.md、THIRD_PARTY_NOTICES.md。

**Interfaces:** 读取原站已经核验的作品、简历、联系信息与来源记录；产出 withBasePath、portfolio 和可构建首页，供案例与媒体组件复用。

- [x] **Step 1:** 记录原仓库 HEAD、状态及远端快照；确认新目录与拟新仓库未占用。建立独立本地项目，npm缓存指定D:\workspace\.cache\npm-portfolio，开发分支为codex/portfolio-rebuild；不在原项目安装或构建。
- [x] **Step 2:** 先写路径功能测试：根模式、/cao-jiahang-portfolio模式、已有前缀不重复、mailto/tel/http(s)/#片段保持原样；执行测试，确认缺少工具实现时失败。
- [x] **Step 3:** 实现路径工具、静态配置、数据和首页。使用规格中的色值、字号、原作品名称与主张；主图和主要行动分区，四个核心项目及其他作品有入口。
- [x] **Step 4:** 运行路径测试和npm run build，确认通过并产生out/index.html；查看导出HTML中的作者、主张、项目标题、原生链接与主图均存在。
- [x] **Step 5:** 在真实浏览器检查首页1440×900和390×844；首屏内容不被遮罩或加载屏挡住，主入口可操作。记录证据后提交这一任务。

### Task 2：完成四个案例与作品材料

**Files:** 新建 app/projects/[slug]/page.jsx、app/not-found.jsx、components/CasePage.jsx、components/MediaGallery.jsx的基础原图链接、components/ConceptVideo.jsx的静态封面、scripts/prepare-assets.mjs；修改data/portfolio.js、app/globals.css；生成public/media/、public/downloads/及docs/rounds/01-content.md。

**Interfaces:** 消费Task1的portfolio和withBasePath；产出四个静态案例、MediaItem素材映射及完整图文阅读路径，第二轮在其上增强交互。

- [x] **Step 1:** 从原站复制必要素材与现有简历，记录源路径、哈希、格式、尺寸和用途。优先复用已核验网页图；高分辨率展板按需生成保留完整内容的网页派生图，原图独立保留。
- [x] **Step 2:** 按规格写壁时章节和其他三个案例，generateStaticParams固定四个slug，未知slug不回退成错误项目；所有叙述有原材料依据。
- [x] **Step 3:** 正文媒体使用真实宽高和图注，原图链接可直接访问。造型推导映射到旧素材assets/walltime-process.jpg；显示概念界面和AI辅助视频的说明。
- [x] **Step 4:** 构建后直接访问并刷新四个案例；走通首页→案例→返回作品→其他项目→简历/联系，未知项目返回404。检查静态HTML和原生原图入口，不依赖交互增强才能阅读。
- [x] **Step 5:** 保存第一轮首页、壁时及移动端截图，填写docs/rounds/01-content.md的“采用哪些提示词方法、实际改动、内容依据、验证范围”，提交第一轮完整版本。

## 第二轮：产品叙事与交互

### Task 3：完成可打断的交互和动态降级

**Files:** 新建components/MotionProvider.jsx、components/CaseNav.jsx、tests/media-gallery.test.jsx、tests/site-header.test.jsx；增强components/MediaGallery.jsx、ConceptVideo.jsx、SiteHeader.jsx、HomePage.jsx、CasePage.jsx、app/globals.css；记录docs/rounds/02-motion.md。

**Interfaces:** 消费已有MediaItem、CaseNav章节数组和页面结构；产出平滑滚动、模态画廊、移动菜单、按需视频及减少动态版本，供第三轮验收。

- [x] **Step 1:** 先写功能测试：从指定图片打开画廊、前后切换、Escape关闭并恢复触发点焦点；移动菜单展开状态、Escape关闭、选择入口后收起。先运行并确认未实现行为失败。
- [x] **Step 2:** 实现原生dialog画廊与菜单，保持原图链接的基础能力，按钮至少44px。使用真实项目图注，切换和关闭不触发错误页面跳转。
- [x] **Step 3:** 将Lenis限制在适合的桌面滚轮场景，锚点与焦点同步，浏览器返回可用；偏好reduce及偏好运行时变化都正确停用和清理。手机保留原生触摸滚动。
- [x] **Step 4:** 编排壁时全景→细节→推导→交互→结构的镜头衔接，导航和按钮反馈160—220ms，章节视觉过渡不超过600ms；正文初始可见。视频点击后加载，播放失败保留封面与说明。
- [x] **Step 5:** 运行功能测试；在真实浏览器使用鼠标、触摸宽度与键盘操作画廊和菜单，验证焦点范围与恢复。实际检查普通动态和reduce两种路径；单元测试不代替原生dialog验收。
- [x] **Step 6:** 保存第二轮证据，逐项记录apple-design方法的用途、可打断操作与降级状态，提交第二轮版本。

## 第三轮：精修、验证和交付

### Task 4：验证真实阅读、资源与性能

**Files:** 新建scripts/check-export.mjs、docs/rounds/03-validation.md；必要时修正app/globals.css、各交互组件、数据映射和派生图片；完善页面metadata。

**Interfaces:** 消费Task1—3构建输出与所有MediaItem；产出可发布的静态包、资源检查报告、浏览器验收记录和性能测量记录。

- [x] **Step 1:** 导出检查读取所有HTML，验证站内图片、视频、样式、原图、简历、链接目标与片段ID存在；故意给检查器提供一个错误资源路径的fixture，确认其能报告失败，再检查真实导出。
- [x] **Step 2:** 分别以空basePath和/cao-jiahang-portfolio构建，运行npm test及导出检查；将子路径构建挂载到同名本地子目录后，直接访问和刷新每个案例。
- [x] **Step 3:** 在390×844、768×1024、1440×900走完主要路径；检查中文换行、图片完整性、44px入口、正文对比度、键盘焦点及减少动态偏好。模拟图片/视频不可用或网络延迟，观察替代内容；需要网络模拟能力时先检查工具支持，不能仅凭代码声称验收通过。
- [x] **Step 4:** 检查首页主图加载优先级、高清图与视频按需加载、图片占位尺寸；使用可用的标准性能测量工具记录环境、结果和限制，修复测得的问题，不伪造Lighthouse或帧率成绩。
- [x] **Step 5:** 校验标题、描述、canonical、Open Graph、简历文件与公开联系链接；运行依赖审计，解决与本次引入依赖相关的阻断问题。保存第三轮对照截图和完整验收范围。
- [x] **Step 6:** 将三轮提示词及原始来源与实际变化一一对应，自审所有显式要求，提交第三轮候选发布版本。

### Task 5：新仓库和独立Pages发布

**Files:** 新建.github/workflows/pages.yml；完善README.md、THIRD_PARTY_NOTICES.md及docs/rounds/03-validation.md。

**Interfaces:** 消费通过Task4的子路径静态包与锁文件；产出新的GitHub仓库、新Pages网址与线上验证证据，原站仍可访问。

- [x] **Step 1:** 重新核对目标仓库名称和当前GitHub账号；仅创建wytq-da88/cao-jiahang-portfolio，不写入旧仓库。新仓库保留三轮提交记录，默认发布分支为main，开发工作分支保留codex/前缀。
- [x] **Step 2:** 创建仅作用于新仓库的workflow，使用Node22、npm ci、测试、子路径构建、导出核查与Pages artifact；配置Pages为GitHub Actions来源。
- [x] **Step 3:** 先完成新分支变更审阅及最终验证，再发布通过的版本。若创建PR，必须将其附加到本聊天；不能将未通过的构建当作发布成功。
- [x] **Step 4:** 等待确切workflow run完成；只有该run成功且线上页面可访问才记录发布完成。失败时读取该run日志修复，不重复启动同一运行掩盖失败。
- [x] **Step 5:** 在新线上地址检查首页、四个案例刷新、主图、造型推导、画廊原图与简历下载；核对旧仓库没有本次提交、旧站仍可访问。记录最终网址、源码提交和线上证据。

## 完成条件与停止条件

完成需要三轮实际变化与记录、可维护源码、来源说明、新仓库、成功部署及与规格相符的验收证据。计划写完或本地构建成功不等于整个改版已完成。

实现中如果发现现有内容事实不足，保留准确的概念表述并列出待补资料；不阻断其他已授权功能。账号不可用、目标同名仓库归属不明或外部发布权限缺失时，先完成本地可审阅结果，再说明具体需要的输入。

## 计划自审

- 规格覆盖：原站保留、全部项目、代表作叙事、三轮方法与记录、开源来源和独立部署均有对应任务。
- 接口一致：Task1定义路径及数据，Task2定义媒体，Task3仅增强既有输出，Task4检查真实导出，Task5只操作新仓库。
- 五项Review Focus分别由Task3键盘/偏好检查、Task4子路径/失败/视口检查及Task5线上复核覆盖。
- 测试范围：只为路径、菜单、画廊和导出错误反馈等真实行为写测试；视觉排版用实际浏览器检查，不写重复实现的样式快照测试。
- 已依据用户确认逐项执行，并经过独立全分支审查、实际构建与线上发布验收；完成依据见三轮与发布记录。
