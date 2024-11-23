import { Component, OnInit } from '@angular/core';
import { TerritoryService } from '../../../services/TerritoryService';
import { Territory } from '../../../model/Territory';
import { CommonModule } from '@angular/common';
import { ListResponseDto } from '../../../model/dtos/ListResponseDto';
import { GetTerritoriesQueryParamsDto } from '../../../model/dtos/GetTerritoriesQueryParamsDto';

@Component({
  selector: 'app-territories-table',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './territories-table.component.html',
  styleUrl: './territories-table.component.css'
})
export class TerritoriesTableComponent implements OnInit{
  territoriesContent: ListResponseDto<Territory>;
  queryParams: GetTerritoriesQueryParamsDto = new GetTerritoriesQueryParamsDto();
  maxSelectablePages = 3;
  constructor(
    private readonly territoryService: TerritoryService,
  ) {}
  ngOnInit(): void {
    this.queryParams.pageSize = 5;
    this.getTerritories();
  }
  getTerritories(): void {
    this.territoryService.getAll(this.queryParams).subscribe(territories => this.territoriesContent = territories);
  }
  range(count: number): number[] {
    return Array.from({length: count}, (x, i) => i);
  }
  changePage(page: number): void {
    this.queryParams.page = page;
    this.getTerritories();
  }
  rangeForPages(): number[] {
    const initial = Math.ceil(this.queryParams.page / this.maxSelectablePages);
    const final = initial + this.maxSelectablePages;
    const pages = [];
    for (let i = initial; i < final; i++) {
      pages.push(i);
    }
    console.log({pages});
    return pages;
  }
  nextSection(): void {
    let page = this.territoriesContent.page + this.maxSelectablePages;
    if (page > this.territoriesContent.totalPages) {
      page = this.territoriesContent.totalPages;
    }
    this.queryParams.page = page;
    this.getTerritories();
  }

}
