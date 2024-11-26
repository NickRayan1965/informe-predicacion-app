import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScheduleService } from '../../../services/ScheduleService';
import { CreateScheduleDto } from '../../../dtos/CreateScheduleDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedules-form',
  imports: [ModalComponent, ReactiveFormsModule, FormsModule],
  standalone: true,
  templateUrl: './schedules-form.component.html',
  styleUrl: './schedules-form.component.css'
})
export class SchedulesFormComponent implements OnInit {
  @Input({required: true}) modalId: string;

  @Input() isEdit = false;

  @Output() saveEvent = new EventEmitter();

  @ViewChild(ModalComponent) modalComponent: ModalComponent;

  scheduleFormGroup: FormGroup;

  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.scheduleFormGroup = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      time: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  
    });
  }

  openModal(): void {
    this.modalComponent.openModal();
  }
  closeModal(): void {
    this.modalComponent.closeModal();
  }
  onSubmit(): void {
    const data: CreateScheduleDto = this.scheduleFormGroup.value;
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
  save(data: CreateScheduleDto): void {
    setTimeout(() => {
      this.scheduleService.create(data).subscribe({
        next: (block) => {
          this.saveEvent.emit();
          this.closeModal();
          this.scheduleFormGroup.reset();
          Swal.fire('Horario creado', `Horario ${block.name} creado correctamente`, 'success');
        },
        error(err) {
          Swal.fire('Error', 'Ocurrió un error al crear el horario', 'error');
        },
      });
    }, 500);
  }
}
