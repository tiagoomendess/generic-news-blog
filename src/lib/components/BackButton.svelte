<script lang="ts">
	import { AngleLeftOutline } from 'flowbite-svelte-icons';
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let canGoBack = false;

	onMount(() => {
		if (window === undefined) return;
		canGoBack = window.history.length > 1;
	});

	const backClicked = () => {
		if (!canGoBack) return;
		window.history.back();
	};
</script>

{#if canGoBack}
	<div>
		<Button
			on:click={backClicked}
			color="none"
			class="mt-4 text-gray-500 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
		>
			<AngleLeftOutline on:click={() => window.history.back()} class="" />
		</Button>
	</div>
{/if}
