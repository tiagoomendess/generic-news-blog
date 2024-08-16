import type { PageLoad } from "./$types";
import { config } from "$lib/config";
import type { ApiResponse, DataItem, Article, ApiPagination, ApiError, Category } from "$lib/utils/types";
import { getArticles } from "$lib/api/getArticles";
import { getCategories } from "$lib/api/getCategories";

export interface IndexViewData {
    articles: DataItem<Article>[];
    categories: DataItem<Category>[];
    pagination?: ApiPagination;
    error?: ApiError;
}

// page load
export const load: PageLoad = async ({fetch, url}) => {

    // Get Page and filters from query parameters
    const pageStr = url.searchParams.get('page') || "1"
    const categoryIdStr = url.searchParams.get('category') || "0"
    const search = url.searchParams.get('search') || ""

    const page = parseInt(pageStr)
    const categoryId = parseInt(categoryIdStr)

    try {
        const { articles, pagination } = await getArticles({ page, categoryId, search, fetch });
        const { categories } = await getCategories({ fetch });
        return {
            articles,
            categories,
            pagination
        } as IndexViewData;
    } catch (error) {
        console.error(error);
        return {
            articles: [],
            categories: [],
            error: {
                status: 500,
                name: "Error",
                message: "An error occurred while loading the articles",
                details: error
            }
        } as IndexViewData;
    }
};
