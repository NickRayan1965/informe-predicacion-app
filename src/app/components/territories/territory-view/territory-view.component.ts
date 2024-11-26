import { Component } from '@angular/core';
import { ViewComponent } from '../../shared/view/view.component';
import { TerritoryManagementComponent } from '../territory-management/territory-management.component';

@Component({
  selector: 'app-territory-view',
  imports: [ViewComponent, TerritoryManagementComponent],
  standalone: true,
  templateUrl: './territory-view.component.html',
  styleUrl: './territory-view.component.css'
})
export class TerritoryViewComponent {

}
