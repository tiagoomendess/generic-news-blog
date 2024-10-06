<script lang="ts">
	import '../app.css';
	import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import type { PageLoad } from './$types';
	import { browser } from '$app/environment';
	import { loadTranslations } from '$lib/translations';
	import settingsStore from '$lib/stores/settings';
	import { onMount, onDestroy } from 'svelte';

	export const load: PageLoad = async ({ url }) => {
		const { pathname } = url;
		const initLocale = getInitialLocale();

		await Promise.all([
			loadTranslations(initLocale, pathname),
		]);

		return { locale: initLocale, route: pathname };
	};

	function getInitialLocale(): string {
		if (browser) {
			try {
				return window.navigator.language.split('-')[0];
			} catch (e) {
				return 'pt';
			}
		}

		return 'pt';
	}

	let hasScrolled = false; // Reactive variable to track scroll status

	// Function to handle scroll event
	function handleScroll() {
		// Check if the user has scrolled down
		hasScrolled = window.scrollY > 0;
	}

	// Add scroll event listener on mount
	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
		}

		return () => {
			// Cleanup event listener on component destroy
			if (browser) {
				window.removeEventListener('scroll', handleScroll);
			}
		};
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={$settingsStore.SiteFavIcon} />
</svelte:head>

<div class="page-container">
	<header class="navbar-custom bg-white dark:bg-gray-800 {hasScrolled ? 'shadow' : ''}">
		<Header />
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<Footer />
	</footer>
</div>

<style>
	.navbar-custom {
		position: sticky;
		top: 0;
		z-index: 20;
		width: 100%;
		transition: box-shadow 0.1s ease-in-out; /* Smooth transition for shadow */
	}

	/* Default shadow style when user has scrolled */
	.shadow {
		box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.20);
	}

	/* Set height and layout for the flex container */
	.page-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* Make main content take up remaining space */
	main {
		flex: 1;
	}
</style>
