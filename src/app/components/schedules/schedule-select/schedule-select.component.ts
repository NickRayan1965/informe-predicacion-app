import { Component, Input, ViewChild } from '@angular/core';
import { DinamicSelectComponent } from "../../shared/dinamic-select/dinamic-select.component";
import { ScheduleService } from '../../../services/ScheduleService';
import { ILabelField } from '../../../interfaces/ILabelFIeld';
import { Observable } from 'rxjs';
import { Schedule } from '../../../model/Schedule';
import { QueryParamsNoPagination } from '../../../dtos/QueryParamsNoPagination';
import { GetSchedulesQueryParamsDto } from '../../../dtos/GetSchedulesQueryParamsDto';

@Component({
  selector: 'app-schedule-select',
  imports: [DinamicSelectComponent],
  standalone: true,
  templateUrl: './schedule-select.component.html',
  styleUrl: './schedule-select.component.css'
})
export class ScheduleSelectComponent {
  @Input() labelField: ILabelField[] | string = [
    {
      type: 'property',
      value: 'name'
    },
    {
      type: 'raw',
      value: ' / '
    },
    {
      type: 'property',
      value: 'startHour'
    },
    {
      type: 'raw',
      value: ' - '
    },
    {
      type: 'property',
      value: 'endHour'
    }
  ];
  @ViewChild(DinamicSelectComponent) dinamicSelectComponent: DinamicSelectComponent;
  constructor(
    public readonly scheduleService: ScheduleService
  ) {}
  getSelected$(): Observable<Schedule> {
    return this.dinamicSelectComponent.getSelectedSubject$();
  }
  setSelected$(block: Schedule) {
    this.dinamicSelectComponent.setSelected$(block);
  }
  setQuery(query: QueryParamsNoPagination<GetSchedulesQueryParamsDto>) {
    this.dinamicSelectComponent.setQuery(query);
  }
  loadAllData() {
    this.dinamicSelectComponent.loadAllData();
  }
  setIdsToExclude(ids: string[]) {
    this.dinamicSelectComponent.setIdsToExclude(ids);
  }
  getTotalElements() {
    return this.dinamicSelectComponent.totalElements;
  }
}
