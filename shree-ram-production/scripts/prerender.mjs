import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const templatePath = path.join(distDir, 'index.html');

const routes = [
  { path: '/', output: 'index.html' },
  { path: '/services', output: path.join('services', 'index.html') },
  { path: '/work', output: path.join('work', 'index.html') },
  { path: '/about', output: path.join('about', 'index.html') },
  { path: '/contact', output: path.join('contact', 'index.html') },
];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const vite = await createServer({
  root: projectRoot,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  const { render } = await vite.ssrLoadModule('/src/prerender-entry.tsx');
  const { HOME_SEO, SERVICES_SEO, WORK_SEO, ABOUT_SEO, CONTACT_SEO, createHomepageJsonLd, createServicesJsonLd, createWorkJsonLd, ABOUT_JSON_LD, CONTACT_JSON_LD, SITE_NAME, SITE_IMAGE } = await vite.ssrLoadModule('/src/data/seo.ts');
  const template = await fs.readFile(templatePath, 'utf8');

  const routeDataByPath = {
    '/': { ...HOME_SEO, jsonLd: createHomepageJsonLd() },
    '/services': { ...SERVICES_SEO, jsonLd: createServicesJsonLd() },
    '/work': { ...WORK_SEO, jsonLd: createWorkJsonLd() },
    '/about': { ...ABOUT_SEO, jsonLd: ABOUT_JSON_LD },
    '/contact': { ...CONTACT_SEO, jsonLd: CONTACT_JSON_LD },
  };

  for (const route of routes) {
    const { appHtml } = render(route.path);
    const meta = routeDataByPath[route.path];
    if (!meta) {
      throw new Error(`Missing SEO data for route ${route.path}`);
    }

    const jsonLdScripts = (meta.jsonLd || [])
      .map((entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`)
      .join('\n');

    const headTags = [
      `<title>${escapeHtml(meta.title)}</title>`,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
      `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
      `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
      `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
      `<meta property="og:locale" content="en_IN" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:title" content="${escapeHtml(meta.ogTitle)}" />`,
      `<meta property="og:description" content="${escapeHtml(meta.ogDescription)}" />`,
      `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
      `<meta property="og:image" content="${escapeHtml(SITE_IMAGE)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeHtml(meta.ogTitle)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(meta.ogDescription)}" />`,
      `<meta name="twitter:image" content="${escapeHtml(SITE_IMAGE)}" />`,
      jsonLdScripts,
    ].filter(Boolean).join('\n');

    let html = template;
    const rootMarkup = `<div id="root">${appHtml}</div>`;

    if (!html.includes('<div id="root"></div>')) {
      throw new Error('Could not locate root container in Vite template.');
    }

    html = html.replace('<div id="root"></div>', rootMarkup);
    html = html.replace('</head>', `${headTags}\n  </head>`);

    const outputPath = path.join(distDir, route.output);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, html);
  }
} finally {
  await vite.close();
}