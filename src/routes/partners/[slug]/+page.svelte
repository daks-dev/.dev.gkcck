<script lang="ts">
  import { onMount } from 'svelte';
  import { Figure, Icon, YandexMetrikaHit } from '@daks.dev/svelte.pack';
  import Toast from './Toast.svelte';
  import { ProjectsList } from '$lib/components';

  import type { PageData } from './$types';
  export let data: PageData;
  const { partner, prev, next, projects } = data;
  const { id, name, email, telephone, address, url, title, description, center, zoom } = partner;

  import { navigate } from '@daks.dev/svelte.pack/stores';
  $navigate = { prev, next };

  onMount(() => document?.lazyload.update());
</script>

<YandexMetrikaHit
  title="ГК ССК • {title || name}"
  description={description || `ГК ССК : ${title || name}`} />

<main itemprop="mainContentOfPage">
  <header
    class="
      content
      flex items-start gap-2 lg:gap-4">
    <h1 class="title">{name}</h1>
    <small class="font-semibold text-accent">({id})</small>
  </header>

  <div class="content flex -sm:flex-col gap-8">
    <Figure
      class="shrink-0"
      custom={{ image: 'border border-slate-400 drop-shadow' }}
      data={partner.images?.sources[0]} />
    <div class="space-y-4">
      <div class="flex gap-4 items-center">
        <Icon
          class="shrink-0 w-8 h-8 text-cyan-700"
          icon="ic:outline-location-on">
          адрес
        </Icon>
        {@html address || '&mdash;'}
      </div>
      <div class="flex gap-4 items-center">
        <Icon
          class="shrink-0 w-8 h-8 text-cyan-700"
          icon="ic:round-phone-android">
          телефон
        </Icon>
        {@html telephone || '&mdash;'}
      </div>
      <div class="flex gap-4 items-center">
        <Icon
          class="shrink-0 w-8 h-8 text-cyan-700"
          icon="ic:round-alternate-email">
          электронная почта
        </Icon>
        {@html email || '&mdash;'}
      </div>
      <div class="flex gap-4 items-center">
        <Icon
          class="shrink-0 w-8 h-8 text-cyan-700"
          icon="ic:round-link">
          сайт
        </Icon>
        {@html url || '&mdash;'}
      </div>
    </div>
  </div>

  {#if projects.length}
    <hr class="content my-8" />
    <ProjectsList
      {projects}
      zoom={zoom || undefined}
      center={center || undefined} />
  {/if}
</main>

<Toast />
