import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static/simple pages — safe to prerender at build time
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'properties', renderMode: RenderMode.Prerender },
  { path: 'cities', renderMode: RenderMode.Prerender },
  { path: 'find-hostel', renderMode: RenderMode.Prerender },
  { path: 'register-your-hostel', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'services', renderMode: RenderMode.Prerender },
  { path: 'help', renderMode: RenderMode.Prerender },

  // Dynamic route — this is the one that was failing.
  // Prerendered with a known list of slugs via getPrerenderParams.
  // If your city list is fixed/small, this generates a static page per city (best for SEO/speed).
  {
    path: 'cities/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      // TODO: replace this hardcoded list with a real fetch from your
      // API/service/JSON file if the city list can change without a rebuild.
      // Example with a fetch:
      //   const res = await fetch('https://your-api.com/cities');
      //   const cities = await res.json();
      //   return cities.map((city: { slug: string }) => ({ slug: city.slug }));

      const citySlugs = [
        'mumbai',
        'pune',
        'delhi',
        'bangalore',
        'hyderabad',
        'chennai',
        'kolkata',
        'ahmedabad',
        'jaipur',
        'nagpur'
      ];

      return citySlugs.map(slug => ({ slug }));
    }
  },

  // Catch-all — anything not explicitly listed above falls back to
  // client-side rendering at request time instead of failing the build.
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];