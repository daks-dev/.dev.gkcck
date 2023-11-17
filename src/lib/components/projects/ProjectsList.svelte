<script lang="ts">
  import { beforeUpdate, afterUpdate } from 'svelte';
  import { sineIn, sineOut } from 'svelte/easing';
  import { blur, fade } from 'svelte/transition';
  import { Icon, Figure, Sign, scroll } from '@daks.dev/svelte.sdk';
  import { YandexMap } from '$lib/components';

  export let projects: Project[];
  export let mode = 0;

  export let grayscale = false;

  export let center: undefined | string = undefined;
  export let zoom = 10;
  // (x: number) => (x < 768 && 10) || (x < 1024 && 10.3) || (x < 1280 && 10) || 10.3;

  let innerWidth: number;
  $: mapper = innerWidth >= 640;

  const transition = {
    in: { duration: 300, delay: 100, amount: 5, easing: sineIn },
    out: { duration: 200, easing: sineOut }
  };

  const random = (x?: Metadata[]): number =>
    x?.length ? Math.floor(Math.random() * x.length) : -1;

  beforeUpdate(() => mode === 2 && (mode = mapper ? 2 : 0));
  afterUpdate(() => {
    mode || document?.lazyload.update();
    mode === 2 && setTimeout(() => scroll.toObj('#ymap', { offset: -96, duration: 2100 }), 700);
  });
</script>

<svelte:window bind:innerWidth />

<div
  class="
    mb-4 flex items-center
    gap-4 overflow-hidden wrapper-lg">
  <span class="mr-auto p-1.5">[{projects.length}]</span>
  <button
    on:click={() => (mode = 0)}
    class="
      rounded p-1.5
      hover:bg-gray-300 disabled:text-cyan-600
      dark:hover:bg-gray-700 dark:disabled:text-cyan-700"
    type="button"
    disabled={!mode || undefined}>
    <Icon
      icon="ic:round-apps"
      size="1.5em" />
  </button>
  <button
    on:click={() => (mode = 1)}
    class="
      rounded p-1.5
      hover:bg-gray-300 disabled:text-cyan-600
      dark:hover:bg-gray-700 dark:disabled:text-cyan-700"
    type="button"
    disabled={mode === 1 || undefined}>
    <Icon
      icon="ic:round-format-list-bulleted"
      size="1.5em" />
  </button>
  <button
    on:click={() => (mode = 2)}
    class="
      hidden rounded
      p-1.5 hover:bg-gray-300
      disabled:text-cyan-600 dark:hover:bg-gray-700
      dark:disabled:text-cyan-700 sm:block"
    type="button"
    disabled={mode === 2 || undefined}>
    <Icon
      icon="ic:round-map"
      size="1.5em" />
  </button>
</div>

{#if !mode}
  <div
    in:blur={transition.in}
    out:fade={transition.out}
    class="
      flex
      flex-wrap justify-center gap-8 wrapper-xl">
    {#each projects as { id, name, address, images }}
      {@const idx = random(images?.squares)}
      {@const data = { ...images?.squares[idx], title: name, description: address }}
      <a
        class="group relative"
        href={`/projects/${id.toString().padStart(3, '0')}`}>
        <Sign
          class="left-2 top-2"
          link
          dark />
        <Figure
          class="
            drop-shadow-deep
            transition-easy pointer-events-none overflow-hidden
            rounded border
            border-slate-400
            group-hover:drop-shadow-md"
          custom={{
            image: grayscale ? 'transition-easy grayscale group-hover:grayscale-0' : undefined,
            caption: `
              absolute bottom-0 left-0 flex h-20 w-full flex-col
              justify-start overflow-hidden text-ellipsis
              bg-gray-700/70 p-2 text-white
              transition-opacity
              duration-1000 ease-in-out group-hover:opacity-0`
          }}
          {data} />
        {#if idx >= 0}
          <link
            rel="image"
            itemprop="image"
            href={images?.sources[idx].src} />
          <link
            rel="image"
            itemprop="thumbnailUrl"
            href={images?.squares[idx].src} />
        {/if}
      </a>
    {/each}
  </div>
{:else if mode === 1}
  <div
    in:blur={transition.in}
    out:fade={transition.out}
    class="
      flex
      flex-col wrapper-lg">
    {#each projects as { id, name, address, area, area_unit }, idx}
      <a
        class="
          group grid grid-cols-[32px_minmax(0,_1fr)_96px]
          items-center px-2 py-4 odd:bg-slate-400/25
          hover:bg-slate-400 hover:drop-shadow-md
          dark:even:bg-slate-700/25 dark:hover:bg-slate-700 md:grid-cols-[32px_256px_minmax(0,_1fr)_96px]"
        href={`/projects/${id.toString().padStart(3, '0')}`}>
        <small>{idx + 1}</small>
        <span
          class="text-cyan-700
            group-hover:text-sky-700 dark:text-cyan-600 -xs:col-span-2">
          {name}
        </span>
        <small class="-md:hidden">{address}</small>
        <span class="text-right -xs:hidden">
          {Number(area).toLocaleString()}
          {@html area_unit || 'м<sup>2</sup>'}
        </span>
      </a>
    {/each}
  </div>
{:else}
  <div class="hidden wrapper-xl sm:block">
    <YandexMap
      class="
        aspect-square w-full border-4
        border-slate-400 bg-gray-100 bg-waiting bg-25% bg-center bg-no-repeat dark:bg-slate-200 sm:bg-20%
        md:bg-10% lg:aspect-video"
      {projects}
      {center}
      {zoom} />
  </div>
{/if}
