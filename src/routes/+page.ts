import type { PageLoad } from "./$types";
import { config } from "$lib/config";
import type { ApiResponse, DataItem, Article, ApiPagination, ApiError } from "$lib/utils/types";

export interface IndexViewData {
    articles: DataItem<Article>[];
    pagination?: ApiPagination;
    error?: ApiError;
}

export const ssr = false;

// page load
export const load: PageLoad = async ({fetch, url}) => {

    // Get Page and filters from query parameters
    const page = url.searchParams.get('page') || "1"
    const categoryId = url.searchParams.get('category') || "0"
    const search = url.searchParams.get('search') || ""

    // Build the request URL
    let requestUrl = `${config.apiBaseUrl}/articles?pagination[page]=${page}&pagination[pageSize]=3&populate=*&sort[1]=publishedAt:desc`;
    if (categoryId != "0") {
        requestUrl += `&filters[category][id][$eq]=${categoryId}`;
    }

    if (search != "") {
        requestUrl += `&filters[title][$contains]=${search}`;
    }

    try {
        const response = await fetch(requestUrl);
        const responseBody = await response.json() as ApiResponse<DataItem<Article>[]>;

        return {
            articles: responseBody.data,
            pagination: responseBody.meta?.pagination
        } as IndexViewData;
    } catch (error) {
        console.error(error);
        return {
            articles: [],
            error: {
                status: 500,
                name: "Error",
                message: "An error occurred while loading the articles",
                details: error
            }
        } as IndexViewData;
    }
};
