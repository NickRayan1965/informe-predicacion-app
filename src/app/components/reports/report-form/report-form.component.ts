import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ReportService } from '../../../services/ReportService';
import { CreateReportDto } from '../../../dtos/CreateReportDto';
import Swal from 'sweetalert2';
import { SchedulesManagementComponent } from "../../schedules/schedules-management/schedules-management.component";
import { Schedule } from '../../../model/Schedule';
import { UsersManagementComponent } from "../../users/users-management/users-management.component";
import { User } from '../../../model/User';
import { ReportTerritoryItemFormComponent } from "../report-territory-item-form/report-territory-item-form.component";

@Component({
  selector: 'app-report-form',
  imports: [ReactiveFormsModule, ModalComponent, SchedulesManagementComponent, UsersManagementComponent, ReportTerritoryItemFormComponent],
  standalone: true,
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent implements OnInit, AfterViewInit {

 

  
  @Input({required: true}) modalId: string;
  
  @Input() isEdit = false;

  @Output() saveEvent = new EventEmitter();

  @ViewChild('main') modalComponent: ModalComponent;

  @ViewChild('scheduleModal') scheduleModal: ModalComponent;
  @ViewChild('userModal') userModal: ModalComponent;
  @ViewChild('reportTerritoryItemForm') reportTerritoryItemForm: ReportTerritoryItemFormComponent;

  reportFormGroup: FormGroup;

  constructor(
    private readonly reportService: ReportService,
    private readonly fb: FormBuilder
  ) {}
  ngAfterViewInit(): void {
  }

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
  openUserManagement() {
    this.userModal.openModal();
  }
  closeUserManagement() {
    this.userModal.closeModal();
  }

  openReportTerritoryItemForm() {
    this.reportTerritoryItemForm.openModal();
  }
  closeReportTerritoryItemForm() {
    this.reportTerritoryItemForm.closeModal();
  }

  onScheduleSelected(schedule: Schedule) {
    this.reportFormGroup.get('scheduleId').setValue(schedule.id);
    this.reportFormGroup.get('scheduleName').setValue(schedule.name + ' / ' + schedule.time);
    this.scheduleModal.closeModal();
  }
  onUserSelected(user: User) {
    this.reportFormGroup.get('preachingDriverId').setValue(user.id);
    this.reportFormGroup.get('conductorCompleteName').setValue(`${user.names} ${user.lastNames}`);
    this.userModal.closeModal();
  } 
}
