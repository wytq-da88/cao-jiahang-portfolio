# 第三方来源与许可

站点代码依赖 Next.js、React、Motion / framer-motion、Lenis（MIT）；测试使用 Vitest、Testing Library、jsdom（MIT）；网页派生图使用 Sharp（Apache-2.0）。各依赖的完整许可证保留于包内，固定版本见锁文件。

采用的是开源库与设计方法，非整站模板搬运。作者作品不因这些库的许可而被重新许可。

## 设计方法参考

- [Recent / Skills](https://recent.design/skills)：实际入口；前次讨论的 Godly 现跳转到 Recent。
- [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)，Apache-2.0。核验 blob `a5333457c414d20d625f307df945842c0952ecc3`。采用明确视觉立场、避免通用模板、统一排版的思路。
- [Emil Kowalski apple-design](https://github.com/emilkowalski/skills)，MIT。核验 blob `adf68c517f2d7d2781587d619de07f4de286da57`。采用内容优先、产品主角、每一屏解释一个重点的思路。
- [Emil Kowalski review-animations](https://github.com/emilkowalski/skills)，MIT。核验 blob `577a64397267ce20960de2202950594d5bd6f9b6`。采用可打断、轻量、按用户减少动态偏好降级的思路。
- [Impeccable / polish & distill](https://github.com/pbakaus/impeccable)，Apache-2.0。核验 blob `f2146990505863574e3c8298613a37d4c31ee73c`、`bc0f6e96472be319e27e62e681975d3716e7b43a`。采用减少重复信息、统一尺度、收敛视觉细节的方法。
- [Apple](https://www.apple.com/) 与 [Anthropic](https://www.anthropic.com/) 官网为视觉与叙事参考；未下载或复用其品牌资产。

中文标题使用 [Noto Serif SC 官方源字体](https://github.com/google/fonts/tree/main/ofl/notoserifsc) 的500字重网页子集，SIL Open Font License 1.1；完整许可保留于 `public/fonts/OFL.txt`，源哈希和生成信息见 `docs/font-source.json`。字体自托管，不请求外部字体服务。

详细原始链接、版本与三轮改写提示词保留在本仓库 `docs/references/`。提示词为针对本作品集的新写法，不声称它们出现在先前 ChatGPT 对话里。

React Bits 的许可包含 Commons Clause，商业 Pro 模板也有再分发限制，因此未整仓移植。Poly Haven 的素材许可按具体资产核验；本版不需要额外 HDRI、纹理或模型。
