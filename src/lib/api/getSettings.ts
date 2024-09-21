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

        return mapSettings(responseBody)
    } catch (error) {
        console.error(error);
    }

    return {
        SiteName: config.appName || 'No Site Name',
        SiteUrl: config.appUrl || 'http://localhost',
        SiteEmail: 'email@example.com',
        SiteSquareLogo: 'https://via.placeholder.com/150',
        SiteFavIcon: 'https://via.placeholder.com/32',
        HeaderImageForLightMode: 'https://via.placeholder.com/300x100',
        HeaderImageForDarkMode: 'https://via.placeholder.com/300x100',
    } as Settings;
}

const mapSettings = (body: ApiResponse<DataItem<SettingsApiResponse>>): Settings => {
    return {
        SiteName: body.data.attributes.SiteName || 'No Site Name',
        SiteUrl: body.data.attributes.SiteUrl || 'http://localhost',
        SiteEmail: body.data.attributes.SiteEmail || 'email@example.com',
        SiteSquareLogo: body.data.attributes.SiteSquareLogo?.data.attributes.url || 'https://via.placeholder.com/150',
        SiteFavIcon: body.data.attributes.SiteFavIcon?.data.attributes.url || 'https://via.placeholder.com/32',
        HeaderImageForLightMode: body.data.attributes.HeaderImageForLightMode?.data.attributes.url || 'https://via.placeholder.com/300x100',
        HeaderImageForDarkMode: body.data.attributes.HeaderImageForDarkMode?.data.attributes.url || 'https://via.placeholder.com/300x100',
    } as Settings;
}
