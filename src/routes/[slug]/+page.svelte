<script lang="ts">
	import { Heading, Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import PageContent from '$lib/components/PageContent.svelte';
	import { t } from '$lib/translations';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.page ? data.page.title : $t('general.pageNotFound')}</title>
</svelte:head>

<PageContent>
	{#if !data.page}
		<div class="flex justify-center align-center flex-col">
			<Heading
				class="mb-8 text-center text-gray-700 tracking-tight title-header font-black text-4xl"
				tag="h1"
			>
				{$t('general.pageNotFound')}
			</Heading>

			<div class="text-center">
				<p class="mb-2 dark:text-gray-100">
					{$t('general.pageNotFoundDescription')}
				</p>
			</div>

			<div class="text-center font-normal text-lg dark:text-gray-100">
				<Button
					pill
					size="lg"
					href="/"
					color="alternative"
					class="mt-4 text-gray-500 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
				>
					{$t('actions.goToStart')}
				</Button>
			</div>
		</div>
	{:else}
		<Heading
			class="mb-8 text-gray-700 tracking-tight title-header font-black text-4xl"
			tag="h1"
		>
			{data.page.title}
		</Heading>
		<section class="font-normal text-lg dark:text-gray-100 rendered-html">
			{@html data.page.content}
		</section>
	{/if}
</PageContent>
