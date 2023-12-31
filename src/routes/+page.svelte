<script lang="ts">
  import { onMount } from 'svelte';
  import { Sign, YandexMetrikaHit } from '@daks.dev/svelte.sdk';
  import {
    ActivityCard,
    HomeHeader,
    PartnersCarousel,
    ProjectsCarousel,
    YandexMap
  } from '$lib/components';

  import type { PageData } from './$types';
  export let data: PageData;
  const { projects, partners } = data;

  import { nav } from '$lib/configs';
  const activity = Object.values(nav.navbar.links).find((el) => el.href === '/activity');

  const title = 'ГК ССК • Современные Стандарты Качества';
  const description = 'Группа компаний «ССК»: cовременные cтандарты rачества';

  onMount(() => document?.lazyload.update());
</script>

<YandexMetrikaHit
  {title}
  {description} />

<main
  class="relative min-h-screen"
  itemprop="mainContentOfPage">
  <HomeHeader />

  <ProjectsCarousel
    {projects}
    duration={15000}
    controls="play move"
    progress
    stream
    grayscale
    check />

  {#if activity?.links?.length}
    <!--
      flex flex-wrap justify-around gap-y-8 gap-x-16
    -->
    <section class="pt-12 wrapper-xl lg:pt-16">
      <h2 class="mb-8 text-brand">Направления деятельности</h2>
      <div
        class="
          mx-auto grid w-fit
          max-w-full grid-cols-none gap-8 md:grid-cols-2 lg:gap-x-16 2xl:gap-x-32">
        {#each activity.links as { href, label }}
          <ActivityCard
            class="w-full oversee:bg-slate-500/20 dark:oversee:bg-slate-300/20"
            href="/activity{href}">
            <div
              slot="title"
              class="
                transition-easy
                text-xl text-accent group-oversee:text-brand
                group-oversee:drop-shadow-deep">
              {@html label}
            </div>
          </ActivityCard>
        {/each}
      </div>
    </section>
  {/if}

  <YandexMap
    class={[
      'hidden',
      'mx-auto mt-16 aspect-video w-full max-w-xl overflow-hidden',
      'bg-neutral-300 bg-waiting bg-20% bg-center bg-no-repeat',
      'border-4 border-slate-400',
      'transition duration-500',
      'sm:block',
      'md:max-w-2xl',
      'xl:absolute',
      'xl:right-[5vw] xl:top-[5vh] xl:aspect-4/3 xl:max-w-md xl:rounded-lg',
      'xl:border xl:drop-shadow-brand xl:oversee:drop-shadow-md',
      '2xl:right-[10vw]',
      '3xl:right-[18vw] 3xl:top-[8vh]'
    ]}
    {projects}
    scaled />

  <section class="pt-12 wrapper-xl lg:pt-16">
    <h2 class="mb-8 text-brand">О нас</h2>
    <div class="flex justify-center gap-8 -md:flex-wrap">
      <a
        class="
          group relative
          order-1 h-fit w-80
          shrink-0 drop-shadow-md
          oversee:drop-shadow-sm md:order-none"
        href="/partners"
        aria-label="партнёры">
        <span class="sr-only">партнёры</span>
        <Sign
          class="left-2 top-2"
          link
          light />
        <PartnersCarousel
          class="pointer-events-none overflow-hidden rounded border"
          {partners}
          controls=""
          duration={500}
          delay={3500}
          stream>
          парнёры
        </PartnersCarousel>
      </a>
      <div class="readable text-justify">
        <p>
          <strong>Группа компаний «ССК»</strong> создана в 2000 году. Она включает в себя динамично развивающиеся
          компании, работающие в сфере строительства и реализующие амбициозные и уникальные проекты.
        </p>
        <p>
          Сегодня <strong>ГК ССК</strong> является одним из лидеров в строительной отрасли и осуществляет
          следующие функции: технического заказчика, строительный контроль, проектирование, а так же
          лабораторные испытания на базе собственной строительной лаборатории.
        </p>
        <p>
          Наличие штата квалифицированных специалистов практически всех основных строительных
          специальностей позволяет работать с объектами разной степени сложности.
          <b>ГК&nbsp;«ССК»</b> по праву гордится широким портфолио выполненных работ и положительными
          рекомендациями клиентов &mdash; государственных и частных заказчиков работ и услуг в сфере
          строительства.
        </p>
      </div>
    </div>
  </section>
</main>
