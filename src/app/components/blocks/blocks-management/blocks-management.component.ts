import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BlocksTablesComponent } from "../blocks-tables/blocks-tables.component";
import { BlockService } from '../../../services/BlockService';
import { ModalComponent } from "../../shared/modal/modal.component";
import { TerritoryManagementComponent } from "../../territories/territory-management/territory-management.component";
import { Territory } from '../../../model/Territory';
import { FormsModule } from '@angular/forms';
import { BlockFormComponent } from '../block-form/block-form.component';
import { Block } from '../../../model/Block';
import { GetBlocksQueryParamsDto } from '../../../dtos/GetBlocksQueryParamsDto';
import { ListResponseDto } from '../../../dtos/ListResponseDto';

@Component({
  selector: 'app-blocks-management',
  imports: [BlocksTablesComponent, ModalComponent, TerritoryManagementComponent, FormsModule, BlockFormComponent],
  standalone: true,
  templateUrl: './blocks-management.component.html',
  styleUrl: './blocks-management.component.css'
})
export class BlocksManagementComponent implements OnInit, AfterViewInit {


  @ViewChild(BlocksTablesComponent) blocksTablesComponent: BlocksTablesComponent;

  @ViewChild('blockForm') blockFormComponent: ModalComponent;

  @ViewChild('territoriesModalComponent') territoriesModalComponent: ModalComponent;

  @Input() isForSelection = false;
  
  @Input() disabledTerritorySelector = false;

  @Output() onBlockSelected = new EventEmitter<Block>();

  
  territoryId: number;
  territoryName: string;

  selectTerritoryModalId = 'selectTerritoryModal';
  blockFormModalId = 'blockFormModal';

  constructor(
    private readonly blockService: BlockService
  ) {}

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {}

  setTerritory(territory: Territory): void {
    this.territoryId = territory.id;
    this.territoryName = territory.name;
  }
  
  getData(queryParams?: Partial<GetBlocksQueryParamsDto>): void {
    this.blocksTablesComponent.getData(queryParams);
  }

  saveBlockEvent() {
    this.blocksTablesComponent.getData();
  }
  onSelectTerritory(territory: Territory): void {
    this.territoryId = territory.id;
    this.territoryName = territory.name;
    this.blocksTablesComponent.queryParams.territoryId = this.territoryId;
    this.territoriesModalComponent.closeModal();
    this.getData();
  }
  openTerritoryManagement() {
    this.territoriesModalComponent.openModal();
  }
  closeTerritoryManagement() {
    this.territoriesModalComponent.closeModal();
  }
  openBlockForm() {
    this.blockFormComponent.openModal();
  }
  
  onSaveBlock() {
    this.getData();
  }
  onSelectBlock(block: Block) {
    this.onBlockSelected.emit(block);
  }

  setIdsToExclude(ids: number[]): void {
    this.blocksTablesComponent.setIdsToExclude(ids);
  }
  getRawResponse(): ListResponseDto<Block> {
    return this.blocksTablesComponent.getRawResponse();
  }

}
