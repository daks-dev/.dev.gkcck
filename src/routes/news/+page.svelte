<script lang="ts">
  import { onMount } from 'svelte';
  import { Figure, FormattedDate, Sign, YandexMetrikaHit } from '@daks.dev/svelte.sdk';

  import type { PageData } from './$types';
  export let data: PageData;
  const { items } = data;

  const title = 'СКМ • Новости';
  const description = 'Новости предприятия СКМ';

  // const random = (x?: unknown[]): number => (x?.length ? Math.floor(Math.random() * x.length) : -1);

  onMount(() => document?.lazyload.update());
</script>

<YandexMetrikaHit
  {title}
  {description} />

<main itemprop="mainContentOfPage snap-start">
  <header class="wrapper-lg">
    <h1 class="title">Новости</h1>
  </header>

  <div class="grid grid-cols-1 gap-8 wrapper-lg xs:grid-cols-2 md:grid-cols-3">
    {#each items as { slug, title, description, images }}
      <a
        class="group relative place-self-center oversee:text-sky-500"
        href="/news/{slug}">
        <Sign
          class="left-2 top-10"
          link
          dark />
        <Figure
          custom={{
            image: [
              'mb-2 aspect-video w-48 lg:w-auto',
              'rounded-md bg-neutral-500/10 group-hover:scale-105',
              'transition-transform duration-300'
            ]
          }}
          data={{
            ...images[0],
            title,
            description
          }}>
          <FormattedDate
            slot="before"
            class="mb-2 block tracking-wide text-slate-600 dark:text-slate-400"
            date={slug}
            parse="YY-MM-DD" />
        </Figure>
      </a>
      <!--article
        class="flex gap-4 -bp:flex-col"
        aria-posinset={idx + 1}
        aria-setsize={items.length}>
        <a
          class="shadow-md shadow-gray-800 oversee:shadow-lg oversee:shadow-gray-900"
          href="/news/{slug}">
          {#if images.length}
            {@const { src, width, height } = images[0]}
            <img
              class="aspect-video max-w-xs -sm:w-full"
              {src}
              {width}
              {height}
              alt="" />
          {/if}
        </a>
        <div>
          <FormattedDate
            class="mb-2 block tracking-wide text-slate-600 dark:text-slate-400"
            date={slug}
            parse="YY-MM-DD" />
          <p class="font-semibold">{title}</p>
          <p>{description}</p>
        </div>
      </article-->
    {:else}
      <p>Новостей нет!</p>
    {/each}
  </div>
</main>
