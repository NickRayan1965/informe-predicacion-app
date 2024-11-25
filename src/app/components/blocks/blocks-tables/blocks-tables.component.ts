import { Component, OnInit, ViewChild } from '@angular/core';
import { PageableTableComponent } from '../../shared/pageable-table/pageable-table.component';
import { GetBlocksQueryParamsDto } from '../../../model/dtos/GetBlocksQueryParamsDto';
import { TableItemConfig } from '../../../model/TableConfig';
import { BlockService } from '../../../services/BlockService';

@Component({
  selector: 'app-blocks-tables',
  imports: [PageableTableComponent],
  standalone: true,
  templateUrl: './blocks-tables.component.html',
  styleUrl: './blocks-tables.component.css'
})
export class BlocksTablesComponent implements OnInit {
  @ViewChild(PageableTableComponent) pageableTableComponent: PageableTableComponent;
  maxSelectablePages = 3;
  queryParams: GetBlocksQueryParamsDto;
  tableItemsConfig: TableItemConfig[] = [
    { columnLabel: 'Id', columnName: 'id' },
    { columnLabel: 'Nombre', columnName: 'name' },
    { columnLabel: 'Descripción', columnName: 'description' },
    { columnLabel: 'Territorio', columnName: 'territoryName' }
  ];
  constructor(
    public readonly blockService: BlockService,
  ) {}
  ngOnInit(): void {
    this.queryParams = new GetBlocksQueryParamsDto();
    this.queryParams.pageSize = 5;
  }
  getData(): void {
    this.pageableTableComponent.getData();
  }

}
