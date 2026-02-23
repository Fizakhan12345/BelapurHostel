import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  {
    path: 'properties',
    loadComponent: () => import('./features/properties/properties').then(m => m.Properties)
  },
  // {
  //   path: 'properties/:id',
  //   renderMode: RenderMode.Server  // Use SSR instead of prerender
  // }
  {
    path: 'booking/:id',
    loadComponent: () => import('./features/booking/booking').then(m => m.Booking)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/Contact/contact').then(m => m.Contact)
  },
    {
    path: 'services',
    loadComponent: () => import('./features/OurServices/ourservices').then(m => m.OurServicesComponent)
  },
      {
    path: 'help',
    loadComponent: () => import('./features/Help/help').then(m => m.HelpComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];