<script lang="ts">
  import { YandexMetrikaHit } from '@daks.dev/svelte.sdk';
  import { ActivityCard, ProjectsCarousel } from '$lib/components';

  import { nav } from '$lib/configs';
  const activity = Object.values(nav.navbar.links).find((el) => el.href === '/activity');

  import type { PageData } from './$types';
  export let data: PageData;
  const { projects } = data;

  export let show = (x: number) => (x < 480 && 1) || (x < 640 && 2) || 3;

  const title = 'ГК ССК • Направления деятельности';
  const description = 'Направления деятельности группы компаний «ССК»';
</script>

<YandexMetrikaHit
  {title}
  {description} />

<main itemprop="mainContentOfPage">
  <header class="content">
    <h1 class="title">Направления деятельности</h1>
  </header>

  {#if activity?.links?.length}
    <div class="content mb-12">
      <div
        class="
          mx-auto grid w-fit
          max-w-full grid-cols-none gap-8 md:grid-cols-2 lg:gap-x-16 2xl:gap-x-32">
        {#each activity.links as { href, label }}
          <ActivityCard
            class="w-full hover:bg-slate-300/20"
            href="/activity{href}">
            <h4
              slot="title"
              class="
                text-accent group-hover:text-brand transition-easy
                group-hover:drop-shadow-md">
              {@html label}
            </h4>
          </ActivityCard>
        {/each}
      </div>
    </div>
  {/if}

  <ProjectsCarousel
    class="
      content
      overflow-hidden rounded-md
      drop-shadow-md hover:drop-shadow-none"
    custom={{
      progress: 'top-0'
    }}
    {projects}
    {show}
    duration={15000}
    controls="play move wheel"
    progress
    stream
    check />
</main>
