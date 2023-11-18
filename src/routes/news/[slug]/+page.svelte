<script lang="ts">
  import { onMount } from 'svelte';
  import { FormattedDate, YandexMetrikaHit } from '@daks.dev/svelte.sdk';

  import '@daks.dev/svelte.sdk/styles/content.css';

  import type { PageData } from './$types';
  export let data: PageData;
  const { slug, title, description, content, images } = data;

  onMount(() => document?.lazyload.update());
</script>

<YandexMetrikaHit
  {title}
  {description} />

<main itemprop="mainContentOfPage">
  <header class="wrapper-lg">
    <h1 class="title mb-4">{title}</h1>
    <FormattedDate
      class="text-xl tracking-wide text-slate-600 dark:text-slate-400"
      date={slug}
      parse="YY-MM-DD" />
  </header>

  <div class="flex gap-8 wrapper-lg -sm:flex-col">
    <div
      class="mt-2 flex shrink-0 flex-wrap justify-around gap-5 -sm:order-last sm:flex-col sm:justify-start">
      {#each images as { src, width, height }}
        <img
          class="rounded-md -lg:w-48"
          {src}
          {width}
          {height}
          alt="" />
      {/each}
    </div>
    <div class="content grow">
      <svelte:component this={content} />
    </div>
  </div>
</main>
