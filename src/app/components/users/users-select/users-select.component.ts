import { Component, Input, ViewChild } from '@angular/core';
import { ILabelField } from '../../../interfaces/ILabelFIeld';
import { DinamicSelectComponent } from '../../shared/dinamic-select/dinamic-select.component';
import { UserService } from '../../../services/UserService';
import { Observable } from 'rxjs';
import { User } from '../../../model/User';
import { QueryParamsNoPagination } from '../../../dtos/QueryParamsNoPagination';
import { GetSchedulesQueryParamsDto } from '../../../dtos/GetSchedulesQueryParamsDto';

@Component({
  selector: 'app-users-select',
  imports: [DinamicSelectComponent],
  standalone: true,
  templateUrl: './users-select.component.html',
  styleUrl: './users-select.component.css'
})
export class UsersSelectComponent {
  @Input() labelField: ILabelField[] | string = [
    {
      type: 'property',
      value: 'names'
    },
    {
      type: 'raw',
      value: ' '
    },
    {
      type: 'property',
      value: 'lastNames'
    }
  ];
  @ViewChild(DinamicSelectComponent) dinamicSelectComponent: DinamicSelectComponent;

  constructor(
    public readonly userService: UserService
  ) {}
  getSelected$(): Observable<User> {
    return this.dinamicSelectComponent.getSelectedSubject$();
  }
  setSelected$(user: User) {
    this.dinamicSelectComponent.setSelected$(user);
  }
  setQuery(query: QueryParamsNoPagination<GetSchedulesQueryParamsDto>) {
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
