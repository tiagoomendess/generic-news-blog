<script lang="ts">
	import type { PageData } from './$types';
	import BlogFeed from '$lib/components/BlogFeed.svelte';
	import PageContent from '$lib/components/PageContent.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';
	import { pushState } from '$app/navigation';
	import { page as pageStore } from '$app/stores';
	import { getArticles } from '$lib/api/getArticles';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Accordion, AccordionItem } from 'flowbite-svelte';
	import { FilterSolid } from 'flowbite-svelte-icons';
	import { t } from '$lib/translations';
	import settingsStore from '$lib/stores/settings';
	import { type Settings } from '$lib/utils/types';
	import { config } from '$lib/config';

	export let data: PageData;

	let isMounted = false;

	// get filters
	const pageQueryParam = $pageStore.url.searchParams.get('page') || '1';
	let page = parseInt(pageQueryParam);

	const categoryIdQueryParam = $pageStore.url.searchParams.get('category') || '0';
	let categoryId = parseInt(categoryIdQueryParam);

	let searchValue = $pageStore.url.searchParams.get('search') || '';

	let debounce = false;
	let debounceTime = 0;
	$: handleNewSearchValue(searchValue);
	$: handleNewPageValue(page);
	$: handleNewCategoryValue(categoryId);

	onMount(async () => {
		isMounted = true;
	});

	const handleNewSearchValue = (newSearchValue: string) => {
		if (!isMounted) {
			return;
		}

		if (newSearchValue === '') {
			updateQueryParameters();
			refreshResults();
			return;
		}

		// if search term is less than 3 characters, don't search
		if (newSearchValue.length < 4) {
			return;
		}

		// only seaarch if the user has stopped typing for 500ms
		if (debounce) {
			clearTimeout(debounceTime);
		}

		debounce = true;
		debounceTime = setTimeout(() => {
			debounce = false;
			page = 1;
			refreshResults();
			updateQueryParameters();
		}, 500);
	};

	const handleNewPageValue = (newPage: number) => {
		if (newPage < 1) {
			page = 1;
		}

		updateQueryParameters();
		refreshResults();
	};

	const handleNewCategoryValue = (neCategoryId: number) => {
		page = 1;
		updateQueryParameters();
		refreshResults();
	};

	const refreshResults = async () => {
		if (!isMounted) {
			return;
		}

		try {
			let response = await getArticles({ page, categoryId, search: searchValue, fetch });
			data.articles = response.articles;
			data.pagination = response.pagination;
		} catch (error) {
			console.error('Error calling API: ', error);
		}
	};

	const updateQueryParameters = async () => {
		if (!browser || !isMounted) {
			return;
		}

		// Search term
		if (searchValue !== '') {
			$pageStore.url.searchParams.set('search', searchValue);
			pushState($pageStore.url.toString(), $pageStore.state);
			return;
		} else {
			$pageStore.url.searchParams.delete('search');
			pushState($pageStore.url.toString(), $pageStore.state);
		}

		// Category
		if (categoryId > 0) {
			$pageStore.url.searchParams.set('category', categoryId.toString());
			pushState($pageStore.url.toString(), $pageStore.state);
			return;
		} else {
			$pageStore.url.searchParams.delete('category');
			pushState($pageStore.url.toString(), $pageStore.state);
		}

		// Page
		if (page > 1) {
			$pageStore.url.searchParams.set('page', page.toString());
			pushState($pageStore.url.toString(), $pageStore.state);
			return;
		} else {
			$pageStore.url.searchParams.delete('page');
			pushState($pageStore.url.toString(), $pageStore.state);
		}
	};
</script>

<svelte:head>
	<title>{$settingsStore.SiteName || config.appName }</title>
</svelte:head>

<PageContent>
	<div class="grid grid-cols-3 gap-4">
		<div class="block md:hidden col-span-3 mb-4">
			<Accordion flush>
				<AccordionItem>
					<div slot="header" class="flex flex-row">
						<FilterSolid style="margin-top: 2px" />
						<span class="ml-2">
							{$t('actions.filter')}
						</span>
					</div>
					<p class="mb-2 text-gray-500 dark:text-gray-400">
						<SearchBar bind:value={searchValue} />
						<CategoryFilter
							categories={data.categories.map((cat) => ({ id: cat.id, name: cat.attributes.name }))}
							bind:categoryId
						/>
					</p>
				</AccordionItem>
			</Accordion>
		</div>
		<div class="col-span-3 md:col-span-2">
			{#if data.articles.length === 0}
				<p class="text-lg text-gray-500 dark:text-gray-400 text-center">
					{$t('general.articlesNotFound')}
				</p>
			{/if}
			<BlogFeed articles={data.articles} />
			<Pagination pagination={data.pagination} bind:currentPage={page} />
		</div>
		<div class="hidden md:block md:col-span-1">
			<div class="sticky side-panel">
				<SearchBar bind:value={searchValue} />
				<CategoryFilter
					categories={data.categories.map((cat) => ({ id: cat.id, name: cat.attributes.name }))}
					bind:categoryId
				/>
			</div>
		</div>
	</div>
</PageContent>

<style>
	.side-panel {
		top: 7.1rem;
	}
</style>
