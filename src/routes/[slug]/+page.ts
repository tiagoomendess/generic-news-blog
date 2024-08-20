import type { PageLoad } from "./$types";
import { getPage } from "$lib/api/getPage";

export const load: PageLoad = async ({fetch, url, params}) => {
    // Get slug from url param
    const slug = params.slug;
    const page = await getPage({slug, fetch});

    return {
        page
    }
}
