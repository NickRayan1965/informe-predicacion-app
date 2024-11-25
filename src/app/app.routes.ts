import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { TerritoryManagementComponent } from './components/territories/territory-management/territory-management.component';
import { BlocksManagementComponent } from './components/blocks/blocks-management/blocks-management.component';
import { BlockViewComponent } from './components/blocks/block-view/block-view.component';

export const routes: Routes = [
  {
      path: '',
      component: MainLayoutComponent,
      children: [
          {
              path: 'home', component: HomeComponent,
          },
          {
            path: 'territorios', component: TerritoryManagementComponent,
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