import colors from 'tailwindcss/colors';
import common from '@daks.dev/svelte.sdk/tailwind/presets/common';
import { fontSans } from '@daks.dev/svelte.sdk/tailwind/font-family';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,md,mdx,svelte}', ...common.content],

  presets: [common],

  theme: {
    extend: {
      colors: {
        accent: colors.cyan[600],
        brand: colors.rose[600]
      },
      fontFamily: fontSans(),
      dropShadow: {
        brand: ['0 5px 5px rgb(128 8 8 / 0.4)', '0 3px 3px rgb(128 8 8 / 0.2)']
      }
    }
  }
} satisfies Config;
