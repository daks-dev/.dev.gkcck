<script lang="ts">
  import { twMerge } from '@daks.dev/svelte.pack';

  let className: ClassName = undefined;
  export { className as class };

  export let title: string;
</script>

<div
  class={twMerge('w-full max-w-xs p-4 mx-auto', 'flex flex-col', 'rounded-md border-2', className)}>
  <h4 class="mb-4 sm:h-12 text-accent text-center">
    {title}
  </h4>
  <slot />
</div>
