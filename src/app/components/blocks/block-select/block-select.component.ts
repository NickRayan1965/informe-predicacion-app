import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DinamicSelectComponent } from "../../shared/dinamic-select/dinamic-select.component";
import { ILabelField } from '../../../interfaces/ILabelFIeld';
import { BlockService } from '../../../services/BlockService';
import { Observable } from 'rxjs';
import { QueryParamsNoPagination } from '../../../dtos/QueryParamsNoPagination';
import { GetBlocksQueryParamsDto } from '../../../dtos/GetBlocksQueryParamsDto';
import { Block } from '../../../model/Block';

@Component({
  selector: 'app-block-select',
  imports: [DinamicSelectComponent],
  standalone: true,
  templateUrl: './block-select.component.html',
  styleUrl: './block-select.component.css'
})
export class BlockSelectComponent {

  @Input() labelField: ILabelField[] | string = [
    {
      type: 'raw',
      value: 'Manzana '
    },
    {
      type: 'property',
      value: 'name'
    }
  ];
  query: QueryParamsNoPagination<GetBlocksQueryParamsDto> = {};

  @ViewChild(DinamicSelectComponent) dinamicSelectComponent: DinamicSelectComponent;

  constructor(
    public readonly blockService: BlockService
  ) {}
  
  getSelected$(): Observable<Block> {
    return this.dinamicSelectComponent.getSelectedSubject$();
  }
  setSelected$(block: Block) {
    this.dinamicSelectComponent.setSelected$(block);
  }
  setQuery(query: QueryParamsNoPagination<GetBlocksQueryParamsDto>) {
    this.dinamicSelectComponent.setQuery(query);
  }
  loadAllData() {
    this.dinamicSelectComponent.loadAllData();
  }
  setIdsToExclude(ids: string[]) {
    this.dinamicSelectComponent.setIdsToExclude(ids);
  }
  getTotalElements() {
    return this.dinamicSelectComponent.totalElements;
  }
}
