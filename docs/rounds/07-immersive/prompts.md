# 壁时场景提示词

以下为本轮生成约束整理成的可复用提示词组，供后续统一追加素材，并非第三方网站的私有提示词。实际使用内置 Image Gen，以用户原始壁时正面和细节图为视觉参考。图片只作场景演绎，网页的正文、产品事实和交互由代码实现。

## 共同约束

> Create a premium industrial-design portfolio campaign image, 16:9 landscape. Use the supplied WALLTIME product reference. Preserve the recognisable circular black-and-gold segmented face, engraved details, blue central display and low oval base. The product must remain the unmistakable focal point. Keep the camera nearly frontal, with the product on the right at approximately 65% of the frame and around 56% of frame height. Keep the left 42% visually quiet and dark for separately typeset website copy. Realistic materials, controlled reflections, high-end editorial lighting, clear silhouette. No additional text, logo, website UI, decorative frames, people, traditional interior or regional landmarks. Do not invent new buttons, mechanics or accessories. This is a conceptual AI scene, not evidence of a manufactured physical prototype.

## 主场景 / walltime-cinematic.webp

> A cinematic graphite architectural studio. Place the clock on a dark polished plinth with a mirror-like wet black floor. Cold blue shafts of light and restrained volumetric haze, subtle reflections. Strong separation between the engraved gold edge and the dark surroundings. Immersive product-launch atmosphere, clean negative space on the left, product on the right.

## 春 / walltime-spring.webp

> Spring inside an atmospheric forest glasshouse. Deep green tones, young leaves beyond the glass, soft morning haze and fresh diffused light. The clock sits on a refined dark plinth. Nature surrounds the product without covering its face. Maintain the same frontal camera, scale, right-side placement and quiet dark left area.

## 夏 / walltime-summer.webp

> A tranquil blue coastal architectural space in summer. Sunlight and subtle water caustics, a cool reflective surface, open distant sea and luminous cyan highlights. Keep the product face and base legible, the left side restrained, and maintain the common camera and composition.

## 秋 / walltime-autumn.webp

> A contemporary architectural space beside an autumn woodland. Amber light, warm copper leaves and restrained reflections on dark surfaces. Rich but controlled contrast, precise gold edges, quiet cinematic atmosphere. Preserve the common camera, product size and right-side placement.

## 冬 / walltime-winter.webp

> A moonlit winter setting with ice, frost and deep blue atmospheric light. A refined cold stone or ice-like plinth, subtle crystalline reflections and distant winter scenery. Keep the circular clock intact and dominant, with a dark empty left area. Preserve the common frontal camera and scale.

## UI 实施提示词

> 以工业设计师的真实项目为中心，做一个深黑、冷蓝、超大无衬线字排的个人作品集。首屏使用电影感产品场景与随滚动推进的镜头；保留原生滚动和键盘导航，减少动态时静止。四季互动使用手动按钮与离散滑杆，图和标题同步切换，加载失败能重试。主项目占大幅图像，其余项目交错编排，展板完整展示。每张 AI 场景有清楚标注。保留原项目事实、详细设计过程、简历和联系方式，不增加虚构的实物验证、客户和获奖经历。避免地域旅游符号、古典展馆式总风格、无意义粒子、遮挡产品的特效和滚动劫持。
