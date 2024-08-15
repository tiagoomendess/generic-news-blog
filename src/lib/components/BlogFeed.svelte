<script lang="ts">
    import ArticlePreview from '$lib/components/ArticlePreview.svelte';
	import type { ApiEntity, Article } from '$lib/utils/types';

    export let articles : ApiEntity<Article>[] = [];
</script>

{#each articles as article}
	<ArticlePreview article={article.attributes}/>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
{/each}
