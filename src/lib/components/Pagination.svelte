<script lang="ts">
	import type { ApiPagination } from '$lib/utils/types';
	import { PaginationItem } from 'flowbite-svelte';
	import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
	import { t } from '../translations';

	export let pagination: ApiPagination | undefined;
	export let currentPage = 1;

	const previous = () => {
		if (currentPage <= 1) {
			return;
		}

		currentPage -= 1;
	};

	const next = () => {
		if (pagination && currentPage >= pagination.pageCount) {
			return;
		}

		currentPage += 1;
	};
</script>

<div>
	<div class="text-sm text-gray-700 dark:text-gray-400 mb-2 text-center">
		Página
		<span class="font-semibold text-gray-900 dark:text-white">{currentPage}</span>
		de
		<span class="font-semibold text-gray-900 dark:text-white"
			>{pagination ? pagination.pageCount : 1}</span
		>
	</div>
	{#if pagination && pagination.pageCount > 1}
		<div class="flex space-x-3 rtl:space-x-reverse justify-center">
			{#if currentPage > 1}
				<PaginationItem large class="flex items-center" on:click={previous}>
					<ArrowLeftOutline class="me-2 w-5 h-5" />
					{$t('pagination.previous')}
				</PaginationItem>
			{/if}

			{#if currentPage < pagination.pageCount}
				<PaginationItem large class="flex items-center" on:click={next}>
					{$t('pagination.next')}
					<ArrowRightOutline class="ms-2 w-5 h-5" />
				</PaginationItem>
			{/if}
		</div>
	{/if}
</div>
