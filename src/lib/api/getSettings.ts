import { config } from "$lib/config";
import type { ApiResponse, DataItem, SettingsApiResponse, Settings } from "$lib/utils/types";

export interface FetchSettingsParams {
    fetch: (info: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export async function getSettings({ fetch }: FetchSettingsParams): Promise<Settings> {
    // Build the request URL
    let requestUrl = `${config.apiBaseUrl}/setting?populate=*`;

    try {
        const response = await fetch(requestUrl);
        const responseBody = await response.json() as ApiResponse<DataItem<SettingsApiResponse>>;

        return mapSettings(responseBody.data)
    } catch (error) {
        console.error(error);
    }

    return {} as Settings;
}

const mapSettings = (settings: any): Settings => {
    console.log("settings", settings);
    return {
        SiteName: settings.attributes.SiteName,
        SiteUrl: settings.attributes.SiteUrl,
        SiteEmail: settings.attributes.SiteEmail,
        SiteHorizontalLogo: settings.attributes.SiteHorizontalLogo.data.attributes.url,
        SiteSquareLogo: settings.attributes.SiteSquareLogo.data.attributes.url,
    } as Settings;
}
