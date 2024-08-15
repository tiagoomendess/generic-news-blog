import type { PageLoad } from './$types';
import { config } from "$lib/config";
import type { Article, ApiError, ApiResponse, ApiEntity } from "$lib/utils/types";

export interface ArticlePageData {
    article: Article | null;
    error?: ApiError;
}

export const load: PageLoad = async ({ params, fetch }) : Promise<ArticlePageData> => {
    try {
        const response = await fetch(`${config.apiBaseUrl}/articles/slug/${params.slug}`);
        const responseBody = await response.json() as ApiResponse<Article>;

        return {
            article: responseBody.data
        } as ArticlePageData
    } catch (error) {
        console.error(error);
        return {
            article: null,
        } as ArticlePageData;
    }
}
