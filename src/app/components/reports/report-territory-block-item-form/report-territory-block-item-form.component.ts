import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../shared/modal/modal.component";
import { BlocksManagementComponent } from "../../blocks/blocks-management/blocks-management.component";
import { Block } from '../../../model/Block';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateReportTerritoryItemDto } from '../../../dtos/CreateReportTerritoryItemDto';
import { CreateTerritoryBlockItemDto } from '../../../dtos/CreateReportTerritoryBlockItemDto ';
import Swal from 'sweetalert2';
import { ReportTerritoryBlockItem } from '../../../model/ReportTerritoryBlockItem';
import { Territory } from '../../../model/Territory';

@Component({
  selector: 'app-report-territory-block-item-form',
  imports: [ModalComponent, BlocksManagementComponent, ReactiveFormsModule],
  standalone: true,
  templateUrl: './report-territory-block-item-form.component.html',
  styleUrl: './report-territory-block-item-form.component.css'
})
export class ReportTerritoryBlockItemFormComponent {

  @ViewChild('main') modal: ModalComponent;
  @ViewChild('blockManagementModal') blockManagementModal: ModalComponent;
  @ViewChild(BlocksManagementComponent) blockManagementComponent: BlocksManagementComponent;

  @Output() onAdd = new EventEmitter<ReportTerritoryBlockItem>();

  reportTerritoryBlockItemFormGroup: FormGroup;
  
  territory: Territory;
  
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.reportTerritoryBlockItemFormGroup = this.formBuilder.group({
      blockId: new FormControl(null, [Validators.required]),
      blockName: new FormControl({value: '', disabled: true}),
      observations: new FormControl('', [Validators.maxLength(250)]),
      completed: new FormControl(false)
    });
  }

  openModal() {
    this.modal.openModal();
  }
  closeModal() {
    this.modal.closeModal();
  }

  openBlockManagementModal() {
    this.blockManagementModal.openModal();
    this.blockManagementComponent.setTerritory(this.territory);
    this.blockManagementComponent.getData({
      territoryId: this.territory.id
    });
  }
  closeBlockManagementModal() {
    this.blockManagementModal.closeModal();
  }
  setTerritory(territory: Territory) {
    this.territory = territory;
  }
  onSelectBlock(block: Block) {
    this.reportTerritoryBlockItemFormGroup.get('blockId').setValue(block.id);
    this.reportTerritoryBlockItemFormGroup.get('blockName').setValue(block.name);

    this.closeBlockManagementModal();
  }
  onSubmit() {
    if (!this.reportTerritoryBlockItemFormGroup.valid) {
      Swal.fire('Error', 'Formulario inválido', 'error');
    }
    const dto = this.reportTerritoryBlockItemFormGroup.value;
    const entity: ReportTerritoryBlockItem = {
      id: null,
      blockId: dto.blockId,
      blockName: dto.blockName,
      reportTerritoryItemId: null,
      observations: dto.observations,
      completed: dto.completed
    };
    this.reportTerritoryBlockItemFormGroup.reset();
    this.onAdd.emit(entity);
  }
    
}
