<script lang="ts">
import { Footer, FooterBrand, FooterLink, FooterLinkGroup, FooterCopyright } from "flowbite-svelte";
import { t } from '$lib/translations';
	import { config } from "$lib/config";

</script>

<Footer footerType="logo">
	<div class="flex justify-center">
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
		>
			<FooterLink href="/">{$t('footer.about')}</FooterLink>
			<FooterLink href="/">{$t('footer.contact')}</FooterLink>
		</FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	<FooterCopyright href="/" by={config.appName} copyrightMessage={$t('footer.copyright')}/>
</Footer>
