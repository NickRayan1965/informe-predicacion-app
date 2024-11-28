import { Component, ViewChild } from '@angular/core';
import { ViewComponent } from "../../shared/view/view.component";
import { ReportFormComponent } from "../report-form/report-form.component";

@Component({
  selector: 'app-report-view',
  imports: [ViewComponent, ReportFormComponent],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {
  @ViewChild(ReportFormComponent) modal: ReportFormComponent;

  openModal() {
    this.modal.openModal();
  }

}
