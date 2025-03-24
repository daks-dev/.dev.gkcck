<script lang="ts">
  import { browser } from '$app/environment';
  import {
    lazyload,
    Head,
    Footer,
    NavbarKit,
    RouteTransition,
    ScreenBlock,
    YandexMetrikaInit
  } from '@daks.dev/svelte.sdk';
  import { NavPath } from '$lib/components';

  import '../app.css';
  import '$iconify';

  import type { LayoutProps } from './$types';
  let { children, data }: LayoutProps = $props();

  import { app, nav } from '$lib/configs';

  browser && (document.lazyload ??= lazyload());
</script>

<Head {app} />

<RouteTransition
  refresh={data.refresh}
  class="flex grow flex-col"
  duration={275}
  delay={125}
  mode={1}>
  {@render children?.()}
</RouteTransition>

<Footer {...nav.footer} />

<NavbarKit
  let:custom
  {...nav.navbar}>
  <NavPath class={custom.button} />
</NavbarKit>

<ScreenBlock class="bg-neutral-100 dark:bg-gray-800" />

<YandexMetrikaInit />
