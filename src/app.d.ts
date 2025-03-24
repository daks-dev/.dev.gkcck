/// <reference types="@daks.dev/svelte.sdk/types" />

type ComponentType = import('svelte').SvetleComponent;
declare module '*.(svx|md)' {
  const Component: ComponentType;
  export default Component;
  export const metadata: Record<string, unknown>;
}
declare interface MDLoadData {
  metadata: Record<string, unknown>;
  default: ComponentType;
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
