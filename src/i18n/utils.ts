import { ui, type UITranslations } from './ui';

export type Lang = 'es' | 'en';

export const defaultLang: Lang = 'es';

export function getLangFromUrl(url: URL): Lang {
  const [, firstSegment] = url.pathname.split('/');
  if (firstSegment === 'en') return 'en';
  return 'es';
}

export function useTranslations(lang: Lang): UITranslations {
  return ui[lang];
}

export function getLocalizedPath(lang: Lang): string {
  return lang === 'en' ? '/en/' : '/';
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
