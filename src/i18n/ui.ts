// 全站界面文字字典。组件里不写死文字，统一从这里取。
// 新增一条：en 和 zh 都要写。

export const languages = { en: 'EN', zh: '中' } as const;
export type Lang = keyof typeof languages;
export const langs = Object.keys(languages) as Lang[];
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'site.name': "Z's Place",
    'site.title': 'Archive (ZQ)',
    'nav.index': 'Index',
    'nav.info': 'Information',
    'nav.contact': 'Contact',
    'nav.surprise': 'Surprise',
    'nav.lang': 'Language',
    'index.view.list': 'List',
    'index.view.grid': 'Grid',
    'index.col.id': 'ID',
    'index.col.title': 'Title',
    'index.col.type': 'Type',
    'index.col.tools': 'Tools',
    'index.col.year': 'Year',
    'work.id': 'ID',
    'work.year': 'Year',
    'work.type': 'Type',
    'work.tools': 'Tools',
    'work.dimensions': 'Dimensions',
    'work.client': 'Client',
    'work.collaborators': 'Collaborators',
    'work.recognition': 'Recognition',
    'work.prev': 'Previous',
    'work.next': 'Next',
    'info.placeholder': 'Introduction coming soon.',
    'info.contact': 'Contact',
    'info.cv': 'CV',
    'cv.placeholder': 'CV layout placeholder. Used only to render the PDF.',
  },
  zh: {
    'site.name': "Z's Place",
    'site.title': 'Archive (ZQ)',
    'nav.index': '目录',
    'nav.info': '信息',
    'nav.contact': '联系',
    'nav.surprise': '惊喜',
    'nav.lang': '语言',
    'index.view.list': '列表',
    'index.view.grid': '网格',
    'index.col.id': '编号',
    'index.col.title': '标题',
    'index.col.type': '类型',
    'index.col.tools': '工具',
    'index.col.year': '年份',
    'work.id': '编号',
    'work.year': '年份',
    'work.type': '类型',
    'work.tools': '工具',
    'work.dimensions': '尺寸',
    'work.client': '客户',
    'work.collaborators': '合作者',
    'work.recognition': '荣誉',
    'work.prev': '上一个',
    'work.next': '下一个',
    'info.placeholder': '简介待补充。',
    'info.contact': '联系方式',
    'info.cv': '简历',
    'cv.placeholder': 'CV 排版占位页，仅用于生成 PDF。',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

// 作品类型（type）：值 → 中英对照。新增类型时同时改 src/content.config.ts 里的 workTypes。
export const typeLabels = {
  identity: { en: 'Identity', zh: '视觉识别' },
  editorial: { en: 'Editorial', zh: '编辑设计' },
  'social-media': { en: 'Social Media', zh: '社交媒体' },
  'art-direction': { en: 'Art Direction', zh: '艺术指导' },
  motion: { en: 'Motion', zh: '动态' },
  product: { en: 'Product', zh: '产品' },
  web: { en: 'Web', zh: '网页' },
  art: { en: 'Art', zh: '艺术' },
} as const;

// 工具（tools）：值 → 中英对照。不在这里的工具直接显示原值。
export const toolLabels: Record<string, { en: string; zh: string }> = {
  indesign: { en: 'InDesign', zh: 'InDesign' },
  illustrator: { en: 'Illustrator', zh: 'Illustrator' },
  photoshop: { en: 'Photoshop', zh: 'Photoshop' },
  'after-effects': { en: 'After Effects', zh: 'After Effects' },
  figma: { en: 'Figma', zh: 'Figma' },
  blender: { en: 'Blender', zh: 'Blender' },
  risograph: { en: 'Risograph', zh: '孔版印刷' },
};
