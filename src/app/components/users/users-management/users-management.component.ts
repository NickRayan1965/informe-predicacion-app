import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UsersTableComponent } from '../users-table/users-table.component';
import { User } from '../../../model/User';

@Component({
  selector: 'app-users-management',
  imports: [UsersTableComponent],
  standalone: true,
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css'
})
export class UsersManagementComponent implements AfterViewInit {

  @ViewChild(UsersTableComponent) usersTableComponent: UsersTableComponent;

  @Output() onSelectUser = new EventEmitter<User>();

  @Input() isForSelection: boolean = false;

  ngAfterViewInit(): void {
    this.usersTableComponent.getData();
  }

  getData(): void {
    this.usersTableComponent.getData();
  }
  selectUser(user: User): void {
    if (this.isForSelection) {
      this.onSelectUser.emit(user);
    }
  }

}
