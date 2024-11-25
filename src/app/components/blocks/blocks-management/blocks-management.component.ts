import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BlocksTablesComponent } from "../blocks-tables/blocks-tables.component";
import { BlockService } from '../../../services/BlockService';
import { ModalComponent } from "../../shared/modal/modal.component";
import { TerritoryManagementComponent } from "../../territories/territory-management/territory-management.component";
import { Territory } from '../../../model/Territory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blocks-management',
  imports: [BlocksTablesComponent, ModalComponent, TerritoryManagementComponent, FormsModule],
  standalone: true,
  templateUrl: './blocks-management.component.html',
  styleUrl: './blocks-management.component.css'
})
export class BlocksManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(BlocksTablesComponent) blocksTablesComponent: BlocksTablesComponent;
  @ViewChild(ModalComponent) territoriesModalComponent: ModalComponent;
  
  territoryId: number;
  territoryName: string;
  selectTerritoryModalId = 'selectTerritoryModal';

  constructor(
    private readonly blockService: BlockService
  ) {}
  ngOnInit(): void {

  }
  
  ngAfterViewInit(): void {
    this.blocksTablesComponent.queryParams.territoryId = this.territoryId;
    this.blocksTablesComponent.getData();
  }

  getData(): void {
    this.blocksTablesComponent.getData();
  }


  saveBlockEvent() {
    this.blocksTablesComponent.getData();
  }
  onSelectTerritory(territory: Territory): void {
    this.territoryId = territory.id;
    this.territoryName = territory.name;
    this.blocksTablesComponent.queryParams.territoryId = this.territoryId;
    console.log('Territory selected', territory);
    this.territoriesModalComponent.closeModal();
  }
  openTerritoryManagement() {
    this.territoriesModalComponent.openModal();
  }
}
