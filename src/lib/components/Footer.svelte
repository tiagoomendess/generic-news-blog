<script lang="ts">
	import { Footer, FooterLink, FooterLinkGroup, FooterCopyright } from 'flowbite-svelte';
	import { t } from '$lib/translations';
	import settingsStore from '$lib/stores/settings';
</script>

<Footer footerType="logo">
	<div class="flex justify-center">
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
		>
			<FooterLink href="/sobre">{$t('footer.about')}</FooterLink>
			<FooterLink href="/contacto">{$t('footer.contact')}</FooterLink>
		</FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	<FooterCopyright
		spanClass="block text-md text-gray-600 text-center dark:text-gray-400"
		href="https://creativecommons.org/licenses/by/4.0"
		by={$settingsStore.SiteName + '.'}
		copyrightMessage={$t('footer.copyright')}
	/>
	<div class="flex justify-center mt-3">
		<div class="flex justify-center text-sm">
			<p class="mr-1 text-gray-500">{$t('footer.license')}</p>
			<a
				class="text-gray-500 mr-1"
				href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
				target="_blank"
				rel="license noopener noreferrer"
				style="display:inline-block;">CC BY 4.0</a
			>
			<img
				style="height:18px!important;margin-left:3px;vertical-align:text-bottom;opacity:0.5;"
				src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
				alt=""
			/><img
				style="height:18px!important;margin-left:3px;vertical-align:text-bottom;opacity:0.5"
				src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
				alt=""
			/>
		</div>
	</div>
</Footer>
