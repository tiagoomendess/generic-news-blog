<script lang="ts">
	import '../app.css';
	import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import type { PageLoad } from './$types';
	import { browser } from '$app/environment';
	import { loadTranslations } from '$lib/translations';

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
</script>

<div class="page-container">
	<header>
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
