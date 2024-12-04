import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../shared/modal/modal.component";
import { ReportTerritoryBlockItemFormComponent } from "../report-territory-block-item-form/report-territory-block-item-form.component";
import { CommonModule } from '@angular/common';
import { ReportTerritoryBlockItem } from '../../../model/ReportTerritoryBlockItem';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Territory } from '../../../model/Territory';
import { ReportTerritoryItem } from '../../../model/ReportTerritoryItem';
import { TerritoriesSelectComponent } from "../../territories/territories-select/territories-select.component";
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-report-territory-item-form',
  imports: [ModalComponent, ReportTerritoryBlockItemFormComponent, CommonModule, ReactiveFormsModule, TerritoriesSelectComponent],
  standalone: true,
  templateUrl: './report-territory-item-form.component.html',
  styleUrl: './report-territory-item-form.component.css'
})
export class ReportTerritoryItemFormComponent implements AfterViewInit {

  
  @ViewChild('main') modal: ModalComponent;

  @ViewChild(TerritoriesSelectComponent) territoriesSelectComponent: TerritoriesSelectComponent;
  @ViewChild('reportTerritoryBlockItemForm') reportTerritoryBlockItemForm: ReportTerritoryBlockItemFormComponent;

  @Output() onAdd = new EventEmitter<ReportTerritoryItem>();

  territory: Territory;

  reportTerritoryItemFormGroup: FormGroup;

  reportTerritoryBlockItems: ReportTerritoryBlockItem[] = [];

  private disabledAddBlockSubject = new BehaviorSubject<boolean>(true);
  disabledAddBlock$: Observable<boolean> = this.disabledAddBlockSubject.asObservable();

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
    this.reportTerritoryItemFormGroup = this.formBuilder.group({
      territoryId: new FormControl('', [Validators.required]),
      territoryName: new FormControl('', [Validators.required]),
      observations: new FormControl('', [Validators.maxLength(250)]),
    });
  }
  ngAfterViewInit(): void {
    this.territoriesSelectComponent.getSelected$().subscribe({
      next: (territory) => {
        if (!territory) {
          Promise.resolve().then(() => {
            this.disabledAddBlockSubject.next(true);
            this.reportTerritoryItemFormGroup.get('territoryId').setValue('');
            this.reportTerritoryItemFormGroup.get('territoryName').setValue('');
            this.territory = null;
          });
        }
        Promise.resolve().then(() => {
          // if (this.reportTerritoryBlockItems.length) {

          if (!territory) {
            this.disabledAddBlockSubject.next(true);
            return;
          }
          this.reportTerritoryItemFormGroup.get('territoryId').setValue(territory.id);
          this.reportTerritoryItemFormGroup.get('territoryName').setValue(territory.name);
          this.territory = territory;
          this.disabledAddBlockSubject.next(false);
        });
      }
    });
  }

  openModal(): void {
    this.modal.openModal();
    this.territoriesSelectComponent.loadAllData();
  }
  closeModal(): void {
    this.cleanForm();
    this.modal.closeModal();
  }
  openReportTerritoryBlockItemForm(): void {
    const territoryId = this.reportTerritoryItemFormGroup.get('territoryId').value;
    if (territoryId === '') {
      Swal.fire('Advertencia', 'Debe seleccionar un territorio antes de agregar una manzana', 'warning');
      return;
    }
    this.reportTerritoryBlockItemForm.setTerritory(this.territory);
    this.reportTerritoryBlockItemForm.openModal();
  }
  closeReportTerritoryBlockItemForm(): void {
    this.reportTerritoryBlockItemForm.closeModal();
  }
  onAddReportTerritoryBlockItem(reportTerritoryBlockItem: ReportTerritoryBlockItem): void {
    this.reportTerritoryBlockItems.push(reportTerritoryBlockItem);
    this.territoriesSelectComponent.setDisabled(true);
    this.reportTerritoryBlockItemForm.setBlockIdsToExclude(this.reportTerritoryBlockItems.map(item => item.blockId.toString()));
    this.closeReportTerritoryBlockItemForm();
  }
  onRemoveReportTerritoryBlockItem(item_number: number): void {
    console.log({item_number});
    this.reportTerritoryBlockItems.splice(item_number, 1);
    this.reportTerritoryBlockItemForm.setBlockIdsToExclude(this.reportTerritoryBlockItems.map(item => item.blockId.toString()));
  }

  canAddReportTerritoryBlockItem(): boolean {
    const territoryId = this.reportTerritoryItemFormGroup.get('territoryId').value;
    return territoryId !== '';
  }
  onSubmit(): void {
    const data = this.reportTerritoryItemFormGroup.value;
    const numberOfBlocks = this.reportTerritoryBlockItemForm.getTotalBlocks();
    const entity: ReportTerritoryItem = {
      completed: this.reportTerritoryBlockItems.every(item => item.completed) && numberOfBlocks === this.reportTerritoryBlockItems.length,
      observations: data.observations,
      territory: {
        id: data.territoryId,
        name: data.territoryName
      },
      blocks: this.reportTerritoryBlockItems
    };
    console.log({entity});
    this.onAdd.emit(entity);
    this.reportTerritoryBlockItems = [];
    this.reportTerritoryItemFormGroup.reset();
    this.reportTerritoryBlockItemForm.setTerritory(null);
    this.territoriesSelectComponent.setDisabled(false);
    this.territoriesSelectComponent.setSelected$(null);
    this.closeModal();
  }
  setBlockIdsToExclude(ids: string[]): void {
    this.reportTerritoryBlockItemForm.setBlockIdsToExclude(ids);
  }
  cleanForm(): void {
    this.reportTerritoryBlockItems = [];
    this.reportTerritoryItemFormGroup.reset();
    this.reportTerritoryBlockItemForm.setTerritory(null);
    this.territoriesSelectComponent.setDisabled(false);
    this.territoriesSelectComponent.setSelected$(null);
  }
}
