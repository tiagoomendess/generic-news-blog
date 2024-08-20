<script lang="ts">
	import { Img, Heading } from 'flowbite-svelte';
	import type { PageData } from './$types';
    import PageContent from '$lib/components/PageContent.svelte';

	export let data: PageData;
</script>

<PageContent>
	{#if !data.page}
		<p>Page Not Found</p>
	{:else}
		<Heading tag="h1">{data.page.title}</Heading>
		<section class="text-gray-800 dark:text-gray-200 mt-7">
			{@html data.page.content}
		</section>
	{/if}
</PageContent>
