import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SchedulesTablesComponent } from '../schedules-tables/schedules-tables.component';
import { SchedulesFormComponent } from '../schedules-form/schedules-form.component';
import { Schedule } from '../../../model/Schedule';
import { ScheduleService } from '../../../services/ScheduleService';

@Component({
  selector: 'app-schedules-management',
  imports: [SchedulesTablesComponent, SchedulesFormComponent],
  standalone: true,
  templateUrl: './schedules-management.component.html',
  styleUrl: './schedules-management.component.css'
})
export class SchedulesManagementComponent implements AfterViewInit{
  
  @ViewChild(SchedulesTablesComponent) schedulesTablesComponent: SchedulesTablesComponent;

  @ViewChild(SchedulesFormComponent) schedulesFormComponent: SchedulesFormComponent;

  @Output() onSelectSchedule = new EventEmitter<Schedule>();

  @Input() isForSelection: boolean = false;

  constructor(
    private readonly scheduleService: ScheduleService
  ) {}

  ngAfterViewInit(): void {
    this.schedulesTablesComponent.getData();
  }

  openScheduleForm() {
    this.schedulesFormComponent.openModal();
  }

  saveScheduleEvent() {
    this.schedulesTablesComponent.getData();
  }
  getData(): void {
    this.schedulesTablesComponent.getData();
  }

  selectSchedule(schedule: Schedule): void {
    if (this.isForSelection) {
      this.onSelectSchedule.emit(schedule);
    }
  }


}
