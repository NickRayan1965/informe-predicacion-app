import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
      path: '',
      component: MainLayoutComponent,
      children: [
          {
              path: 'home', component: HomeComponent,
          },
          {
            path: '', redirectTo: '/home', pathMatch: 'full'
          }
      ]
  },
  
];