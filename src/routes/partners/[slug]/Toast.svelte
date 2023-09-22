<script lang="ts">
  import { Icon } from '@daks.dev/svelte.pack';
  import { Toast } from '$lib/components';
</script>

<Toast
  let:touch
  once="partners"
  top>
  <div class="flex gap-2 -xs:hidden">
    <Icon
      class="w-7 h-7 -ml-1"
      icon="ic:round-play-arrow"
      hFlip />
    <Icon
      class="w-7 h-7"
      icon="ic:round-play-arrow" />
  </div>
  <div class="-xs:hidden">используйте для навигации внутри каталога партнёров</div>
  {#if touch}
    <Icon
      class="w-7 h-7 -ml-1 xs:mt-4"
      icon="ic:round-touch-app" />
    <div>
      на устройствах с сенсорным вводом
      <span class="xs:hidden">для навигации внутри каталога партнёров</span>
      <span class="-xs:hidden">для этого также</span>
      доступно горизонтальное пролистывание экрана
    </div>
  {/if}
</Toast>
