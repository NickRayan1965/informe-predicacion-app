import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PageableTableComponent } from '../../shared/pageable-table/pageable-table.component';
import { GetReportsQueryParamsDto } from '../../../dtos/GetReportsQueryParamsDto';
import { TableItemConfig } from '../../../model/TableConfig';
import { Report } from '../../../model/Report';
import { ReportService } from '../../../services/ReportService';

@Component({
  selector: 'app-report-table',
  imports: [],
  standalone: true,
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.css'
})
export class ReportTableComponent {
  @ViewChild(PageableTableComponent) pageableTableComponent: PageableTableComponent;

  @Input() tableClasses: string[] = [];

  @Input() isForSelection = false;

  @Output() onReportSelected = new EventEmitter<Report>();

  maxSelectablePages = 3;
  queryParams: GetReportsQueryParamsDto;
  tableItemsConfig: TableItemConfig[] = [
    {
      columnLabel: 'Fecha',
      valueReference: 'date'
    },
    {
      columnLabel: 'Horario',
      valueReference: 'schedulePlained'
    },
    {
      columnLabel: 'Territorios',
      valueReference: 'territoriesPlained'
    }
  ];
  constructor(
    public readonly reportService: ReportService,
  ) {}
  

}
