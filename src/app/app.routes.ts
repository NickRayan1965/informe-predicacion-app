import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { BlockViewComponent } from './components/blocks/block-view/block-view.component';
import { TerritoryViewComponent } from './components/territories/territory-view/territory-view.component';
import { SchedulesViewComponent } from './components/schedules/schedules-view/schedules-view.component';
import { ReportViewComponent } from './components/reports/report-view/report-view.component';

export const routes: Routes = [
  {
      path: '',
      component: MainLayoutComponent,
      children: [
          {
              path: 'home', component: ReportViewComponent,
          },
          {
            path: 'territorios', component: TerritoryViewComponent,
          },
          { 
            path: 'bloques', component: BlockViewComponent,
          },
          { 
            path: 'horarios', component: SchedulesViewComponent,
          },
          {
            path: 'reportes', component: ReportViewComponent,
          },
          {
            path: '', redirectTo: '/home', pathMatch: 'full'
          }
      ]
  },
  
];