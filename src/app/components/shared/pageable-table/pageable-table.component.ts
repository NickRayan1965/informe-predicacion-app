import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHttpService } from '../../../services/IHttpService';
import { PaginationDto } from '../../../dtos/PaginationDto';
import { CommonModule } from '@angular/common';
import { ListResponseDto } from '../../../dtos/ListResponseDto';
import { IColumnName, TableItemConfig } from '../../../model/TableConfig';
import { Territory } from '../../../model/Territory';
import { map, OperatorFunction } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pageable-table',
  imports: [CommonModule, FormsModule],
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

  @Input() isForEdit: boolean = false;
  @Output() onEditItem = new EventEmitter<any>();
  
  @Input() tableClasses: string[] = [];
  @Input() idsToExclude: number[] = [];
  @Input() idColumnName: string = 'id';

  @Output() onSelectItem = new EventEmitter<any>();

  @Input() dataTransformer: OperatorFunction<any, any>;

  isLoading = false;
  numberPageForOptimisticUpdate = 1;

  content: ListResponseDto<any>;

  selectItem(item: Territory): void {
    if (this.isForSelection) {
      this.onSelectItem.emit(item);
    }
  }

  ngOnInit(): void {
    //this.getData();
  }

  getData(queryParams?: PaginationDto): void {
    if (queryParams) {
      this.queryParams = queryParams;
      if(this.queryParams.page) {
        this.numberPageForOptimisticUpdate = this.queryParams.page;
      }
    };
    let observable =  this.httpService.getAllPaginated(this.queryParams);
    if (this.dataTransformer) {
      observable = observable.pipe(this.dataTransformer);
    }
    Promise.resolve().then(() => {
      this.isLoading = true;
      observable.subscribe((response) => {
        this.isLoading = false;
        this.content = response;
      });
    });
  }
  getRawResponse<T>(): ListResponseDto<T> {
    return this.content;
  }
  changePage(page: number): void {
    if (this.isLoading) {
      return;
    }
    this.numberPageForOptimisticUpdate = page;
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
    this.numberPageForOptimisticUpdate = page;
    this.queryParams.page = page;
    this.getData();
  }
  previousSection(): void {
    let page = this.content.page - this.maxSelectablePages;
    if (page < 1) {
      page = 1;
    }
    this.numberPageForOptimisticUpdate = page;
    this.queryParams.page = page;
    this.getData();
  }

  getTextForColumnLabel(item: any, columnName: string | IColumnName[]): string {
    if (typeof columnName === 'string') {
      return item[columnName]?.toString() ?? '';
    }
    let text = '';
    columnName.forEach((column, index) => {
      // item[column.columnName]?.toString() ?? '';
      text += column.type === 'property' ? item[column.value]?.toString() : column.value; 
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
  onEdit(item: any): void {
    this.onEditItem.emit(item);
  }
}
