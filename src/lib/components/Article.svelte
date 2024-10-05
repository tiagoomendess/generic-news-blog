<script lang="ts">
	import { Img, Heading, ImagePlaceholder } from 'flowbite-svelte';
	import type { Article } from '../utils/types';
	import ReadMoreSimilar from './ReadMoreSimilar.svelte';
	import { onMount } from 'svelte';
	import moment from 'moment';
	import { t } from '../translations';
	import { config } from '$lib/config';
	import settingsStore from '$lib/stores/settings';

	export let article: Article;

	let publishDate = '';
	let publishISODate = '';
	let updatedAt = '';

	// Define your Schema.org JSON-LD object
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: article.title,
		description: article.metaDescription,
		image: article.picture.url,
		author: {
			'@type': 'Organization',
			name: config.appName,
			url: config.appUrl,
			logo: {
				'@type': 'ImageObject',
				url: $settingsStore.SiteSquareLogo
			}
		},
		publisher: {
			'@type': 'Organization',
			name: config.appName,
			logo: {
				'@type': 'ImageObject',
				url: $settingsStore.SiteSquareLogo
			}
		},
		datePublished: article.publishedAt,
		dateModified: article.updatedAt,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': config.appUrl + '/artigos/' + article.slug
		}
	};

	// Convert the schema object to a JSON-LD string
	const jsonLd = JSON.stringify(schema);

	onMount(() => {
		let datePublished = new Date(article.publishedAt);
		let dateUpdated = new Date(article.updatedAt);

		publishISODate = datePublished.toISOString();
		publishDate = moment(datePublished).format('DD/MM/YYYY');
		updatedAt = datePublished.getTime() < dateUpdated.getTime() ? dateUpdated.toDateString() : '';
	});
</script>

<svelte:head>
	<title>
		{article.title}
	</title>

	<!-- Open Graph basic metadata -->
	<meta property="og:title" content={article.title} />
	<meta property="og:description" content={article.metaDescription} />
	<meta property="og:url" content={`${config.appUrl}/artigos/${article.slug}`} />
	<meta property="og:type" content="article" />
	<meta property="og:image" content={article.picture.url} />
	<meta property="og:image:width" content={article.picture.width} />
	<meta property="og:image:height" content={article.picture.height} />
	<meta property="og:image:alt" content={article.picture.caption || article.title} />

	<!-- Article-specific Open Graph metadata -->
	<meta property="article:published_time" content={article.publishedAt} />
	<meta property="article:modified_time" content={article.updatedAt} />
	<meta property="article:author" content={config.appUrl + '/sobre'} />
	<meta property="article:section" content={article.category.id} />

	<meta property="og:locale" content="pt_PT" />
	<meta property="og:site_name" content={config.appName} />

	<link rel="canonical" href={`${config.appUrl}/artigos/${article.slug}`} />
	<meta name="description" content={article.metaDescription} />

	<!-- Dublin Core Metadata (For More Semantic Web Compatibility) -->
	<meta name="DC.title" content={article.title} />
	<meta name="DC.description" content={article.metaDescription} />
	<meta name="DC.date" content={article.publishedAt} />
	<meta name="DC.creator" content={config.appName} />
	<meta name="DC.language" content="pt" />

	<meta name="robots" content="index, follow" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={article.title} />
	<meta name="twitter:description" content={article.metaDescription} />
	<meta name="twitter:image" content={article.picture.url} />
	<meta name="twitter:image:alt" content={article.picture.caption || article.title} />

	<!-- Schema.org markup for Google -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<article>
	<section>
		<div class="category mb-2 font-semibold text-gray-500 text-md dark:text-gray-400">
			<a href="/?category={article.category.id}">{article.category.name}</a>
		</div>
		<Heading tag="h1" class="mb-2 text-gray-700 tracking-tight title-header font-black text-4xl"
			>{article.title}</Heading
		>
		<time class="text-gray-500 text-sm dark:text-gray-400" datetime={publishISODate}
			>{$t('article.publishedOn', { publishDate: publishDate })}</time
		>
		<Img
			class="my-5 rounded-lg aspect-video w-full"
			src={article.picture.url}
			alt={article.picture.caption || article.title}
		/>
		<p class="description mb-8 text-gray-950 font-bold text-xl dark:text-white rendered-html">
			{article.metaDescription}
		</p>
	</section>

	<section class="font-normal text-lg dark:text-gray-100 rendered-html">
		{@html article.body}
	</section>
</article>

<ReadMoreSimilar categoryId={article.category.id} />

<style>
	.category {
		text-transform: uppercase;
	}
</style>
