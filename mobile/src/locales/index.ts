import React, { useState, useEffect } from 'react';
import { vi } from './vi';
import { en } from './en';
import { zh } from './zh';

export type SupportedLanguage = 'vi' | 'zh' | 'en';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'zh', name: '中文 (GACC)', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

const dictionaries: Record<SupportedLanguage, typeof vi> = {
  vi,
  zh: zh as unknown as typeof vi,
  en: en as unknown as typeof vi,
};

let currentLang: SupportedLanguage = 'vi';
const listeners = new Set<(lang: SupportedLanguage) => void>();

export function setLanguage(lang: SupportedLanguage) {
  currentLang = lang;
  listeners.forEach((listener) => listener(lang));
}

export function getLanguage(): SupportedLanguage {
  return currentLang;
}

/**
 * Custom React Hook that triggers re-render when language changes
 */
export function useLocalization() {
  const [lang, setLang] = useState<SupportedLanguage>(currentLang);

  useEffect(() => {
    const handler = (newLang: SupportedLanguage) => setLang(newLang);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const dict = dictionaries[lang] || vi;

  return {
    lang,
    setLanguage,
    t: dict,
    strings: dict,
  };
}

/**
 * Type-safe localized dictionary proxy
 */
export const strings = new Proxy(vi, {
  get(target, prop: keyof typeof vi) {
    const dict = dictionaries[currentLang] || vi;
    return dict[prop] ?? vi[prop];
  },
});

export default strings;
