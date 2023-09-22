<script lang="ts">
  import { Icon, Sign } from '@daks.dev/svelte.pack';
  import twMerge from '$lib/assets/tailwindcss';

  let className: ClassName = undefined;
  export { className as class };

  export let href: undefined | string = undefined;

  export let size: number | string = '4em';
  export let animate = ''; // 'animate-pulse hover:animation-paused';
</script>

<svelte:element
  this={href ? 'a' : 'div'}
  class={twMerge(
    'relative group py-4 p-7',
    'flex flex-col',
    'rounded border border-current shadow',
    animate,
    className
  )}
  {href}>
  <Sign
    class="top-1 left-1"
    link
    small />
  <slot name="title" />
  <div class="pl-4 mt-2 mb-7 flex flex-col grow justify-center">
    <slot>
      <div class="text-slate-500">
        Объектов реализовано:
        <span class="text-2xl text-brand">...</span>
      </div>
      <div class="text-slate-500">
        Объекты в работе:
        <span class="text-2xl text-brand">...</span>
      </div>
    </slot>
  </div>
  <div class="flex items-start gap-5 text-slate-500">
    <Icon
      class="
        drop-shadow-deep group-hover:drop-shadow-md
        transition-easy"
      icon="ic:round-account-circle"
      {size} />
    <div class="flex flex-col gap-3 grow opacity-75">
      <small>руководитель направления:</small>
      <div
        class="
          flex flex-col gap-2 grow
          opacity-75
          drop-shadow-deep group-hover:drop-shadow-none
          transition-easy">
        <div class="h-2.5 w-3/4 rounded-full bg-current" />
        <div class="h-2 w-full rounded-full bg-current" />
      </div>
    </div>
  </div>
  <span class="sr-only">loading...</span>
</svelte:element>
