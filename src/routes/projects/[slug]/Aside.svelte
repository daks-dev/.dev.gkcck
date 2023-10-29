<script lang="ts">
  import {
    Figure,
    LightboxList,
    LightboxModal,
    LightboxThumbnail,
    Sign
  } from '@daks.dev/svelte.sdk';

  export let sources: ImageMetainfo[] = [];
  export let thumbnails: ImageMetainfo[] = [];
</script>

<LightboxList
  tag="aside"
  class="flex min-w-fit gap-4 md:flex-col md:items-center"
  custom={{ overlay: 'overflow--offset' }}
  options={{ behaviour: 'loop' }}
  loader={() => document?.lazyload.update()}>
  <svelte:fragment slot="thumbnail">
    {#each thumbnails as data, idx}
      {#if idx < 1}
        <LightboxThumbnail class="group relative h-fit first:mt-1">
          <Sign
            class="left-2 top-2"
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
      <span class="text-accent whitespace-nowrap text-lg font-semibold md:self-start">
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
        class="bg-1/10 bg-loading bg-center bg-no-repeat"
        {src}
        {width}
        {height}
        alt=""
        decoding="async"
        loading="lazy" />
    </LightboxModal>
  {/each}
</LightboxList>
