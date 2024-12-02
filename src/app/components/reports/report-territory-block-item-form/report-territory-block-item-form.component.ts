import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../shared/modal/modal.component";
import { BlocksManagementComponent } from "../../blocks/blocks-management/blocks-management.component";
import { Block } from '../../../model/Block';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateReportTerritoryItemDto } from '../../../dtos/CreateReportTerritoryItemDto';
import { CreateTerritoryBlockItemDto } from '../../../dtos/CreateReportTerritoryBlockItemDto ';
import Swal from 'sweetalert2';
import { ReportTerritoryBlockItem } from '../../../model/ReportTerritoryBlockItem';
import { Territory } from '../../../model/Territory';
import { ListResponseDto } from '../../../dtos/ListResponseDto';
import { DinamicSelectComponent } from "../../shared/dinamic-select/dinamic-select.component";
import { BlockService } from '../../../services/BlockService';
import { BlockSelectComponent } from "../../blocks/block-select/block-select.component";

@Component({
  selector: 'app-report-territory-block-item-form',
  imports: [ModalComponent, ReactiveFormsModule, BlockSelectComponent],
  standalone: true,
  templateUrl: './report-territory-block-item-form.component.html',
  styleUrl: './report-territory-block-item-form.component.css'
})
export class ReportTerritoryBlockItemFormComponent implements AfterViewInit{

  @ViewChild('main') modal: ModalComponent;

  @ViewChild(BlockSelectComponent) blockSelectComponent: BlockSelectComponent;
  
  @Output() onAdd = new EventEmitter<ReportTerritoryBlockItem>();

  reportTerritoryBlockItemFormGroup: FormGroup;
  
  territory: Territory;
  
  constructor(
    private formBuilder: FormBuilder,
    public readonly blockService: BlockService
  ) {
    this.reportTerritoryBlockItemFormGroup = this.formBuilder.group({
      blockId: new FormControl({value: '', disabled: false}, [Validators.required]),
      blockName: new FormControl({value: '', disabled: true}),
      observations: new FormControl('', [Validators.maxLength(250)]),
      completed: new FormControl(false)
    });
  }
  ngAfterViewInit(): void {
    this.blockSelectComponent.getSelected$().subscribe({
      next: (block) => {
        if (!block) {
          this.reportTerritoryBlockItemFormGroup.get('blockName').setValue('');
          this.reportTerritoryBlockItemFormGroup.get('blockId').setValue('');
          return;
        }
        this.reportTerritoryBlockItemFormGroup.get('blockName').setValue(block.name);
        this.reportTerritoryBlockItemFormGroup.get('blockId').setValue(block.id);
      }
    });
  }

  openModal() {
    this.modal.openModal();
    this.blockSelectComponent.setQuery({territoryId: this.territory.id});
    this.blockSelectComponent.loadAllData();
  }
  closeModal() {
    this.modal.closeModal();
  }

  setTerritory(territory: Territory) {
    this.territory = territory;
  }
  onSubmit() {
    if (!this.reportTerritoryBlockItemFormGroup.valid) {
      Swal.fire('Error', 'Formulario inválido', 'error');
    }
    const dto = this.reportTerritoryBlockItemFormGroup.getRawValue();
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
  setBlockIdsToExclude(ids: string[]) {
    this.blockSelectComponent.setIdsToExclude(ids);
  }
  getTotalBlocks() {
    return this.blockSelectComponent.getTotalElements();
  }
}
