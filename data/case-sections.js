import media from './media.json';
export const caseSections = {
  walltime: [
    {id:'question',label:'设计问题',eyebrow:'01 / THE QUESTION',title:'查看时间，能否不再是一次打断？',text:'手机把时间、消息与任务放在同一块屏幕里。壁时从这个日常体验出发，提出一个设计问题：让时间信息安静地存在，让回应发生在需要它的时候。',quote:'让时间成为生活的节奏，\n而不是新的催促。'},
    {id:'concept',label:'文化起点',eyebrow:'02 / THE ORIGIN',title:'以玉璧为形，以节气为序。',text:'文化被放进比例、结构和信息组织中。圆环建立秩序，二十四段外环对应节气，光带承担状态提示；东方时间观由此成为产品逻辑的起点。',ideas:[{title:'玉璧',text:'圆环、中孔与秩序感，定义器物的核心比例。',symbol:'ring'},{title:'节气',text:'以二十四段模块，表达自然时间的循环。',symbol:'seasons'},{title:'光环',text:'用柔和的明暗变化，表达不同的陪伴状态。',symbol:'light'}]},
    {id:'form',label:'造型推导',eyebrow:'03 / FORM & PROPORTION',title:'从圆环，到一件完整的桌面器物。',text:'中央显示模组聚合时间与节气信息，外环建立识别，底座提供稳定的视觉重心。通过比例推敲，将传统形态转化为当代产品语言。',media:[media.walltimeFront,media.walltimeDetail,media.walltimeProcess]},
    {id:'cmf',label:'材质与光',eyebrow:'04 / CMF & LIGHT',title:'墨漆黑的深度，描金色调的精度。',text:'以深色高光基座、金色线条与玉白透光视觉形成层次，让光效成为状态的一部分。这里呈现的是 CMF 视觉提案；具体材料与制作工艺仍需要样机验证。',tone:'dark',media:[media.walltimeScene],swatches:[{name:'墨漆黑',color:'#101210',detail:'深色与高光的对照'},{name:'描金色调',color:'#c6a76c',detail:'外环与纹样的精细线条'},{name:'玉白',color:'#f4f1e9',detail:'柔和的透光视觉'},{name:'星夜蓝',color:'#4a87b8',detail:'状态与界面的冷光表达'}]},
    {id:'interaction',label:'交互体验',eyebrow:'05 / QUIET INTERACTION',title:'把复杂的响应，放进自然的动作。',text:'本体承担靠近、唤醒、旋转选择与快速反馈的交互提案。手机界面用于场景灯光、节气与日程设置，减少桌面上的操作负担。',steps:[['靠近','进入桌面空间'],['唤醒','环形光效回应'],['选择','旋转外环切换'],['回应','信息、光与语音协同'],['休息','回到安静的陪伴']],media:[media.walltimeApp]},
    {id:'system',label:'产品系统',eyebrow:'06 / SYSTEM & DETAILS',title:'形式之下，是清楚的系统层级。',text:'外环、显示模组与底座逐层展开，表达部件之间的功能关系。结构为概念提案，待样机验证。',media:[media.walltimeFeatures,media.walltimeExploded]},
    {id:'motion',label:'动态概念',eyebrow:'07 / THE ATMOSPHERE',title:'用光影，表达陪伴的氛围。',text:'一段 AI 辅助生成的动态概念，探索器物与桌面空间的光影关系。',video:{src:'/media/walltime-concept.mp4',poster:media.walltimeScene,caption:'AI 辅助动态概念 · 非实物拍摄'}},
    {id:'result',label:'最终呈现',eyebrow:'08 / THE OUTCOME',title:'让时间与自然同频。',text:'文化、造型、CMF 与交互，共同形成壁时的桌面体验提案。材料样板、交互原型与结构样机，将是下一步的验证重点。',media:[media.walltimeFinal]}
  ],
  'cooling-fan':[
    {id:'context',label:'使用场景',eyebrow:'01 / CONTEXT',title:'围绕游戏握持，重新组织散热配件。',text:'设计从移动游戏场景出发，让手机、夹持结构与散热模组形成一体化造型。横向结构把握持与控制区域分开，建立清楚的功能分区。',media:[media.coolingFan]},
    {id:'structure',label:'结构与控制',eyebrow:'02 / STRUCTURE',title:'让性能感，来自结构本身。',text:'风道、环形开口、握持纹理与独立控制区域构成视觉重心。红黑配色与冷光细节强化数码产品的速度感，细节渲染用于表达部件和控制逻辑。',media:[media.coolingFanDetail]},
    {id:'result',label:'设计回看',eyebrow:'03 / REFLECTION',title:'功能清楚，造型才有力量。',text:'产品造型、建模与 CMF 形成了完整提案。散热效率、握持体验与夹持兼容性，需要通过样机和真实使用验证。',quote:'从夹持、控制到风道，\n让每一处形态都有功能的理由。'}
  ],
  'pill-box':[
    {id:'context',label:'设计机会',eyebrow:'01 / CONTEXT',title:'把每天重复的取用，变得清楚而自然。',text:'随身携带与单次取药构成设计起点。磁吸开合、四个独立药仓与侧边释放，把收纳、查看和取用分解为清楚的动作。',steps:[['携带','贴合随身用品'],['查看','观察各仓余量'],['释放','侧边选择单仓'],['闭合','回到收纳状态']]},
    {id:'design',label:'完整方案',eyebrow:'02 / DESIGN PROPOSAL',title:'围绕一个动作，组织整个结构。',text:'透明磨砂视觉让余量可见，独立药仓帮助区分收纳；手机背部吸附与开盖支架是展板中的使用设想。所有结构与场景图均为概念设计表达。',media:[media.pillBox]},
    {id:'result',label:'设计边界',eyebrow:'03 / REFLECTION',title:'轻量的日常体验，需要严谨的验证。',text:'取用流程、部件关系与 CMF 已形成概念方案。后续将重点验证材料接触安全、密封、磁吸稳定性与机械寿命。'}
  ],
  'fuling-packaging':[
    {id:'culture',label:'地域起点',eyebrow:'01 / CULTURAL ORIGIN',title:'让一份地方风味，有可识别的形象。',text:'从青菜头、山城地貌、传统工艺与日常下饭场景中提炼视觉资产。地域元素在图形、色彩与文字中形成一致的品牌语言。',ideas:[{title:'原料',text:'以青菜头与自然色彩建立产品识别。',symbol:'ring'},{title:'地域',text:'山城与江水意象组织场景和插画。',symbol:'seasons'},{title:'工艺',text:'传统纹样、字体与细节传递地方文化。',symbol:'light'}]},
    {id:'brand',label:'品牌系统',eyebrow:'02 / VISUAL SYSTEM',title:'从一个符号，到一个系列。',text:'品牌标识、字体、色彩、插画与不同口味的包装共同构成系列。在统一的视觉骨架下，用色彩和内容区分单品。',media:[media.fulingBrand]},
    {id:'application',label:'包装应用',eyebrow:'03 / PACKAGING & DISPLAY',title:'让视觉，在结构与陈列中延续。',text:'完整展板呈现包装结构、陈列与衍生应用。以可理解的结构关系和一致的地域视觉，连接单品包装与货架整体。',media:[media.fulingProduction]},
    {id:'result',label:'设计回看',eyebrow:'04 / REFLECTION',title:'文化表达，最终回到日常消费。',text:'品牌、系列包装与陈列形成了一致的视觉提案。后续打样重点在印刷色彩、材质、折叠结构与货架呈现。'}
  ]
};
