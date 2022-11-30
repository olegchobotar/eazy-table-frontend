import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './localization/en/translation.json';
import translationUA from './localization/en/translation.json';

export const resources = {
  en: {
    translation: translationEN,
  },
  ua: {
    translation: translationUA,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
