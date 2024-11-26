import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { BlockViewComponent } from './components/blocks/block-view/block-view.component';
import { TerritoryViewComponent } from './components/territories/territory-view/territory-view.component';

export const routes: Routes = [
  {
      path: '',
      component: MainLayoutComponent,
      children: [
          {
              path: 'home', component: HomeComponent,
          },
          {
            path: 'territorios', component: TerritoryViewComponent,
          },
          { 
            path: 'bloques', component: BlockViewComponent,
          },
          {
            path: '', redirectTo: '/home', pathMatch: 'full'
          }
      ]
  },
  
];