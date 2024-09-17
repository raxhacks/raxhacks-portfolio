'use server-only'
import type { Locale } from '@/i18n.config'

const dictionaries = {
  en: () => import('@/locales/en.json').then(module => module.default),
  es: () => import('@/locales/es.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => {
    const selectedLocale = dictionaries[locale] || dictionaries['en']; // fallback to 'en'
    return await selectedLocale();
};
