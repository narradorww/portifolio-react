// src/configs/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationsPT from '../locales/pt/translations.json';
import translationsEN from '../locales/en/translations.json';
import translationsFR from '../locales/fr/translations.json';

const resources = {
  pt: {
    translation: translationsPT,
  },
  en: {
    translation: translationsEN,
  },
  fr: {
    translation: translationsFR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // idioma padrão
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;