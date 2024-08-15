<script lang="ts">
	import type { PageData } from './$types';
	import BlogFeed from '$lib/components/BlogFeed.svelte';
	import PageContent from '$lib/components/PageContent.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';

	export let data: PageData;
</script>

<PageContent>
		<div class="grid grid-cols-3 gap-4">
			<div class="block md:hidden col-span-3 mb-4">
				<p class="">Filters and other stuff on mobile</p>
			</div>
			<div class="col-span-3 md:col-span-2">
				<BlogFeed articles={data.articles} />
				<Pagination pagination={data.pagination}/>
			</div>
			<div class="hidden md:block md:col-span-1">
				<SearchBar/>
				<CategoryFilter></CategoryFilter>
			</div>
		</div>
</PageContent>
