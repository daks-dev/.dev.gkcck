import { extendTailwindMerge, mergeConfigs, type Config } from 'tailwind-merge';
import { getTwConfig as __getTwConfig } from '@daks.dev/svelte.pack';

export const getTwConfig = (...configs: Array<Partial<Config>>) =>
  __getTwConfig(
    {
      classGroups: {
        // 'text-color': [{ text: ['accent', 'brand'] }],
        // 'bg-color': [{ bg: ['accent', 'brand'] }],
        // 'border-color': [{ border: ['accent', 'brand'] }],
        'drop-shadow': [{ 'drop-shadow': ['brand'] }]
      }
    },
    ...configs
  );

export default extendTailwindMerge((config: Config): Config => mergeConfigs(config, getTwConfig()));
