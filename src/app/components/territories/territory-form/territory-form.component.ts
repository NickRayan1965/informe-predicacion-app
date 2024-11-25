import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TerritoryService } from '../../../services/TerritoryService';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateTerritoryDto } from '../../../model/CreateTerritoryDto';
import Swal from 'sweetalert2';
import { ModalComponent } from "../../shared/modal/modal.component";

@Component({
  selector: 'app-territory-form',
  imports: [ReactiveFormsModule, ModalComponent],
  standalone: true,
  templateUrl: './territory-form.component.html',
  styleUrl: './territory-form.component.css'
})
export class TerritoryFormComponent implements OnInit {

  @Input({required: true}) modalId: string;
  @Input() isEdit = false;
  @Output() saveEvent = new EventEmitter();
  @ViewChild(ModalComponent) modalComponent: ModalComponent;
  territoryFormGroup: FormGroup;

  constructor(private readonly territoryService: TerritoryService, private readonly fb: FormBuilder) {}
  ngOnInit(): void {
    this.territoryFormGroup = this.fb.group({
      name: [''],
      description: ['']
    });
  }
  
  openModal(): void {
    this.modalComponent.openModal();
  }

  onSubmit(): void {
    const data: CreateTerritoryDto = this.territoryFormGroup.value;
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
  save(data: CreateTerritoryDto) {
    setTimeout(() => {
      this.territoryService.create(data).subscribe({
        next: (territory) => {
          this.saveEvent.emit();
          this.closeModal();
          this.territoryFormGroup.reset();
          Swal.fire('Territorio creado', `Territorio ${territory.name} creado con éxito`, 'success');
        },
        error(err) {
          Swal.fire('Error', 'Ocurrió un error al crear el territorio', 'error');
        },
      });    
    }, 500);
  }
  closeModal() {
    this.modalComponent.closeModal();
  }

}
