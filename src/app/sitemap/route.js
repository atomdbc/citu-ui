// app/sitemap.xml/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">

  <!-- Root Domain -->
  <url>
    <loc>https://citu.ci</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.00</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://citu.ci/fr"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://citu.ci"/>
  </url>

  <!-- Main Language Versions -->
  <url>
    <loc>https://citu.ci/fr</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.00</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://citu.ci"/>
    <image:image>
      <image:loc>https://citu.ci/citu_logo.png</image:loc>
      <image:title>Citu.ci Logo</image:title>
      <image:caption>Premier Real Estate Platform in Côte d'Ivoire</image:caption>
    </image:image>
  </url>

  <url>
    <loc>https://citu.ci/en-US</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.90</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="fr" href="https://citu.ci/fr"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://citu.ci"/>
  </url>

  <!-- Main Listing Pages -->
  <url>
    <loc>https://citu.ci/fr/listings</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.90</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US/listings"/>
    <image:image>
      <image:loc>https://citu.ci/images/listings/cocody1.png</image:loc>
      <image:title>Featured Properties in Cocody</image:title>
    </image:image>
  </url>

  <url>
    <loc>https://citu.ci/en-US/listings</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.90</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="fr" href="https://citu.ci/fr/listings"/>
  </url>

  <!-- Location-based Pages -->
  <url>
    <loc>https://citu.ci/fr/listings/location/cocody</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.85</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US/listings/location/cocody"/>
  </url>

  <url>
    <loc>https://citu.ci/fr/listings/location/plateau</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.85</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US/listings/location/plateau"/>
  </url>

  <url>
    <loc>https://citu.ci/fr/listings/location/riviera</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.85</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US/listings/location/riviera"/>
  </url>

  <!-- Property Type Pages -->
  <url>
    <loc>https://citu.ci/fr/listings/type/apartment</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.85</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US/listings/type/apartment"/>
  </url>

  <url>
    <loc>https://citu.ci/fr/listings/type/house</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.85</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US/listings/type/house"/>
  </url>

  <url>
    <loc>https://citu.ci/fr/listings/type/commercial</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.85</priority>
    <changefreq>daily</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US/listings/type/commercial"/>
  </url>

  <!-- Additional Pages -->
  <url>
    <loc>https://citu.ci/fr/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.70</priority>
    <changefreq>monthly</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US/about"/>
  </url>

  <url>
    <loc>https://citu.ci/fr/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.70</priority>
    <changefreq>monthly</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US/contact"/>
  </url>

  <!-- Blog Section -->
  <url>
    <loc>https://citu.ci/fr/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.75</priority>
    <changefreq>weekly</changefreq>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://citu.ci/en-US/blog"/>
  </url>

  <!-- Sample Listings -->
  <url>
    <loc>https://citu.ci/fr/listings/1</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.80</priority>
    <changefreq>weekly</changefreq>
    <image:image>
      <image:loc>https://citu.ci/images/listings/cocody1.png</image:loc>
      <image:title>Luxury Property in Cocody</image:title>
      <image:caption>Spacious apartment with modern amenities</image:caption>
    </image:image>
  </url>

  <url>
    <loc>https://citu.ci/fr/listings/2</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.80</priority>
    <changefreq>weekly</changefreq>
    <image:image>
      <image:loc>https://citu.ci/images/listings/plateau1.png</image:loc>
      <image:title>Modern Office Space in Plateau</image:title>
    </image:image>
  </url>

  <url>
    <loc>https://citu.ci/fr/listings/3</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.80</priority>
    <changefreq>weekly</changefreq>
    <image:image>
      <image:loc>https://citu.ci/images/listings/riviera1.png</image:loc>
      <image:title>Luxury Villa in Riviera</image:title>
    </image:image>
  </url>

</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}