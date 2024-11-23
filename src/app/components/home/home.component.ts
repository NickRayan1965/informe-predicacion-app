import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TerritoryManagementComponent } from '../territories/territory-management/territory-management.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TerritoryManagementComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
