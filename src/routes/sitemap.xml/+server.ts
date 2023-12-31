import { getPartners, getProjects } from '$lib/shared/sql/sqlite3';
import { map } from '$lib/configs/nav';
map.includes('/') || map.unshift('/');

const pages = map.concat(
  getProjects().map((el) => `/projects/${el.id.toString().padStart(3, '0')}`),
  getPartners().map((el) => `/partners/${el.id.toString().padStart(3, '0')}`)
);

const PRIORITY = 0.7;
const CHANGEFREG = 'weekly'; // daily weekly monthly
const TIMESTAMP = new Date().toISOString();

const canonical = process.env.PUBLIC_APP_CANONICAL
  ? new URL(process.env.PUBLIC_APP_CANONICAL).origin
  : '';

const urlset =
  canonical &&
  pages
    .sort()
    .map(
      (el) =>
        `
  <url>
    <loc>${canonical}${el === '/' ? '' : el}</loc>
    <lastmod>${`${TIMESTAMP}`}</lastmod>
    <changefreq>${CHANGEFREG}</changefreq>
    <priority>${el === '/' ? '1.0' : PRIORITY}</priority>
  </url>`
    )
    .join('');

export const prerender = true;

export async function GET() {
  return new Response(
    `
<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>${urlset}
</urlset>
    `
      .trim()
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/> </g, '><'),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}
