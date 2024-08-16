<script lang="ts">
	import { A, Button } from 'flowbite-svelte';
	import { t } from '../translations';

	export let categoryId: number = 0;
    export let categories = [
		{ id: 1, name: 'Category 1' },
		{ id: 2, name: 'Abc' },
		{ id: 3, name: 'Bananas' },
		{ id: 4, name: 'Teste' },
		{ id: 5, name: 'Category 5' }
	];

	const categoryClicked = (newCategoryId: number) => {
        categoryId = newCategoryId;
	};

	const clearClicked = () => {
        categoryId = 0;
	};
</script>

<div>
    <p class="mb-1 mt-2 text-gray-500">{$t('categoryFilter.title')}</p>
	<div class="divider"></div>
	{#each categories as category}
		<Button
			on:click={() => categoryClicked(category.id)}
			size="xs"
			class="mr-1 mb-1"
			color={categoryId === category.id ? 'primary' : 'alternative'}
			pill
		>
			{category.name}
		</Button>
	{/each}
	<div class="clear-zone mt-1">
		{#if categoryId}
			<div>
				<A href="javascript:void(0)" class="ml-1" on:click={clearClicked}>{$t('actions.clear')}</A>
			</div>
		{/if}
	</div>
</div>

<style>
	.divider {
		border-bottom: 1px solid #e2e8f0;
		margin-bottom: 1rem;
	}

    .clear-zone {
        min-height: 23px;
    }
</style>
