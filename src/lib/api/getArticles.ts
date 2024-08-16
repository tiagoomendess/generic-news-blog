import { config } from "$lib/config";
import type { ApiResponse, DataItem, Article, ApiPagination } from "$lib/utils/types";

export interface FetchArticlesParams {
    page?: number;
    categoryId?: number;
    search?: string;
    fetch: (info: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export interface FetchArticlesResult {
    articles: DataItem<Article>[];
    pagination?: ApiPagination;
}

export async function getArticles({ page = 1, categoryId = 0, search = "", fetch }: FetchArticlesParams): Promise<FetchArticlesResult> {
    // Build the request URL
    let requestUrl = `${config.apiBaseUrl}/articles?pagination[page]=${page}&pagination[pageSize]=3&populate=*&sort[1]=publishedAt:desc`;

    if (categoryId != 0) {
        requestUrl += `&filters[category][id][$eq]=${categoryId}`;
    }
    if (search != "") {
        requestUrl += `&filters[title][$contains]=${search}`;
    }

    const response = await fetch(requestUrl);
    const responseBody = await response.json() as ApiResponse<DataItem<Article>[]>;

    return {
        articles: responseBody.data,
        pagination: responseBody.meta?.pagination
    };
}
