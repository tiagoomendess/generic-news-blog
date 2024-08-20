import type { Handle } from '@sveltejs/kit';
import { locale } from '$lib/translations';
import { type Settings } from '$lib/utils/types';
import { getSettings } from '$lib/api/getSettings';

let cachedSettings: Settings;

export const handle: Handle = async ({ event, resolve }) => {
  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }

  if (!cachedSettings) {
    cachedSettings = await getSettings({ fetch });
  }
  event.locals.settings = cachedSettings;

  return resolve(event);
};
