import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ViewComponent } from '../../shared/view/view.component';
import { ReportFormComponent } from '../report-form/report-form.component';
import { BlockService } from '../../../services/BlockService';
import { DinamicSelectComponent } from "../../shared/dinamic-select/dinamic-select.component";
import { ReportTableComponent } from "../report-table/report-table.component";

@Component({
  selector: 'app-report-view',
  imports: [ViewComponent, ReportFormComponent, ReportTableComponent],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css',
})
export class ReportViewComponent implements AfterViewInit{
  @ViewChild(ReportFormComponent) modal: ReportFormComponent;
  @ViewChild(ReportTableComponent) table: ReportTableComponent;
  constructor(public readonly blockService: BlockService) {}
  ngAfterViewInit(): void {
    this.table.getData();
  }
  openModal() {
    this.modal.openModal();
  }
}
