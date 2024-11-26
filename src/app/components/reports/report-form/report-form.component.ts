import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ReportService } from '../../../services/ReportService';
import { CreateReportDto } from '../../../dtos/CreateReportDto';
import Swal from 'sweetalert2';
import { SchedulesManagementComponent } from "../../schedules/schedules-management/schedules-management.component";

@Component({
  selector: 'app-report-form',
  imports: [ReactiveFormsModule, ModalComponent, SchedulesManagementComponent],
  standalone: true,
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent implements OnInit {
 

  
  @Input({required: true}) modalId: string;
  
  @Input() isEdit = false;

  @Output() saveEvent = new EventEmitter();

  @ViewChild('main') modalComponent: ModalComponent;

  @ViewChild('scheduleModal') scheduleModal: ModalComponent;

  reportFormGroup: FormGroup;

  constructor(
    private readonly reportService: ReportService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reportFormGroup = this.fb.group({
      date: [null],
      scheduleId: [null],
      scheduleName: new FormControl({value: null, disabled: true}),
      conductorCompleteName: new FormControl({value: null, disabled: true}),
      preachingDriverId: [null],
      observations: [null],
    });
  }

  openModal(): void {
    this.modalComponent.openModal();
  }
  closeModal() {
    this.modalComponent.closeModal();
  }

  onSubmit(): void {
    const data: CreateReportDto = this.reportFormGroup.value;
    Swal.fire({
      title: 'Guardando...',
      text: 'Por favor espere',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.save(data);
  }
  save(data: CreateReportDto) {
    setTimeout(() => {
      this.reportService.create(data).subscribe({
        next: (report) => {
          this.saveEvent.emit();
          this.closeModal();
          this.reportFormGroup.reset();
          Swal.fire('Reporte creado', `Reporte para el ${report.date} - ${report.schedule.name} creado con éxito`, 'success');
        },
        error(err) {
          Swal.fire('Error', 'Ocurrió un error al crear el reporte', 'error');
        },
      });    
    }, 500);
  }

  openScheduleManagement() {
    this.scheduleModal.openModal();
  }
  closeScheduleManagement() {
    this.scheduleModal.closeModal();
  }
}
