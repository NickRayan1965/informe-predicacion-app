import { Component } from '@angular/core';
import { ViewComponent } from '../../shared/view/view.component';
import { SchedulesManagementComponent } from "../schedules-management/schedules-management.component";

@Component({
  selector: 'app-schedules-view',
  imports: [ViewComponent, SchedulesManagementComponent],
  templateUrl: './schedules-view.component.html',
  styleUrl: './schedules-view.component.css'
})
export class SchedulesViewComponent {

}
