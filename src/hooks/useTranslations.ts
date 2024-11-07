import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useTranslations = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
  }, [i18n]);

  const getCurrentLanguage = useCallback(() => {
    return i18n.language;
  }, [i18n]);

  return {
    t,
    changeLanguage,
    getCurrentLanguage
  };
};