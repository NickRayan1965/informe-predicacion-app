import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ReportService } from '../../../services/ReportService';
import { CreateReportDto } from '../../../dtos/CreateReportDto';
import Swal from 'sweetalert2';
import { SchedulesManagementComponent } from "../../schedules/schedules-management/schedules-management.component";
import { Schedule } from '../../../model/Schedule';
import { UsersManagementComponent } from "../../users/users-management/users-management.component";
import { User } from '../../../model/User';
import { ReportTerritoryItemFormComponent } from "../report-territory-item-form/report-territory-item-form.component";
import { ReportTerritoryItem } from '../../../model/ReportTerritoryItem';
import { CommonModule } from '@angular/common';
import { ReportTerritoryBlockItem } from '../../../model/ReportTerritoryBlockItem';
import { ScheduleSelectComponent } from "../../schedules/schedule-select/schedule-select.component";
import { UsersSelectComponent } from "../../users/users-select/users-select.component";
import { CreateReportTerritoryItemDto } from '../../../dtos/CreateReportTerritoryItemDto';

@Component({
  selector: 'app-report-form',
  imports: [ReactiveFormsModule, ModalComponent, ReportTerritoryItemFormComponent, CommonModule, ScheduleSelectComponent, UsersSelectComponent],
  standalone: true,
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent implements OnInit, AfterViewInit {

  @Input({required: true}) modalId: string;
  
  @Input() isEdit = false;

  @Output() saveEvent = new EventEmitter();

  @ViewChild('main') modalComponent: ModalComponent;
  @ViewChild(ScheduleSelectComponent) scheduleSelectComponent: ScheduleSelectComponent;
  @ViewChild(UsersSelectComponent) usersSelectComponent: UsersSelectComponent;
  @ViewChild('reportTerritoryItemForm') reportTerritoryItemForm: ReportTerritoryItemFormComponent;

  reportTerritoryItems: ReportTerritoryItem[] = [];

  reportFormGroup: FormGroup;

  constructor(
    private readonly reportService: ReportService,
    private readonly fb: FormBuilder
  ) {
    this.reportFormGroup = this.fb.group({
      date: new FormControl('', [Validators.required]),
      scheduleId: new FormControl('', [Validators.required]),
      preachingDriverId: new FormControl('', [Validators.required]),
      observations: new FormControl('', [Validators.maxLength(250)]),
    });
  }
  ngAfterViewInit(): void {
    this.scheduleSelectComponent.getSelected$().subscribe({
      next: (schedule) => {
        schedule && this.reportFormGroup.get('scheduleId').setValue(schedule.id);
      }
    });
    this.usersSelectComponent.getSelected$().subscribe({
      next: (user) => {
        user && this.reportFormGroup.get('preachingDriverId').setValue(user.id);
      }
    });
  } 


  ngOnInit(): void {
    this.reportFormGroup = this.fb.group({
      date: new FormControl(new Date(), [Validators.required]),
      scheduleId: new FormControl({value: null}),
      preachingDriverId: new FormControl({value: null}),
      observations: new FormControl('', [Validators.maxLength(250)]),
    });
  }

  openModal(): void {
    this.modalComponent.openModal();
    this.scheduleSelectComponent.loadAllData();
    this.usersSelectComponent.loadAllData();
  }
  closeModal() {
    this.modalComponent.closeModal();
  }
  onSubmit(): void {
    const data: CreateReportDto = this.reportFormGroup.value;
    data.items = this.reportTerritoryItems.map(item => {
      return {
        territoryId: item.territory.id,
        observations: item.observations,
        completed: item.completed,
        blocks: item.blocks.map(reportTerritoryBlockItem => {
          return {
            blockId: reportTerritoryBlockItem.blockId,
            observations: reportTerritoryBlockItem.observations,
            completed: reportTerritoryBlockItem.completed
          };
        })
      } as CreateReportTerritoryItemDto;
    });
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
    console.log({data});
    setTimeout(() => {
      this.reportService.create(data).subscribe({
        next: (report) => {
          this.saveEvent.emit();
          this.closeModal();
          this.resetForm();
          Swal.fire('Reporte creado', `Reporte para el ${report.date} - ${report.schedule.name} creado con éxito`, 'success');
        },
        error(err) {
          console.error(err);
          Swal.fire('Error', 'Ocurrió un error al crear el reporte', 'error');
        },
      });    
    }, 500);
  }
  private resetForm() {
    this.reportFormGroup.reset();
    this.reportTerritoryItems = [];
    this.scheduleSelectComponent.setSelected$(null);
    this.usersSelectComponent.setSelected$(null);
  }

  openReportTerritoryItemForm() {
    this.reportTerritoryItemForm.openModal();
  }
  closeReportTerritoryItemForm() {
    this.reportTerritoryItemForm.closeModal();
  }

  onScheduleSelected(schedule: Schedule) {
    this.reportFormGroup.get('scheduleId').setValue(schedule.id);
    this.reportFormGroup.get('scheduleName').setValue(schedule.name + ' / ' + schedule.
    startHour + ' - ' + schedule.endHour);
  }
  onAddReportTerritoryItem(reportTerritoryItem: ReportTerritoryItem) {
    this.reportTerritoryItems.push(reportTerritoryItem);
  }
  getBlocksJoined(reportTerritoryBlockItems: ReportTerritoryBlockItem[]): string {
    // return reportTerritoryBlockItems.map(item => item.blockName).join(', ');
    const areMoreThanOne = reportTerritoryBlockItems.length > 1;
    return reportTerritoryBlockItems.map((item, index) => {
      if (!areMoreThanOne) {
        return item.blockName;
      }
      if (index === reportTerritoryBlockItems.length - 2) {
        return `${item.blockName} y `;
      }else if (index === reportTerritoryBlockItems.length - 1) {
        return item.blockName;
      }
      return `${item.blockName}, `;
    }).join('');
  }

}
