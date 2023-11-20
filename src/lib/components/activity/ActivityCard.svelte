<script lang="ts">
  import { Icon, Sign } from '@daks.dev/svelte.sdk';
  import twMerge from '$lib/tailwind';

  let className: ClassName = undefined;
  export { className as class };

  export let href: undefined | string = undefined;

  export let size: number | string = '4em';
  export let animate = ''; // 'animate-pulse oversee:animation-paused';
</script>

<svelte:element
  this={href ? 'a' : 'div'}
  class={twMerge(
    'group relative p-7 py-4',
    'flex flex-col',
    'text-slate-700 dark:text-slate-300',
    'rounded border border-current shadow',
    animate,
    className
  )}
  {href}>
  <Sign
    class="left-1 top-1"
    link
    small />
  <slot name="title" />
  <div class="mb-7 mt-2 flex grow flex-col justify-center pl-4">
    <slot>
      <div class="">
        Объектов реализовано:
        <span class="text-2xl text-brand">...</span>
      </div>
      <div class="">
        Объекты в работе:
        <span class="text-2xl text-brand">...</span>
      </div>
    </slot>
  </div>
  <div class="flex items-start gap-5">
    <Icon
      class="
        transition-easy drop-shadow-lg
        group-oversee:drop-shadow-md"
      icon="ic:round-account-circle"
      {size} />
    <div class="flex grow flex-col gap-3 opacity-75">
      <small>руководитель направления:</small>
      <div
        class="
          transition-easy flex grow flex-col
          gap-2
          opacity-75 drop-shadow-lg
          group-oversee:drop-shadow-none">
        <div class="h-2.5 w-3/4 rounded-full bg-current" />
        <div class="h-2 w-full rounded-full bg-current" />
      </div>
    </div>
  </div>
  <span class="sr-only">loading...</span>
</svelte:element>
