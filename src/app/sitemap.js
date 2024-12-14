// app/sitemap.js
export default async function sitemap() {
    const baseUrl = 'https://citu.ci';
  
    // Your base routes
    const routes = [
      {
        url: `${baseUrl}/en-US`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/fr`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      // Add more static routes as needed
    ];
  
    return routes;
  }