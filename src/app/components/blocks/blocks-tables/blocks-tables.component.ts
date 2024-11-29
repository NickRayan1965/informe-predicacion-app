import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageableTableComponent } from '../../shared/pageable-table/pageable-table.component';
import { GetBlocksQueryParamsDto } from '../../../dtos/GetBlocksQueryParamsDto';
import { TableItemConfig } from '../../../model/TableConfig';
import { BlockService } from '../../../services/BlockService';
import { Block } from '../../../model/Block';
import { ListResponseDto } from '../../../dtos/ListResponseDto';

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
  @Input() isForSelection = false;
  @Output() onBlockSelected = new EventEmitter<Block>();
  
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
  getData(queryParams?: Partial<GetBlocksQueryParamsDto>): void {
    if (queryParams) {
      this.queryParams = { ...this.queryParams, ...queryParams };
    }
    this.pageableTableComponent.getData(this.queryParams);
  }
  onBlockSelectedEvent(block: Block): void {
    if (this.isForSelection) {
      this.onBlockSelected.emit(block);
    }
  }
  setIdsToExclude(ids: number[]): void {
    this.pageableTableComponent.setIdsToExclude(ids);
  }
  getRawResponse(): ListResponseDto<Block> {
    return this.pageableTableComponent.getRawResponse<Block>();
  }

}
