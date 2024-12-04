import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageableTableComponent } from '../../shared/pageable-table/pageable-table.component';
import { GetSchedulesQueryParamsDto } from '../../../dtos/GetSchedulesQueryParamsDto';
import { TableItemConfig } from '../../../model/TableConfig';
import { ScheduleService } from '../../../services/ScheduleService';
import { Schedule } from '../../../model/Schedule';

@Component({
  selector: 'app-schedules-tables',
  imports: [PageableTableComponent],
  standalone: true,
  templateUrl: './schedules-tables.component.html',
  styleUrl: './schedules-tables.component.css'
})
export class SchedulesTablesComponent implements OnInit {

  @ViewChild(PageableTableComponent) pageableTableComponent: PageableTableComponent;

  @Input() isForSelection: boolean = false;

  @Input() tableClasses: string[] = [];

  @Output() onSelectSchedule = new EventEmitter<Schedule>();

  maxSelectablePages = 3;
  queryParams: GetSchedulesQueryParamsDto;
  tableItemsConfig: TableItemConfig[] = [
    { columnLabel: 'Nombre', valueReference: 'name' },
    { 
      columnLabel: 'Hora',
      valueReference: [
        {
          type: 'property',
          value: 'startHour'
        },
        {
          type: 'text',
          value: ' - '
        },
        {
          type: 'property',
          value: 'endHour'
        }
      ]
    }
  ];

  constructor(
    public readonly scheduleService: ScheduleService,
  ) { }

  ngOnInit(): void {
    this.queryParams = new GetSchedulesQueryParamsDto();
  }

  getData(): void {
    this.pageableTableComponent.getData();
  }
  
  selectSchedule(schedule: Schedule): void {
    if (this.isForSelection) {
      this.onSelectSchedule.emit(schedule);
    }
  }

}
