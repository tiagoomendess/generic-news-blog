<script lang="ts">
	import { onDestroy } from 'svelte';
	import { navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';
	import { AngleLeftOutline } from 'flowbite-svelte-icons';

	let showBackButton = false;

	// Importing necessary types from SvelteKit and TypeScript
	import type { Unsubscriber } from 'svelte/store';

	// Local state to track if there's a previous history
	let hasHistory: boolean = false;

	// Subscribe to the navigation store
	let unsubscribe: Unsubscriber = navigating.subscribe(($nav) => {
		if (!$nav) return;
		// Determine if there's a previous history
		hasHistory = $nav.from !== null;
		
		showBackButton = hasHistory && $nav.to?.url.pathname !== '/';
	});

	// Cleanup the subscription when the component is destroyed
	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});

	// Navigate back or go to a fallback URL if no history exists
	function goBack(): void {
		if (hasHistory) {
			window.history.back(); // Use native browser history to go back
		} else {
			goto('/'); // Fallback: Navigate to the homepage or a specific URL
		}
	}
</script>

{#if showBackButton}
	<div>
		<Button
			on:click={goBack}
			color="none"
			class="mt-4 text-gray-500 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
		>
			<AngleLeftOutline on:click={goBack} />
		</Button>
	</div>
{/if}
