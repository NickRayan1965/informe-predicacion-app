import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../shared/modal/modal.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlockService } from '../../../services/BlockService';
import { CreateBlockDto } from '../../../dtos/CreateBlockDto';
import Swal from 'sweetalert2';
import { Territory } from '../../../model/Territory';
import { TerritoryManagementComponent } from "../../territories/territory-management/territory-management.component";

@Component({
  selector: 'app-block-form',
  imports: [ModalComponent, ReactiveFormsModule, TerritoryManagementComponent, FormsModule],
  standalone: true,
  templateUrl: './block-form.component.html',
  styleUrl: './block-form.component.css'
})
export class BlockFormComponent implements OnInit {

  @Input({required: true}) modalId: string;
  
  @Input() isEdit = false;
  
  @Output() saveEvent = new EventEmitter();

  @ViewChild('main') modalComponent: ModalComponent;
  
  @ViewChild('territoryManagement') territoryManagementComponent: ModalComponent;

  territoryManagementModalId = 'territoryManagementModalBlockForm';

  blockFormGroup: FormGroup;

  constructor(private readonly blockService: BlockService, private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.blockFormGroup = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      territoryId: new FormControl(null, [Validators.required]), 
      territoryName: new FormControl({value: '', disabled: true})
    });
  }

  openModal(): void {
    this.modalComponent.openModal();
  }
  closeModal(): void {
    this.modalComponent.closeModal();
  }

  setTerritory(territory: Territory): void {
    this.blockFormGroup.get('territoryId').setValue(territory.id);
    this.blockFormGroup.get('territoryName').setValue(territory.name);
    this.closeTerritoryManagement();
  }

  onSubmit(): void {
    const data: CreateBlockDto = this.blockFormGroup.value;
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
  save(data: CreateBlockDto) {
    setTimeout(() => {
      this.blockService.create(data).subscribe({
        next: (block) => {
          this.saveEvent.emit();
          this.closeModal();
          this.blockFormGroup.reset();
          Swal.fire('Manzana creado', `Bloque ${block.name} creado con éxito`, 'success');
        },
        error(err) {
          Swal.fire('Error', 'Ocurrió un error al crear el bloque', 'error');
        },
      });
    }, 500);
  }
  openTerritoryManagement() {
    this.territoryManagementComponent.openModal();
  }
  closeTerritoryManagement() {
    this.territoryManagementComponent.closeModal();
  }


}
