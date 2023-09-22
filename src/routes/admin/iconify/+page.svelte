<script lang="ts">
  import { AppHead, IconifyAdmin } from '@daks.dev/svelte.pack';
  import { navigate } from '@daks.dev/svelte.pack/stores';

  $navigate = {
    prev: {
      href: '/admin',
      title: 'Admin'
    },
    next: { href: '' }
  };

  import type { PageData } from './$types';
  export let data: PageData;
  const { meta, local, bundles } = data;

  const robots = 'noindex, follow';
  const title = 'ГК ССК • Admin [ Iconify ]';
</script>

<AppHead
  {robots}
  {title} />

<main>
  <header class="content">
    <h1 class="title">Iconify</h1>
  </header>

  <IconifyAdmin
    {meta}
    {local}
    {bundles} />
</main>
