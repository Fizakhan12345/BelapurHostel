import { Routes } from '@angular/router';
import { CityDetailComponent } from './features/cities-view/city-detail.component';
import { CitiesListComponent } from './features/cities-list/cities-list.component';
import { FindHostelComponent } from './features/property-search/find-hostel';

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
  { path: 'cities', component: CitiesListComponent },
  { path: 'cities/:slug', component: CityDetailComponent },
  { path: 'find-hostel', component: FindHostelComponent },
  {
    path: 'register-your-hostel',
    loadComponent: () => import('./features/admin-registraion/admin-auth.component')
      .then(m => m.AdminAuthComponent)
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