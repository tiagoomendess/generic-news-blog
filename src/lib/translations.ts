import i18n, { type Config } from 'sveltekit-i18n';

const config: Config = {
  initLocale: 'pt',
  loaders: [
    {
      locale: 'en',
      key: '',
      loader: async () => (await import('../lang/en.json')).default
    },
    {
      locale: 'pt',
      key: '',
      loader: async () => (await import('../lang/pt.json')).default
    },
  ]
};

export const { t, loading, locales, locale, initialized, translations, loadTranslations } =
    new i18n(config);
