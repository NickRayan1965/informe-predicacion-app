import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageableTableComponent } from '../../shared/pageable-table/pageable-table.component';
import { GetReportsQueryParamsDto } from '../../../dtos/GetReportsQueryParamsDto';
import { TableItemConfig } from '../../../model/TableConfig';
import { Report, ReportPlained } from '../../../model/Report';
import { ReportService } from '../../../services/ReportService';
import { map } from 'rxjs';
import { ListResponseDto } from '../../../dtos/ListResponseDto';

@Component({
  selector: 'app-report-table',
  imports: [PageableTableComponent],
  standalone: true,
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.css'
})
export class ReportTableComponent implements OnInit {
  
  @ViewChild(PageableTableComponent) pageableTableComponent: PageableTableComponent;

  @Input() tableClasses: string[] = [];

  @Input() isForSelection = false;

  @Output() onReportSelected = new EventEmitter<Report>();

  maxSelectablePages = 3;
  queryParams: GetReportsQueryParamsDto;
  dataTransformer = map((response: ListResponseDto<Report>) => {
    const {data, ...rest} = response;
    const tranformed: ListResponseDto<ReportPlained> = {
      ...rest,
      data: data.map(Report.toReportPlained)
    };
    return tranformed;
  });
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
    },
    {
      columnLabel: 'Conductor',
      valueReference: 'preachingCompleteName'
    }
  ];
  constructor(
    public readonly reportService: ReportService,
  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.queryParams = new GetReportsQueryParamsDto();
  }
  getData(queryParams?: Partial<GetReportsQueryParamsDto>): void {
    if (queryParams) {
      this.queryParams = { ...this.queryParams, ...queryParams };
    }
    this.pageableTableComponent.getData();
  }
  onReportSelectedEvent(report: Report): void {
    if (this.isForSelection) {
      this.onReportSelected.emit(report);
    }
  }
  setIdsToExclude(ids: number[]): void {
    this.pageableTableComponent.setIdsToExclude(ids);
  }
  getRawResponse(): ListResponseDto<ReportPlained> {
    return this.pageableTableComponent.getRawResponse<ReportPlained>();
  }

}
