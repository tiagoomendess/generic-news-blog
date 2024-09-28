<script lang="ts">
	// Props provided by SvelteKit for error and status code
	export let error;
	export let status;
</script>

<div class="flex justify-center items-center h-screen">
	<div class="text-center">
		{#if status === 404}
			<h1 class="text-6xl font-bold mb-4">404</h1>
			<p class="text-lg">Oops! The page you're looking for doesn't exist.</p>
			<a href="/" class="mt-6 inline-block text-blue-500 hover:underline">Go back to home</a>
		{:else if status === 500}
			<h1 class="text-6xl font-bold mb-4">500</h1>
			<p class="text-lg">Uh-oh! Something went wrong on our end.</p>
			<a href="/" class="mt-6 inline-block text-blue-500 hover:underline">Go back to home</a>
		{:else}
			<h1 class="text-6xl font-bold mb-4">{status}</h1>
			<p class="text-lg">{error.message || "An error occurred."}</p>
			<a href="/" class="mt-6 inline-block text-blue-500 hover:underline">Go back to home</a>
		{/if}
	</div>
</div>

<style>
	/* Example styling, feel free to customize */
	h1 {
		color: #ef4444;
	}
</style>
