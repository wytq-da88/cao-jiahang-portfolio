# 沉浸式作品集改版

2026-10-07 至 2026-10-08。用户明确要求参考优秀设计师、互联网产品设计师和创意开发者的个人站点，增加显著动效与产品场景；网站不再采用家乡或地域文化作为总视觉方向。

## 参考与证据边界

| 作者与官方来源 | 核验内容 | 本轮采用的方向 |
| --- | --- | --- |
| [Brian Lovin](https://brianlovin.com/about) | 作者介绍列出 GitHub（2018–2022）、Facebook（2015–2017）等经历。不能据此推断当前网页是获得录用的那版作品集。 | 清楚的身份、项目与联系路径。不是主视觉样板。 |
| [Julius Tarng](https://tarng.com/) | 作者介绍写到面向 Facebook、Instagram、Oculus、WhatsApp 的工具团队，以及工业设计和 HCI 背景。另有 [Meta 设计原站署名](https://facebookmicrosites.github.io/design/old/handskit)。 | 工业设计可以与交互实验并置；通过可操作的体验表达个性。 |
| [Jason Yuan](https://jasonyuan.design/)、[作者工作室](https://mmtaphor.com/) | 作者网站与工作室介绍支持 Apple、Sony Music 等项目经历。主站存在客户端渲染限制，未将文字抓取当作完整视觉核验。 | 物理产品与数字界面的跨媒介叙事。 |
| [Rauno](https://rauno.me/craft)、[Vercel 作品说明](https://rauno.me/craft/vercel) | 作者公开作品与工作经历；不把 Vercel 经历说成 Apple 或 Meta 经历。 | 有层次、可中断的运动与渐进增强。 |
| [Emil Kowalski](https://emilkowal.ski/)、[动画实践](https://emilkowal.ski/ui/7-practical-animation-tips) | 官网介绍 Linear、此前 Vercel；公开动画文章。 | 清楚的运动起点、柔和减速、状态切换反馈。 |
| [Paco Coursey](https://paco.me/craft) | 作者官网介绍 Linear 与此前 Vercel 的工作。 | 简明入口、细致的悬停和键盘反馈。 |
| [Bruno Simon](https://bruno-simon.com/) | 官方站点提供可驾驶 3D 世界、控制与画质选项，并链接开源代码。 | 让访问者实际操作。没有复制驾驶游戏或引入整套 WebGL 项目。 |
| [Dennis Snellenberg](https://dennissnellenberg.com/) | 浏览器实际检查到全幅人物、巨型姓名和简洁导航。网页工具 403、浏览器初次导航超时后页面仍正常加载；以实际页面为准。自由设计师，不捏造大厂雇佣经历。 | 大幅首屏、超大字排、作品图像作为视觉中心。 |

参考均为作者官方来源。没有证据证明某个当前网站直接导致作者获聘，因此不作此类承诺；没有搬运他人项目图、付费模板或未经许可源码。此前已交付的三轮改版记录继续保留，本轮是用户明确改向后的追加升级。

## 实际设计与实现

- 深黑与冷蓝的画廊式界面；无衬线大字、CJ 字标，更新首页与分享元数据。
- 壁时的电影感首屏：桌面指针微视差、随滚动推进的镜头、浮层字排；触屏和减少动态模式保留清晰静态构图。
- 四季可交互场景：春、夏、秋、冬原生按钮与方向键可操作滑杆，画面载入成功后一起更新图与标题，失败保留已有图并允许重试。
- 四个真实设计项目重新编排为大图与交错叙事；原始展板保持完整，案例仍保留概念、材料提案与实物验证边界。
- 首页和壁时案例页均接入新体验；原站 `wytq-da88.github.io/` 不变。

生成场景统一标注「AI 场景演绎」，不称实拍，不增加不存在的产品功能、实物工艺、客户或测试数据。图像是对原设计的视觉演绎，精确结构与工艺以原案例图为准。

## 文件

网页素材位于 `public/media/generated/`，5 张 1672 × 941 WebP，总计约 1.23 MiB；首屏仅优先载入主图，四季按需切换。详细散列见 `generated-assets.json`。原始 PNG 保存在 `D:/workspace/.cache/portfolio-tools/immersive-assets-20261007/`。

场景提示词与生成约束见 `prompts.md`；验收与发布结果见 `verification.md`。
