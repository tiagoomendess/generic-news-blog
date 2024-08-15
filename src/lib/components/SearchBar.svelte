<script lang="ts">
	import { Label, Input, ButtonGroup, Button } from 'flowbite-svelte';
	import {  SearchSolid } from 'flowbite-svelte-icons';
    import { t } from "../translations";

</script>

<div class="mb-6">
    <h2>{ $t('search.title')}</h2>
	<Input size="lg" id="search" type="text" placeholder={$t('search.placeholder')}>
		<SearchSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
	</Input>
</div>
