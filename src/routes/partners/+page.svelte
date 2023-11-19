<script lang="ts">
  import { onMount } from 'svelte';
  import { Figure, Sign, YandexMetrikaHit } from '@daks.dev/svelte.sdk';
  import { Toast } from '$lib/components';

  import type { PageData } from './$types';
  export let data: PageData;
  const { partners } = data;

  const title = 'ГК ССК • Партнёры';
  const description = 'Партнёры группы компаний «ССК»';

  onMount(() => document?.lazyload.update());
</script>

<YandexMetrikaHit
  {title}
  {description} />

<main itemprop="mainContentOfPage">
  <header class="wrapper-lg">
    <h1 class="title">Партнёры</h1>
  </header>

  <div class="flex flex-wrap justify-center gap-2 wrapper-xl">
    {#each partners as { id, projects, hidden, images }}
      {@const data = {
        ...images?.squares[0],
        ...(projects ? { subtitle: `${projects}` } : undefined)
      }}
      {#if !hidden}
        <a
          class="group relative"
          href={`/partners/${id.toString().padStart(3, '0')}`}>
          <Sign
            class="left-2 top-2"
            link
            light />
          <Figure
            class="drop-shadow-md oversee:drop-shadow-sm"
            custom={{
              caption: `
              absolute bottom-1 right-1 flex h-8 w-8 flex-col
              items-center justify-center rounded-full bg-black/30
              px-2 py-1 text-white
              opacity-50 group-oversee:opacity-100`
            }}
            {data} />
        </a>
      {/if}
    {/each}
  </div>
</main>

<Toast once="init" />
