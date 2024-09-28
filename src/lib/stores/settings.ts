import { get, writable, type Writable } from 'svelte/store';
import { getSettings } from '$lib/api/getSettings';
import type { Settings } from '$lib/utils/types';

// Create a writable store for settings
const settingsStore: Writable<Settings> = writable({} as Settings);

// Create an async function to initialize the store with settings data
const loadSettings = async () => {
  const settings = await getSettings({ fetch });
  settingsStore.set(settings);
};

// Call the loadSettings function to fetch and set the initial settings
loadSettings();

export const fetchSettings = async (): Promise<Writable<Settings>> => {
  const currentSettings = get(settingsStore);
  if (!currentSettings.SiteName) {
    const settings = await getSettings({ fetch });
    settingsStore.set(settings);
  }

  return settingsStore;
};

export default settingsStore;
