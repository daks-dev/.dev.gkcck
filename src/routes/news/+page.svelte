<script
  lang="ts"
  module>
  let mode = $state<'app' | 'list'>('app');
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { Figure, FormattedDate, ListMode, Sign, YandexMetrikaHit } from '@daks.dev/svelte.sdk';

  import placeholder from '$lib/assets/images/logo.png?w=288&aspect=16:9&fit=contain&meta';

  // const random = (x?: unknown[]): number => (x?.length ? Math.floor(Math.random() * x.length) : -1);

  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
  const { items } = data;

  const title = 'ГК ССК • Новости';
  const description = 'Новости группы компаний «ССК»';

  onMount(() => document?.lazyload.update());
</script>

<YandexMetrikaHit
  {title}
  {description} />

<main itemprop="mainContentOfPage">
  <header class="frame mb-4">
    <h1 class="title">Новости</h1>
  </header>

  {#if items.length}
    <ListMode
      bind:mode
      class="frame mb-4"
      length={items.length}
      app
      list />

    {#if mode === 'app'}
      <div
        class={[
          'frame',
          'xs:grid-cols-2 grid grid-cols-1 md:grid-cols-3',
          'place-content-start gap-8 lg:gap-12'
        ]}>
        {#each items as { slug, title, description, poster, images }, idx}
          {@const image = poster === false ? placeholder : images[poster]}
          <a
            class="group oversee:text-sky-500 relative"
            href="/news/{slug}">
            <Sign
              icon="mdi:link-variant"
              class="top-9"
              link
              dark />
            <Figure
              custom={{
                image: [
                  'mb-2 aspect-video h-auto w-48 sm:w-64 lg:w-full',
                  'bg-neutral-500/10',
                  'rounded-md',
                  'group-oversee:grayscale-0 grayscale',
                  poster === false && [
                    'p-2',
                    'group-oversee:border-inherit border-2 border-slate-400 dark:border-slate-600'
                  ],
                  'transition duration-300 ease-in-out'
                ]
              }}
              data={{
                ...image,
                title,
                description
              }}>
              {#snippet before()}
                <FormattedDate
                  class={[
                    'mb-2 block',
                    'font-mono tracking-wide',
                    'group-oversee:text-inherit text-slate-600 dark:text-slate-400'
                  ]}
                  date={slug ?? ''}
                  parse="YY-MM-DD" />
              {/snippet}
            </Figure>
            <link
              rel="image"
              href={image.src} />
          </a>
        {/each}
      </div>
    {:else}
      <div class={['frame', 'flex flex-col']}>
        {#each items as { slug, title, description }, idx}
          <a
            class={[
              'group',
              'px-2 py-4',
              'grid grid-cols-[32px_minmax(0,_1fr)_160px] md:grid-cols-[32px_288px_minmax(0,_1fr)_160px]',
              'items-center',
              'odd:bg-slate-400/20',
              'oversee:!bg-slate-400/40 oversee:text-sky-500'
            ]}
            href="/news/{slug}">
            <small>{idx + 1}</small>
            <span class="group-oversee:!text-inherit text-slate-600 dark:text-slate-400">
              {title}
            </span>
            <small class="max-md:hidden">{description}</small>
            <FormattedDate
              class="text-right font-mono"
              date={slug ?? ''}
              parse="YY-MM-DD" />
          </a>
        {/each}
      </div>
    {/if}
  {:else}
    <div class="frame text-center">Новостей нет!</div>
  {/if}
</main>
