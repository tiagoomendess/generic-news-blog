<script lang="ts">
    import { Img, Heading, ImagePlaceholder } from "flowbite-svelte";
    import type { Article } from "../utils/types";
    import ReadMoreSimilar from "./ReadMoreSimilar.svelte";
	import { onMount } from "svelte";
	import moment from "moment";
    import { t } from "../translations";

    export let article : Article;

    let publishDate = ""
    let publishISODate = ""
    let updatedAt = ""

    onMount(() => {
        let datePublished = new Date(article.publishedAt);
        let dateUpdated = new Date(article.updatedAt);
        
        publishISODate = datePublished.toISOString();
        publishDate = moment(datePublished).format("DD/MM/YYYY");
        updatedAt = datePublished.getTime() < dateUpdated.getTime() ? dateUpdated.toDateString() : "";
    });
</script>

<svelte:head>
    <title>
        {article.title}
    </title>
</svelte:head>

<article class="">
    <section>
        <div class="category mb-2 font-semibold text-gray-500 text-md dark:text-gray-400">
            <a href="/?category={article.category.id}">{article.category.name}</a>
        </div>
        <Heading tag="h1" class="mb-2 text-gray-700 tracking-tight title-header font-black text-4xl">{article.title}</Heading>
        <time class="text-gray-500 text-sm dark:text-gray-400" datetime="{publishISODate}">{$t('article.publishedOn', {publishDate: publishDate})}</time>
        <Img class="my-5 rounded-lg aspect-video w-full" src={article.picture.formats.large.url}/>
        <p class="description mb-8 text-gray-950 font-bold text-xl dark:text-white">{article.metaDescription}</p>
    </section>
    
    <section class="font-normal text-lg dark:text-gray-100">
        {@html article.body}
    </section>
</article>

<ReadMoreSimilar categoryId={article.category.id}/>

<style>
    .category {
        text-transform: uppercase;
    }
</style>
