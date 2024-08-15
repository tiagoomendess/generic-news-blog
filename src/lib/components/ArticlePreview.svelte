<script lang="ts">
	import type { Article } from "$lib/utils/types";
    import { Img, Heading } from "flowbite-svelte";

    export let article : Article;
</script>

<article class="mb-10 w-full">
    <a href="/artigos/{article.slug}">
        <Img class="my-2 rounded-lg aspect-video w-full" src={article.picture.data.attributes.formats.medium.url}/>
        <Heading tag="h2" class="mb-2 text-gray-700 tracking-tight title-header sm:text-sm md:text-xl lg:text-2xl xl:text-4xl">{article.title}</Heading>
        <p class="text-gray-400 text-sm md:text-base text-slate-500">{article.metaDescription}</p>
    </a>
</article>
