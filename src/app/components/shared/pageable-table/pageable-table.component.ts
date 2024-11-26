import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHttpService } from '../../../services/IHttpService';
import { PaginationDto } from '../../../dtos/PaginationDto';
import { CommonModule } from '@angular/common';
import { ListResponseDto } from '../../../dtos/ListResponseDto';
import { TableItemConfig } from '../../../model/TableConfig';
import { Territory } from '../../../model/Territory';

@Component({
  selector: 'app-pageable-table',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pageable-table.component.html',
  styleUrl: './pageable-table.component.css'
})
export class PageableTableComponent implements OnInit {

  @Input({required:true}) httpService: IHttpService<any>;
  @Input({required: true}) maxSelectablePages: number;
  @Input({required: true}) queryParams: PaginationDto;
  @Input({required: true}) tableItemsConfig: TableItemConfig[];
  @Input() isForSelection: boolean = false;
  @Input() tableClasses: string[] = [];
  @Output() onSelectItem = new EventEmitter<any>();

  content: ListResponseDto<any>;

  selectItem(item: Territory): void {
    console.log({item, isForSelection: this.isForSelection});
    if (this.isForSelection) {
      this.onSelectItem.emit(item);
    }
  }

  ngOnInit(): void {
    //this.getData();
  }

  getData(): void {
    console.log(this.queryParams);
    this.httpService.getAll(this.queryParams).subscribe(data => {
      this.content = data;
    });
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

}
