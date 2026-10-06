import media from './media.json';
import { caseSections } from './case-sections.js';
export const portfolio = {
  author: '曹佳航',
  email: '3600376954@qq.com',
  phone: '13333384178',
  resume: '/downloads/resume-cao-jiahang.pdf',
  projects: [
    { slug: 'walltime', number: '01', title: '壁时', english: 'WALLTIME', kind: '智能产品 · CMF · 交互', year: '2026', summary: '让时间从提醒，变成陪伴。', description: '以玉璧为形，以节气为序。把时间、光影与低打扰反馈，融入一件东方桌面器物。', cover: media.walltimeFront, sections: caseSections.walltime },
    { slug: 'cooling-fan', number: '02', title: '手机散热风扇', english: 'COOLING FAN', kind: '消费电子 · 结构表达', year: '2025', summary: '把性能，写进结构。', description: '围绕移动游戏场景，组织横向夹持、制冷控制与红黑 CMF，让功能形成清晰的视觉语言。', cover:media.coolingFan, sections:caseSections['cooling-fan'] },
    { slug: 'pill-box', number: '03', title: '智能药盒', english: 'MAGNETIC PILL BOX', kind: '健康产品 · 使用流程', year: '2026', summary: '把日常动作，变得自然。', description: '磁吸开合、四个独立药仓与侧边释放，重新组织一件随身用品的取用体验。', cover:media.pillBox, sections:caseSections['pill-box'] },
    { slug: 'fuling-packaging', number: '04', title: '涪陵榨菜', english: 'FULING PACKAGING', kind: '地域文化 · 品牌包装', year: '2026', summary: '让地域文化，一眼被认出。', description: '从青菜头、山城地貌与传统工艺中提炼视觉资产，让品牌、系列与陈列形成同一个故事。', cover:media.fulingBrand, sections:caseSections['fuling-packaging'] }
  ],
  archive: [
    {title:'无线鼠标', kind:'连续曲面 / Rhino · KeyShot', ...media.mouse},
    {title:'游戏手柄', kind:'消费电子 / 建模与渲染', ...media.gameController},
    {title:'无线蓝牙耳机', kind:'小型数码 / CMF 表达', ...media.earbuds},
    {title:'便携式果汁机', kind:'生活产品 / 材质与结构', ...media.juicer}
  ]
};
