import { Component, Input, ViewChild } from '@angular/core';
import { ILabelField } from '../../../interfaces/ILabelFIeld';
import { QueryParamsNoPagination } from '../../../dtos/QueryParamsNoPagination';
import { GetTerritoriesQueryParamsDto } from '../../../dtos/GetTerritoriesQueryParamsDto';
import { DinamicSelectComponent } from '../../shared/dinamic-select/dinamic-select.component';
import { TerritoryService } from '../../../services/TerritoryService';
import { Observable } from 'rxjs';
import { Territory } from '../../../model/Territory';

@Component({
  selector: 'app-territories-select',
  imports: [DinamicSelectComponent],
  templateUrl: './territories-select.component.html',
  styleUrl: './territories-select.component.css'
})
export class TerritoriesSelectComponent {
  @Input() labelField: ILabelField[] | string = [
    {
      type: 'raw',
      value: 'Territorio '
    },
    {
      type: 'property',
      value: 'name'
    }
  ];
  @Input() query: QueryParamsNoPagination<GetTerritoriesQueryParamsDto> = {};

  @ViewChild(DinamicSelectComponent) dinamicSelectComponent: DinamicSelectComponent;

  constructor(
    public readonly territoryService: TerritoryService  
  ) {}
  
  getSelected$(): Observable<Territory> {
    return this.dinamicSelectComponent.getSelectedSubject$();
  }
  setSelected$(block: Territory) {
    this.dinamicSelectComponent.setSelected$(block);
  }
  setQuery(query: QueryParamsNoPagination<GetTerritoriesQueryParamsDto>) {
    this.dinamicSelectComponent.setQuery(query);
  }
  loadAllData() {
    this.dinamicSelectComponent.loadAllData();
  }
  setDisabled(disabled: boolean) {
    this.dinamicSelectComponent.disabled = disabled;
  }
}
