/// <reference types="@daks.dev/svelte.sdk/types" />

declare module '*.svx' {
  import type { SvelteComponent } from 'svelte';
  export default class Comp extends SvelteComponent {}
  export const metadata: Record<string, unknown>;
}
declare module '*.svelte.md' {
  import type { SvelteComponent } from 'svelte';
  export default class Comp extends SvelteComponent {}
  export const metadata: Record<string, unknown>;
}

type ComponentType = import('svelte').ComponentType;
declare interface MdsvexLoad {
  default: ComponentType;
  metadata: Record<string, unknown>;
}

declare namespace App {
  // interface Locals {}
  // interface Error {}
  // interface PageData {}
  // interface Platform {}
}

interface Project {
  id: number;
  name: string;
  address: string;
  area: number;
  area_term?: string;
  area_unit?: string;
  units?: number;
  units_term?: string;
  scope?: string;
  scope_term?: string;
  activities?: string;
  location: string;
  note?: string;
  title?: string;
  description?: string;
  customer?: number;
  priority?: number;
  hidden?: boolean;
  images: Record<string, ImageMetainfo[]>;
}

interface Partner {
  id: number;
  name: string;
  email?: string;
  telephone?: string;
  address?: string;
  url?: string;
  title?: string;
  description?: string;
  projects?: number;
  center?: string;
  zoom?: number;
  priority?: number;
  hidden?: boolean;
  images: Record<string, ImageMetainfo[]>;
}

interface Vacancy {
  id: number;
  title?: string;
  content?: string;
  email?: string;
  telephone?: string;
  count?: number;
  hidden?: boolean;
}
