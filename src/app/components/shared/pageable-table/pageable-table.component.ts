import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHttpService } from '../../../services/IHttpService';
import { PaginationDto } from '../../../dtos/PaginationDto';
import { CommonModule } from '@angular/common';
import { ListResponseDto } from '../../../dtos/ListResponseDto';
import { IColumnName, TableItemConfig } from '../../../model/TableConfig';
import { Territory } from '../../../model/Territory';
import { map, OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-pageable-table',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pageable-table.component.html',
  styleUrl: './pageable-table.component.css'
})
export class PageableTableComponent implements OnInit {

  @Input({required:true}) httpService: IHttpService<any>;
  @Input() maxSelectablePages: number = 3;
  @Input({required: true}) queryParams: PaginationDto;
  @Input({required: true}) tableItemsConfig: TableItemConfig[];
  
  @Input() isForSelection: boolean = false;
  
  @Input() tableClasses: string[] = [];
  @Input() idsToExclude: number[] = [];
  @Input() idColumnName: string = 'id';

  @Output() onSelectItem = new EventEmitter<any>();

  content: ListResponseDto<any>;

  selectItem(item: Territory): void {
    if (this.isForSelection) {
      this.onSelectItem.emit(item);
    }
  }

  ngOnInit(): void {
    //this.getData();
  }

  getData(queryParams?: PaginationDto, transformer?: OperatorFunction<any, any>): void {
    if (queryParams) this.queryParams = queryParams;
    let observable =  this.httpService.getAllPaginated(this.queryParams);
    if (transformer) {
      observable = observable.pipe(transformer);
    }
    observable.subscribe((response) => {
      this.content = response;
    });
  }
  getRawResponse<T>(): ListResponseDto<T> {
    return this.content;
  }
  changePage(page: number): void {
    this.queryParams.page = page;
    this.getData();
  }
  rangeForPages(): number[] {
    if (!this.content) {
      return [];
    }
    let initial = this.getSection();
    initial = initial * this.maxSelectablePages - this.maxSelectablePages + 1;
    const final = initial + this.maxSelectablePages;
    const pages = [];
    for (let i = initial; i < final; i++) {
      if(i > this.content.totalPages) break;
      pages.push(i);
    }
    return pages;
  }
  getSection(): number {
    return Math.ceil(this.queryParams.page / this.maxSelectablePages);
  }
  canNextSection(): boolean {
    return this.getSection() < Math.ceil(this.content.totalPages / this.maxSelectablePages);
  }
  nextSection(): void {
    let page = this.content.page + this.maxSelectablePages;
    if (page > this.content.totalPages) {
      page = this.content.totalPages;
    }
    this.queryParams.page = page;
    this.getData();
  }
  previousSection(): void {
    let page = this.content.page - this.maxSelectablePages;
    if (page < 1) {
      page = 1;
    }
    this.queryParams.page = page;
    this.getData();
  }

  getTextForColumnLabel(item: any, columnName: string | IColumnName[]): string {
    if (typeof columnName === 'string') {
      return item[columnName]?.toString() ?? '';
    }
    let text = '';
    columnName.forEach((column, index) => {
      text += item[column.columnName]?.toString() ?? '';
      if (index < columnName.length - 1) {
        text += ' ';
      }
    });
    return text;
  }

  setIdsToExclude(ids: number[]): void {
    this.idsToExclude = ids;
  }

  getDataToDisplay(): any[] {   
    return this.content.data.filter(item => !this.idsToExclude.includes(item[this.idColumnName]));
  }
}
