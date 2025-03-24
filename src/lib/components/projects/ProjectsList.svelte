<script
  lang="ts"
  module>
  let mode = $state<'app' | 'list' | 'map'>('app');
</script>

<script lang="ts">
  import { sineIn, sineOut } from 'svelte/easing';
  import { blur, fade } from 'svelte/transition';
  import { random, ListMode, Figure, Sign } from '@daks.dev/svelte.sdk';
  import { YandexMap } from '$lib/components';

  type Props = {
    projects: Project[];
    grayscale?: boolean;
    center?: string;
    zoom?: number; // (x: number) => (x < 768 && 10) || (x < 1024 && 10.3) || (x < 1280 && 10) || 10.3;
  };
  const { projects, grayscale = false, center, zoom = 10 }: Props = $props();

  const transition = {
    in: { duration: 150, delay: 50, easing: sineIn },
    out: { duration: 75, easing: sineOut }
  };
</script>

{#if projects.length}
  <ListMode
    bind:mode
    length={projects.length}
    class="frame mb-4"
    app
    list
    map />

  {#if mode === 'app'}
    <div
      in:blur={transition.in}
      out:fade={transition.out}
      class="
      frame-xl
      flex flex-wrap justify-center gap-8">
      {#each projects as { id, name, address, images }}
        {@const idx = random(images?.squares)}
        {@const data = { ...images?.squares[idx], title: name, description: address }}
        <a
          class="group relative"
          href={`/projects/${id.toString().padStart(3, '0')}`}>
          <Sign
            icon="mdi:link-variant"
            class="top-2 left-2"
            link
            dark />
          <Figure
            class="
            transition-easy
            group-oversee:drop-shadow-md pointer-events-none overflow-hidden
            rounded-sm border
            border-slate-400
            drop-shadow-lg"
            custom={{
              image: grayscale ? 'transition-easy group-oversee:grayscale-0 grayscale' : undefined,
              caption: `
              group-oversee:opacity-0 absolute bottom-0 left-0 flex h-20 w-full
              flex-col justify-start overflow-hidden
              bg-gray-700/70 p-2 text-ellipsis
              text-white
              transition-opacity duration-1000 ease-in-out`
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
  {:else if mode === 'list'}
    <div
      in:blur={transition.in}
      out:fade={transition.out}
      class={['frame', 'flex flex-col']}>
      {#each projects as { id, name, address, area, area_unit }, idx}
        <a
          class="
          group oversee:bg-slate-400 oversee:drop-shadow-md
          dark:oversee:bg-slate-700 grid grid-cols-[32px_minmax(0,_1fr)_96px] items-center
          px-2 py-4
          odd:bg-slate-400/25 md:grid-cols-[32px_256px_minmax(0,_1fr)_96px] dark:even:bg-slate-700/25"
          href={`/projects/${id.toString().padStart(3, '0')}`}>
          <small>{idx + 1}</small>
          <span
            class="group-oversee:text-sky-700
            max-xs:col-span-2 text-cyan-700 dark:text-cyan-600">
            {name}
          </span>
          <small class="max-md:hidden">{address}</small>
          <span class="max-xs:hidden text-right">
            {Number(area).toLocaleString()}
            {@html area_unit || 'м<sup>2</sup>'}
          </span>
        </a>
      {/each}
    </div>
  {:else}
    <div class="frame-xl hidden sm:block">
      <YandexMap
        class="
        bg--waiting bg-25% sm:bg-20%
        md:bg-10% aspect-square w-full border-4 border-slate-400 bg-gray-100 bg-center bg-no-repeat
        lg:aspect-video dark:bg-slate-200"
        {projects}
        {center}
        {zoom} />
    </div>
  {/if}
{:else}
  <div class="frame text-center">Проектов нет!</div>
{/if}
