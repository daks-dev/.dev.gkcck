<script lang="ts">
  import { onMount } from 'svelte';
  import {
    ImagePlaceholder,
    TextPlaceholder,
    TestimonialPlaceholder,
    WidgetPlaceholder,
    YandexMetrikaHit,
    audio
  } from '@daks.dev/svelte.pack';

  const title = 'ГК ССК • Строительный контроль';
  const description = 'Выполнение строительного контроля группой компаний «ССК»';

  onMount(() => setTimeout(() => audio.beep(250, 150, 75), 800));
</script>

<YandexMetrikaHit
  {title}
  {description} />

<main itemprop="mainContentOfPage">
  <header class="content">
    <h1 class="title">Строительный контроль</h1>
  </header>

  <div class="content space-y-8">
    <ImagePlaceholder />
    <div class="flex -md:flex-col gap-8">
      <div class="flex flex-col justify-center gap-16 grow -md:order-1">
        <TextPlaceholder class="w-full" />
        <TestimonialPlaceholder class="w-full max-w-sm mx-auto" />
      </div>
      <WidgetPlaceholder class="mx-auto" />
    </div>
  </div>
</main>
