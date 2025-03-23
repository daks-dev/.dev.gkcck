import type { PageLoad } from './$types';

export const load: PageLoad = async () => ({
  sources: [
    (await import('$lib/content/contacts/00.webp?meta')).default,
    (await import('$lib/content/contacts/01.webp?meta')).default
  ],
  modified: (await import('$lib/content/contacts/00.webp?w=320&meta')).default
});
