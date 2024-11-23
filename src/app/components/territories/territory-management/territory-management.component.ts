import { Component } from '@angular/core';
import { TerritoryService } from '../../../services/TerritoryService';
import { Territory } from '../../../model/Territory';
import { TerritoriesTableComponent } from '../territories-table/territories-table.component';

@Component({
  selector: 'app-territory-management',
  imports: [TerritoriesTableComponent],
  templateUrl: './territory-management.component.html',
  styleUrl: './territory-management.component.css'
})
export class TerritoryManagementComponent {
  constructor(private readonly territoryService: TerritoryService) {}
  ngOnInit() {
  }

}
