<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';
	import { t } from '$lib/translations';

	export let categoryId: number | string | undefined;

	const buttonClicked = () => {
		if (categoryId !== undefined) {
			goto(`/?category=${categoryId}`);
		}
	};
</script>

{#if categoryId}
	<div class="flex justify-center">
		<Button
            pill
            size="lg"
			on:click={buttonClicked}
            color="alternative"
			class="mt-4 text-gray-500 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
			>{$t('actions.readSimilarArticles')}
		</Button>
	</div>
{/if}
