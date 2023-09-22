<script lang="ts">
  import { BROWSER } from 'esm-env';
  import {
    lazyload,
    AppHead,
    Footer,
    NavbarKit,
    RouteTransition,
    ScreenBlock,
    YandexMetrikaInit
  } from '@daks.dev/svelte.pack';
  import { NavPath } from '$lib/components';

  import '../app.css';
  import '$iconify';

  import type { LayoutData } from './$types';
  export let data: LayoutData;

  import { app, nav } from '$lib/configs';

  BROWSER && (document.lazyload ??= lazyload());
</script>

<AppHead {app} />

<RouteTransition
  class="flex flex-col grow"
  refresh={data.refresh}
  mode="1">
  <slot />
</RouteTransition>

<!-- class="-lg:snap-end" -->
<Footer {...nav.footer} />

<NavbarKit
  let:custom
  {...nav.navbar}>
  <!-- icon="ic:round-forward" -->
  <NavPath class={custom.button} />
</NavbarKit>

<ScreenBlock />

<YandexMetrikaInit />
