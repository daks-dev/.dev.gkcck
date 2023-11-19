<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { onMount } from 'svelte';
  import { blur } from 'svelte/transition';
  import { sineIn } from 'svelte/easing';
  import { Icon } from '@daks.dev/svelte.sdk';

  const getter = async () => ({
    srcset: (await import('$lib/assets/images/bg/home.webp?w=640;1024;1440&srcset')).default,
    fallback: (await import('$lib/assets/images/bg/home.webp?w=1440&meta')).default
  });

  import microdata from '$lib/configs/microdata';
  const { logo, email, telephone } = microdata.organization;
  const tel = telephone.replace(/\s/g, '').toString();

  const button = `
    relative
    py-4 px-5
    rounded-full border border-gray-400
    text-cyan-600 bg-gray-200/50
    dark:text-slate-400 dark:bg-gray-800/50
    shadow-md shadow-slate-500/50`;

  const handlePoster = () => localStorage.setItem('poster', (poster = !poster).toString());

  let poster: boolean;
  let visible: boolean;
  onMount(() => {
    visible = BROWSER;
    BROWSER && (poster = localStorage.getItem('poster') === 'true');
  });
</script>

<header class="min-h-screen--navbar bg--pattern relative mb-0">
  {#if visible && poster}
    {#await getter() then { srcset, fallback }}
      <img
        in:blur={{
          amount: 5,
          duration: 700,
          delay: 100,
          easing: sineIn
        }}
        class="
          absolute left-0 top-0 h-full max-h-full w-full
          object-cover object-top grayscale
          transition duration-500 ease-in-out
          dark:opacity-20 dark:invert lg:object-center"
        {srcset}
        src={fallback.src}
        alt=""
        decoding="async"
        loading="lazy" />
    {/await}
  {/if}

  <img
    class="
        absolute left-[4vw] top-[4vh] h-[15vh] drop-shadow-lg lg:left-[7vw]
        lg:h-[12.5vh] 2xl:left-[12vw]
        3xl:left-[7vw]"
    src={logo}
    alt=""
    itemprop="logo" />

  <div
    class="
        flex
        w-full flex-row
        items-center justify-center gap-8 pt-[33vh] xs:hidden">
    <a
      class={button}
      href="tel://{telephone.replace(/[\s-()]/g, '')}"
      aria-label="telephone"
      aria-hidden="true"
      itemprop="telephone">
      <span class="sr-only">telephone</span>
      <Icon
        icon="ic:round-phone-in-talk"
        size="4em" />
    </a>
    <a
      class={button}
      href="mailto:{email}"
      aria-label="email"
      aria-hidden="true"
      itemprop="email">
      <span class="sr-only">email</span>
      <Icon
        icon="ic:round-mail-outline"
        size="4em" />
    </a>
  </div>

  <h1
    class="
        text-shadow--home absolute bottom-[10vh] left-[7vw]
        flex flex-col gap-4
        text-4xl font-black tracking-wider
        text-gray-700 dark:text-neutral-300
        xs:text-5xl sm:text-6xl lg:text-7xl xl:left-[12vw]">
    <span class="first-letter:text-brand">Современные</span>
    <span class="first-letter:text-brand">Стандарты</span>
    <span class="first-letter:text-brand">Качества</span>
  </h1>

  <a
    class="
      transition-easy absolute bottom-[10vh] right-[7vw]
      hidden items-center gap-1 font-mono text-3xl
      font-black tracking-tighter text-slate-600
      drop-shadow-lg dark:text-neutral-400 md:flex
      2xl:right-[12vw]
      3xl:right-[7vw]"
    href="tel://{telephone.replace(/[\s-()]/g, '')}"
    itemprop="telephone">
    <span>{tel.substring(0, 7)}</span>
    <span class="text-brand">{tel.substring(7)}</span>
  </a>

  {#if BROWSER}
    <button
      on:click={handlePoster}
      class="
        absolute bottom-[4vh] right-[4vw] opacity-50 drop-shadow-lg
        transition duration-300 oversee:opacity-100
        lg:right-[3vw] 2xl:right-[2vw]"
      class:rotate-45={!poster}
      type="button"
      aria-label="poster"
      aria-hidden="true">
      <span class="sr-only">poster</span>
      <Icon
        icon="ic:round-close"
        size="2em" />
    </button>
  {/if}
</header>
