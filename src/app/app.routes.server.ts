import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
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
  {
    path: 'cities/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const citySlugs = ['mumbai', 'pune', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata', 'ahmedabad', 'jaipur', 'nagpur'];
      return citySlugs.map(slug => ({ slug }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];