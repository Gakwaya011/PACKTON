import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import enServices from './locales/en/services.json';
import enContact from './locales/en/contact.json';
import enAuth from './locales/en/auth.json';
import enPortal from './locales/en/portal.json';
import enAdmin from './locales/en/admin.json';
import enRider from './locales/en/rider.json';

import rwCommon from './locales/rw/common.json';
import rwHome from './locales/rw/home.json';
import rwAbout from './locales/rw/about.json';
import rwServices from './locales/rw/services.json';
import rwContact from './locales/rw/contact.json';
import rwAuth from './locales/rw/auth.json';
import rwPortal from './locales/rw/portal.json';
import rwAdmin from './locales/rw/admin.json';
import rwRider from './locales/rw/rider.json';

import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frAbout from './locales/fr/about.json';
import frServices from './locales/fr/services.json';
import frContact from './locales/fr/contact.json';
import frAuth from './locales/fr/auth.json';
import frPortal from './locales/fr/portal.json';
import frAdmin from './locales/fr/admin.json';
import frRider from './locales/fr/rider.json';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'rw', label: 'RW' },
  { code: 'fr', label: 'FR' },
] as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'rw', 'fr'],
    defaultNS: 'common',
    ns: ['common', 'home', 'about', 'services', 'contact', 'auth', 'portal', 'admin', 'rider'],
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        about: enAbout,
        services: enServices,
        contact: enContact,
        auth: enAuth,
        portal: enPortal,
        admin: enAdmin,
        rider: enRider,
      },
      rw: {
        common: rwCommon,
        home: rwHome,
        about: rwAbout,
        services: rwServices,
        contact: rwContact,
        auth: rwAuth,
        portal: rwPortal,
        admin: rwAdmin,
        rider: rwRider,
      },
      fr: {
        common: frCommon,
        home: frHome,
        about: frAbout,
        services: frServices,
        contact: frContact,
        auth: frAuth,
        portal: frPortal,
        admin: frAdmin,
        rider: frRider,
      },
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'packton.language',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
