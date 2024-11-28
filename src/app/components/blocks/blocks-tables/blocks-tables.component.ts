import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PageableTableComponent } from '../../shared/pageable-table/pageable-table.component';
import { GetBlocksQueryParamsDto } from '../../../dtos/GetBlocksQueryParamsDto';
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
  @Input() tableClasses: string[] = [];
  maxSelectablePages = 3;
  queryParams: GetBlocksQueryParamsDto;
  tableItemsConfig: TableItemConfig[] = [
    //{ columnLabel: 'Id', columnName: 'id' },
    { columnLabel: 'Nombre', valueReference: 'name' },
    { columnLabel: 'Descripción', valueReference: 'description' },
    { columnLabel: 'Territorio', valueReference: 'territoryName' }
  ];
  constructor(
    public readonly blockService: BlockService,
  ) {}
  ngOnInit(): void {
    this.queryParams = new GetBlocksQueryParamsDto();
  }
  getData(): void {
    this.pageableTableComponent.getData();
  }

}
