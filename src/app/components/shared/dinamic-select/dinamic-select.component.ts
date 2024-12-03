import { Component, Input, OnInit } from '@angular/core';
import { ILoadAllData } from '../../../services/interfaces/ILoadAllData';
import { QueryParamsNoPagination } from '../../../dtos/QueryParamsNoPagination';
import { FormsModule } from '@angular/forms';
import { ILabelField } from '../../../interfaces/ILabelFIeld';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dinamic-select',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './dinamic-select.component.html',
  styleUrl: './dinamic-select.component.css'
})
export class DinamicSelectComponent implements OnInit {

  ngOnInit(): void {
  }
  // selected =  new BehaviorSubject<any>(null);
  private selected = new BehaviorSubject<any>(null);
  
  data: any[] = [];
  totalPages: number;
  totalElements: number;
  selectedValue = '';
  query: QueryParamsNoPagination<any> = {};
  isAllDataLoaded = true;
  private idsToExclude: string[] = [];

  @Input() defaultLabel = 'Seleccionar';
  @Input() defaultValue = '';
  @Input({required: true}) valueField: string;
  @Input({required: true}) labelField: string | ILabelField[];
  @Input({required: true}) service: ILoadAllData<any>;
  
  disabled = false;
  


  setQuery(query: QueryParamsNoPagination<any>) {
    this.query = query;
  }
  loadAllData() {
    if (this.idsToExclude.includes(this.selectedValue)) {
      this.selectedValue = '';
    }
    this.selected.next(null);
    this.selectedValue = '';
    this.isAllDataLoaded = false;
    this.data = [];
    this.service.loadAllData$<any>({query: this.query, pageSize: 100}).subscribe({
      next: (response) => {
        this.data.push(...response.data);
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      },
      error: () => {
        this.data = [];
        this.isAllDataLoaded = true;
      },
      complete: () => {
        this.isAllDataLoaded = true
      }
    });
  }
  getLabel(item: any) {
    if (!Array.isArray(this.labelField)) {
      return item[this.labelField]?.toString();
    }
    return this.getLabelField(item, this.labelField);
  }

  private getLabelField(item: any, fields: ILabelField[]) {
    let label = '';
    for (const field of fields) {
      if (field.type === 'property') {
        label += item[field.value]?.toString();
      } else {
        label += field.value;
      }
    }
    return label;
  }
  onChange(event: Event) {
    console.log('change');
    const entity = this.data.find((item) => item[this.valueField].toString() === this.selectedValue.toString());
    console.log({entity});
    
    
    this.selected.next(entity);
  }
  getSelectedSubject$() {
    return this.selected.asObservable();
  }
  setSelected$(value: any) {
    if (!value) {
      this.selectedValue = '';
      this.selected.next(null);
      return;
    }
    const ref = this.data.find((item) => item[this.valueField]?.toString() === value[this.valueField]?.toString());
    this.selectedValue = ref[this.valueField].toString();
    this.selected.next(ref);
  }
  getData() {
    return this.data.filter((item) => !this.idsToExclude.includes(item[this.valueField].toString()));
  }
  setIdsToExclude(ids: string[]) {
    this.idsToExclude = ids;
  }
}
