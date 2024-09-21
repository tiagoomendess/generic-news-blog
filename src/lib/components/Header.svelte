<script lang="ts">
	import settingsStore from '$lib/stores/settings';
	import { DarkMode } from 'flowbite-svelte';
	import BackButton from './BackButton.svelte';
</script>

<div class="flex justify-center px-4">
	<div class="w-full md:w-3/4 lg:w-2/4">
		<div class="grid grid-cols-12 gap-2">
			<div class="col-span-3">
				<BackButton />
			</div>
			<div class="col-span-6 text-center flex justify-center">
				<a href="/">
					<img class="logo p-3 dark:hidden" src={$settingsStore.HeaderImageForLightMode} alt="logo" />
					<img class="logo p-3 hidden dark:block" src={$settingsStore.HeaderImageForDarkMode} alt="logo" />
				</a>
			</div>
			<div class="col-span-3 text-right">
				<DarkMode
					btnClass="mt-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
				/>
			</div>
		</div>
		<div class="divider bg-gray-800 dark:bg-gray-100"></div>
	</div>
</div>

<style>
	.logo {
		height: 70px;
		position: relative;
	}
</style>
