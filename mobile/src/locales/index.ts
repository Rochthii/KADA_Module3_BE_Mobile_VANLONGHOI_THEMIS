import { vi } from './vi';
import { en } from './en';
import { zh } from './zh';

export type SupportedLanguage = 'vi' | 'en' | 'zh';

const dictionaries = {
  vi,
  en,
  zh,
};

let currentLang: SupportedLanguage = 'vi';

export function setLanguage(lang: SupportedLanguage) {
  currentLang = lang;
}

export function getLanguage(): SupportedLanguage {
  return currentLang;
}

/**
 * Type-safe localized dictionary
 */
export const strings = new Proxy(vi, {
  get(target, prop: keyof typeof vi) {
    const dict = dictionaries[currentLang] || vi;
    return dict[prop] ?? vi[prop];
  },
});

export default strings;
