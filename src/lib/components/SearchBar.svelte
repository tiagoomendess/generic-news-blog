<script lang="ts">
	import { Input, Button, A } from 'flowbite-svelte';
	import { SearchSolid } from 'flowbite-svelte-icons';
	import { t } from '../translations';

    export let value : string = '';

	const clearClicked = () => {
		value = '';
	};
</script>

<div class="mb-3">
	<p class="mb-1 mt-2 text-gray-500 dark:text-gray-200">{$t('search.title')}</p>
    <div class="divider bg-gray-500 dark:bg-gray-200"></div>
	<Input size="lg" id="search" type="text" placeholder={$t('search.placeholder')} bind:value={value}>
		<SearchSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
	</Input>
	<div class="clear-zone text-right mt-1">
        {#if value}
            <A href="javascript:void(0)" class="ml-1" on:click={clearClicked}>{$t('actions.clear')}</A>
        {/if}
	</div>
</div>

<style>
	.clear-zone {
		height: 23px;
	}
</style>
