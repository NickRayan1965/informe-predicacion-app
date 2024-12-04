import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageableTableComponent } from '../../shared/pageable-table/pageable-table.component';
import { User } from '../../../model/User';
import { GetUsersQueryParamsDto } from '../../../dtos/GetUsersQueryParamsDto';
import { TableItemConfig } from '../../../model/TableConfig';
import { UserService } from '../../../services/UserService';

@Component({
  selector: 'app-users-table',
  imports: [PageableTableComponent],
  standalone: true,
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent implements OnInit{
  @ViewChild(PageableTableComponent) pageableTableComponent: PageableTableComponent;

  @Input() isForSelection: boolean = false;

  @Output() onSelectUser = new EventEmitter<User>();

  maxSelectablePages = 3;
  
  queryParams: GetUsersQueryParamsDto;

  tableItemsConfig: TableItemConfig[] = [
    {
      columnLabel: 'Nombre completo',
      valueReference: [
        {value: 'names', type: 'property'},
        {value: 'lastNames', type: 'property'}  
      ]
    }
  ];
  constructor(
    public readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.queryParams = new GetUsersQueryParamsDto();
    this.queryParams.pageSize = 5;
  }
  getData(): void {
    this.pageableTableComponent.getData();
  }
  selectUser(user: User): void {
    if (this.isForSelection) {
      this.onSelectUser.emit(user);
    }
  }
}
