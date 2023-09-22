<script lang="ts">
  import {
    Figure,
    LightboxList,
    LightboxModal,
    LightboxThumbnail,
    Sign
  } from '@daks.dev/svelte.pack';

  export let sources: Metadata[] = [];
  export let thumbnails: Metadata[] = [];
</script>

<LightboxList
  tag="aside"
  class="flex md:flex-col md:items-center gap-4 min-w-fit"
  custom={{ overlay: 'overflow--offset' }}
  options={{ behaviour: 'loop' }}
  loader={() => document?.lazyload.update()}>
  <svelte:fragment slot="thumbnail">
    {#each thumbnails as data, idx}
      {#if idx < 1}
        <LightboxThumbnail class="relative group h-fit first:mt-1">
          <Sign
            class="top-2 left-2"
            icon="ic:round-zoom-out-map"
            dark />
          <Figure
            class="flex flex-col items-center"
            custom={{
              image: `
              rounded drop-shadow-deep
              hover:drop-shadow-hard hover:scale-105
              transition duration-500 ease-in-out`,
              caption: 'flex flex-col mt-2 pt-2'
            }}
            {data} />
        </LightboxThumbnail>
      {/if}
      <link
        rel="image"
        href={sources[idx].src} />
      <link
        rel="thumbnailUrl"
        href={thumbnails[idx].src} />
    {/each}
    {#if sources.length > 1}
      <span class="md:self-start font-semibold text-lg text-accent whitespace-nowrap">
        [ +{sources.length - 1} ]
      </span>
    {/if}
  </svelte:fragment>
  {#each sources as { src, width, height, title, subtitle, description }}
    <LightboxModal
      {title}
      {subtitle}
      {description}>
      <img
        class="bg-no-repeat bg-center bg-1/10 bg-loading"
        {src}
        {width}
        {height}
        alt=""
        decoding="async"
        loading="lazy" />
    </LightboxModal>
  {/each}
</LightboxList>
