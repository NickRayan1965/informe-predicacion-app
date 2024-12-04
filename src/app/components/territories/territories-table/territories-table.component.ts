import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TerritoryService } from '../../../services/TerritoryService';
import { CommonModule } from '@angular/common';
import { GetTerritoriesQueryParamsDto } from '../../../dtos/GetTerritoriesQueryParamsDto';
import { PageableTableComponent } from "../../shared/pageable-table/pageable-table.component";
import { TableItemConfig } from '../../../model/TableConfig';
import { Territory } from '../../../model/Territory';

@Component({
  selector: 'app-territories-table',
  imports: [CommonModule, PageableTableComponent],
  standalone: true,
  templateUrl: './territories-table.component.html',
  styleUrl: './territories-table.component.css'
})
export class TerritoriesTableComponent implements OnInit {

  @ViewChild(PageableTableComponent) pageableTableComponent: PageableTableComponent;
  @Input() isForSelection: boolean = false;

  @Output() onSelectTerritory = new EventEmitter<Territory>();


  maxSelectablePages = 3;
  queryParams: GetTerritoriesQueryParamsDto;
  tableItemsConfig: TableItemConfig[] = [
    //{ columnLabel: 'Id', columnName: 'id' },
    { columnLabel: 'Territorio', valueReference: 'name' },
    { columnLabel: 'Descripción', valueReference: 'description' },
  ];

  constructor(
    public readonly territoryService: TerritoryService,
  ) {}
  ngOnInit(): void {
    this.queryParams = new GetTerritoriesQueryParamsDto();
    this.queryParams.pageSize = 5;
  }
  getData(): void {
    this.pageableTableComponent.getData();
  }

  selectTerritory(territory: Territory): void {
    if (this.isForSelection) {
      this.onSelectTerritory.emit(territory);
    }
  }

}
