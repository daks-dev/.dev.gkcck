<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Contacts,
    LightboxList,
    LightboxThumbnail,
    LightboxModal,
    Sign,
    YandexMap,
    YandexMetrikaHit
  } from '@daks.dev/svelte.sdk';

  import type { PageData } from './$types';
  export let data: PageData;
  const { thumbnail, sources } = data;

  import microdata from '$lib/configs/microdata';

  const dataset = {
    locations: [
      {
        geometry: [55.771174, 37.60589],
        properties: {
          iconContent: '<strong class="tracking-wider">ГК «ССК»</strong>',
          balloonContentHeader: 'Группа Компаний «ССК»',
          balloonContentBody:
            '<img class=mx-auto src=/assets/images/ymap.webp width=192 height=192 />',
          balloonContentFooter:
            '<div class=text-center>время работы: 9 <sup>00</sup> -- 19 <sup>00</sup></div>'
        },
        options: {
          preset: 'islands#nightStretchyIcon'
        }
      }
    ],
    state: {
      center: [55.771174, 37.60589],
      zoom: 17,
      behaviors: ['drag', 'dblClickZoom', 'rightMouseButtonMagnifier', 'multiTouch'],
      controls: ['zoomControl', 'fullscreenControl']
    },
    options: {
      autoFitToViewport: 'always'
    }
  };

  const title = 'ГК ССК • Контакты';
  const description = 'Контакты группы компаний «ССК»';

  onMount(() => document?.lazyload.update());
</script>

<YandexMetrikaHit
  {title}
  {description} />

<main
  class="grow gap-8"
  itemprop="mainContentOfPage">
  <header class="mb-0 wrapper-lg">
    <h1 class="title">Контакты</h1>
  </header>

  <div class="flex items-center justify-around gap-8 wrapper-lg">
    <Contacts
      class="h-fit"
      {microdata} />

    <LightboxList
      class="group relative -sm:hidden md:shrink-0"
      custom={{ overlay: 'overflow-offset' }}
      options={{ behaviour: 'loop' }}
      loader={() => document?.lazyload.update()}
      title="ССК"
      description="Группа компаний">
      <svelte:fragment slot="thumbnail">
        <LightboxThumbnail>
          <Sign
            class="left-5 top-2"
            icon="ic:round-zoom-out-map"
            dark />
          <img
            class="
            hover:drop-shadow-deep
            transition-easy mx-3
            rounded-md drop-shadow-md
            hover:scale-105"
            {...thumbnail}
            alt="" />
        </LightboxThumbnail>
      </svelte:fragment>
      {#each sources as source}
        <LightboxModal>
          <img
            {...source}
            alt="" />
        </LightboxModal>
      {/each}
    </LightboxList>
  </div>

  <div
    class="
      flex h-[40vmax] grow
      wrapper-lg xs:h-[35vmax] sm:h-[30vmax] md:h-[25vmax] lg:h-auto">
    <YandexMap
      class="
        min-h-full w-full overflow-hidden
        border-4 border-slate-400 bg-gray-100 bg-waiting bg-25% bg-center bg-no-repeat dark:bg-slate-200
        sm:bg-20% md:bg-10%"
      data={dataset} />
  </div>
</main>
