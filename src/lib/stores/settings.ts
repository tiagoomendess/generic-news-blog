import { get, writable, type Writable } from 'svelte/store';
import { getSettings } from '$lib/api/getSettings';
import type { Settings } from '$lib/utils/types';

const settingsStore: Writable<Settings> = writable({} as Settings);

const settings = await getSettings({ fetch });
settingsStore.set(settings);

export const fetchSettings = async () : Promise<Writable<Settings>> => {
    const currentSettings = get(settingsStore);
    if (!currentSettings.SiteName) {
        const settings = await getSettings({ fetch });
        settingsStore.set(settings);
    }

    return settingsStore;
};

export default settingsStore;
