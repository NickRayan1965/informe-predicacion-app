import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TerritoryService } from '../../../services/TerritoryService';
import { Territory } from '../../../model/Territory';
import { TerritoriesTableComponent } from '../territories-table/territories-table.component';
import { TerritoryFormComponent } from "../territory-form/territory-form.component";

@Component({
  selector: 'app-territory-management',
  imports: [TerritoriesTableComponent, TerritoryFormComponent],
  standalone: true,
  templateUrl: './territory-management.component.html',
  styleUrl: './territory-management.component.css'
})
export class TerritoryManagementComponent implements AfterViewInit {

  @ViewChild(TerritoryFormComponent) territoryFormComponent: TerritoryFormComponent;
  @ViewChild(TerritoriesTableComponent) territoriesTableComponent: TerritoriesTableComponent;
  @Output() onSelectTerritory = new EventEmitter<Territory>();
  @Input() isForSelection: boolean = false;

  constructor(private readonly territoryService: TerritoryService) {}

  openTerritoryForm() {
    this.territoryFormComponent.openModal();
  }

  
  ngAfterViewInit(): void {
    this.territoriesTableComponent.getData();
  }

  saveTerritoryEvent() {
    console.log('Territory saved');
    this.territoriesTableComponent.getData();
  }

  getData(): void {
    this.territoriesTableComponent.getData();
  }

  selectTerritory(territory: Territory): void {
    if (this.isForSelection) {
      this.onSelectTerritory.emit(territory);
    }
  }

}
