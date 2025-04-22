import { NextResponse } from 'next/server';

export async function GET() {
  // Base URL of your website
  const baseUrl = 'https://hirableresume.com';

  // Generate the robots.txt content
  const robotsTxt = `# HirableResume robots.txt - Dynamically generated

# Allow all crawlers
User-agent: *
Allow: /

# Disallow private or authentication-required pages
Disallow: /home/
Disallow: /print/
Disallow: /api/
Disallow: /_next/
Disallow: /basic
Disallow: /premium
Disallow: /affiliate/dashboard/

# Allow specific bots with custom rules
User-agent: Googlebot
Allow: /
Disallow: /home/
Disallow: /print/
Disallow: /api/
Disallow: /_next/
Disallow: /basic
Disallow: /premium
Disallow: /affiliate/dashboard/

User-agent: Bingbot
Allow: /
Disallow: /home/
Disallow: /print/
Disallow: /api/
Disallow: /_next/
Disallow: /basic
Disallow: /premium
Disallow: /affiliate/dashboard/

# Crawl delay for bots to reduce server load
User-agent: *
Crawl-delay: 10

# Sitemap locations
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/api/sitemap
`;

  // Return the robots.txt with the appropriate content type
  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
