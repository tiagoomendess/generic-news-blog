<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import type { PageData } from './$types';
    import { t } from '$lib/translations';
	import { Heading } from 'flowbite-svelte';
	import PageContent from '$lib/components/PageContent.svelte';

	export let data: PageData;
</script>

<PageContent>
	{#if data.article}
		<Article article={data.article} />
	{:else}
		<Heading>{$t('article.notFound')}</Heading>
	{/if}
</PageContent>
