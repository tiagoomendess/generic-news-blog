import { config } from "$lib/config";
import type { ApiResponse, DataItem, Category, ApiPagination } from "$lib/utils/types";

export interface FetchCategoriesParams {
    page?: number;
    pageSize?: number;
    fetch: (info: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export interface FetchCategoriesResult {
    categories: DataItem<Category>[];
    pagination?: ApiPagination;
}

export async function getCategories({ page = 1, pageSize = 100, fetch }: FetchCategoriesParams): Promise<FetchCategoriesResult> {
    // Build the request URL
    let requestUrl = `${config.apiBaseUrl}/categories?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=name`;

    const response = await fetch(requestUrl);
    const responseBody = await response.json() as ApiResponse<DataItem<Category>[]>;

    return {
        categories: responseBody.data,
        pagination: responseBody.meta?.pagination
    };
}
