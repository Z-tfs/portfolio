import { ui, defaultLang, langs, typeLabels, toolLabels, type Lang, type UiKey } from './ui';

/** 界面文字：t('nav.index', lang) */
export function t(key: UiKey, lang: Lang): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

/** 当前页面语言（来自 URL 的 [lang] 段） */
export function getLang(value: string | undefined): Lang {
  return langs.includes(value as Lang) ? (value as Lang) : defaultLang;
}

/** 另一种语言 */
export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'zh' : 'en';
}

type Localized = { en?: string; zh?: string } | undefined;
const warned = new Set<string>();

/**
 * 双语字段取值：缺当前语言时显示另一语言，并在构建时警告一次（不报错）。
 * where 用来在警告里说明是哪个文件的哪个字段。
 */
export function pick(field: Localized, lang: Lang, where = ''): string {
  if (!field) return '';
  const value = field[lang];
  if (value) return value;
  const fallback = field[otherLang(lang)] ?? '';
  const msg = `[i18n] 缺少 ${lang} 文字，已用 ${otherLang(lang)} 代替：${where}`;
  if (fallback && !warned.has(msg)) {
    warned.add(msg);
    console.warn(msg);
  }
  return fallback;
}

export function typeLabel(value: string, lang: Lang): string {
  return typeLabels[value as keyof typeof typeLabels]?.[lang] ?? value;
}

export function toolLabel(value: string, lang: Lang): string {
  return toolLabels[value]?.[lang] ?? value;
}

/** 站内链接，自动加上 base（兼容 PR 预览路径）。path 不带开头的 / */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const clean = path.replace(/^\//, '');
  if (!clean || clean.includes('?') || clean.includes('#') || /\.[a-z0-9]+$/i.test(clean) || clean.endsWith('/')) {
    return base + clean;
  }
  return base + clean + '/';
}

/** 同一页面的另一语言版本：把路径里的语言段换掉 */
export function switchLangPath(pathname: string, target: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\//, '');
  const parts = rest.split('/');
  if (langs.includes(parts[0] as Lang)) parts[0] = target;
  else parts.unshift(target);
  return base + parts.join('/');
}
