import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ModalComponent } from "../../shared/modal/modal.component";
import { ReportTerritoryBlockItemFormComponent } from "../report-territory-block-item-form/report-territory-block-item-form.component";
import { CreateReportTerritoryItemDto } from '../../../dtos/CreateReportTerritoryItemDto';
import { CommonModule } from '@angular/common';
import { CreateTerritoryBlockItemDto } from '../../../dtos/CreateReportTerritoryBlockItemDto ';
import { ReportTerritoryBlockItem } from '../../../model/ReportTerritoryBlockItem';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TerritoryManagementComponent } from "../../territories/territory-management/territory-management.component";
import { Territory } from '../../../model/Territory';

@Component({
  selector: 'app-report-territory-item-form',
  imports: [ModalComponent, ReportTerritoryBlockItemFormComponent, CommonModule, TerritoryManagementComponent, ReactiveFormsModule],
  standalone: true,
  templateUrl: './report-territory-item-form.component.html',
  styleUrl: './report-territory-item-form.component.css'
})
export class ReportTerritoryItemFormComponent implements AfterViewInit {

  
  @ViewChild('main') modal: ModalComponent;
  
  @ViewChild('territoryManagementModal') territoryManagementModal: ModalComponent;
  @ViewChild(TerritoryManagementComponent) territoryManagementComponent: TerritoryManagementComponent;

  @ViewChild('reportTerritoryBlockItemForm') reportTerritoryBlockItemForm: ReportTerritoryBlockItemFormComponent;

  reportTerritoryItemFormGroup: FormGroup;

  reportTerritoryBlockItems: ReportTerritoryBlockItem[] = [];

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
    this.reportTerritoryItemFormGroup = this.formBuilder.group({
      territoryId: new FormControl({value: '', disabled: true}, [Validators.required]),
      territoryName: new FormControl('', [Validators.required]),
      observations: new FormControl('', [Validators.maxLength(250)]),
      completed: new FormControl(false)
    });
  }
  ngAfterViewInit(): void {
  }

  openModal(): void {
    this.modal.openModal();
  }
  closeModal(): void {
    this.modal.closeModal();
  }
  openReportTerritoryBlockItemForm(): void {
    if (this.reportTerritoryItemFormGroup.get('territoryId').value === '') {
      Swal.fire('Advertencia', 'Debe seleccionar un territorio antes de agregar una manzana', 'warning');
      return;
    }
    this.reportTerritoryBlockItemForm.openModal();
  }
  closeReportTerritoryBlockItemForm(): void {
    this.reportTerritoryBlockItemForm.closeModal();
  }
  onAddReportTerritoryBlockItem(reportTerritoryBlockItem: ReportTerritoryBlockItem): void {
    this.reportTerritoryBlockItems.push(reportTerritoryBlockItem);
    this.closeReportTerritoryBlockItemForm();
  }
  openTerritoryManagementModal(): void {
    this.territoryManagementModal.openModal();
    this.territoryManagementComponent.getData();
  }
  closeTerritoryManagementModal() {
    this.territoryManagementModal.closeModal();
  }
  onSelectTerritory(territory: Territory): void {
    this.reportTerritoryItemFormGroup.get('territoryId').setValue(territory.id);
    this.reportTerritoryItemFormGroup.get('territoryName').setValue(territory.name);
    this.reportTerritoryBlockItemForm.setTerritory(territory);
    this.closeTerritoryManagementModal();
  }
}
