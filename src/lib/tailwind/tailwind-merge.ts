import { getTwMerge } from '@daks.dev/svelte.sdk/tailwind/tailwind-merge';
import { twmerge } from '@daks.dev/svelte.sdk/stores/nano';

twmerge.set({
  'drop-shadow': [{ 'drop-shadow': ['brand'] }]
});

const twMerge = getTwMerge();

export default (...x: ClassName[]) => twMerge(...x) || undefined;
