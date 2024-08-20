import { config } from "$lib/config";
import type { ApiResponse, DataItem, Page, ApiPagination } from "$lib/utils/types";

export interface FetchCategoriesParams {
    slug: string;
    fetch: (info: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export async function getPage({ slug, fetch }: FetchCategoriesParams): Promise<Page | null> {
    // Build the request URL
    let requestUrl = `${config.apiBaseUrl}/pages?filters[slug][$eq]=${slug}&populate=*`;

    try {
        const response = await fetch(requestUrl);
        const responseBody = await response.json() as ApiResponse<DataItem<Page>[]>;

        if (!responseBody || !responseBody.data || responseBody.data.length === 0) {
            return null;
        }

        const page = responseBody.data[0].attributes;
        page.id = responseBody.data[0].id;

        return page;
    } catch (error) {
        console.error(error);
        return null;
    }
}
