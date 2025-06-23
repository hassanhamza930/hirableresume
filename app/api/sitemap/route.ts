import { NextResponse } from 'next/server';

export async function GET() {
  // Base URL of your website
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hirableresume.com';

  // Current date in ISO format for lastmod
  const date = new Date().toISOString().split('T')[0];

  // Define your routes - in a real app, you might fetch these from a database
  const routes = [
    { url: '/', changefreq: 'weekly', priority: '1.0', lastmod: date },
    { url: '/lander', changefreq: 'weekly', priority: '0.9', lastmod: date },
    { url: '/signin', changefreq: 'monthly', priority: '0.8', lastmod: date },
    { url: '/blog', changefreq: 'weekly', priority: '0.8', lastmod: date },
    { url: '/blog/how-to-make-hirable-resume-2025', changefreq: 'monthly', priority: '0.7', lastmod: date },
    { url: '/blog/why-hiring-sucks-in-2025', changefreq: 'monthly', priority: '0.7', lastmod: date },
    { url: '/affiliate', changefreq: 'monthly', priority: '0.7', lastmod: date },
    { url: '/affiliate/signup', changefreq: 'monthly', priority: '0.6', lastmod: date },
    { url: '/start', changefreq: 'monthly', priority: '0.6', lastmod: date },
  ];

  // Generate the XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
${routes.map(route => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    ${route.url === '/' || route.url === '/lander' || route.url.startsWith('/blog') ? `
    <image:image>
      <image:loc>${baseUrl}/og.png</image:loc>
      <image:title>HirableResume - AI-Powered Resume Builder</image:title>
      <image:caption>Personalize your resume for each job description using AI</image:caption>
    </image:image>` : ''}
  </url>`).join('')}
</urlset>`;

  // Return the XML sitemap with the appropriate content type
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
