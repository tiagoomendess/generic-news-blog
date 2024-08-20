<script lang="ts">
	import { AngleLeftOutline } from 'flowbite-svelte-icons';
</script>

<div class="btn">
	<AngleLeftOutline
		on:click={() => window.history.back()}
		class="ml-1 text-gray-600 hover:text-black hover:text-bold"
	/>
</div>

<style>
	.btn {
		display: flex;
		justify-content: left;
		align-items: center;
		width: 70px;
		height: 70px;
	}

	.btn:hover {
		cursor: pointer;
	}
</style>
