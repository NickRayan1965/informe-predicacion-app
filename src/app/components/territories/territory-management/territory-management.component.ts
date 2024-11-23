import { Component } from '@angular/core';
import { TerritoryService } from '../../../services/TerritoryService';
import { Territory } from '../../../model/Territory';

@Component({
  selector: 'app-territory-management',
  imports: [],
  templateUrl: './territory-management.component.html',
  styleUrl: './territory-management.component.css'
})
export class TerritoryManagementComponent {
  territories: Territory[];
  constructor(private readonly territoryService: TerritoryService) {}
  ngOnInit() {
    this.getTerritories();
  }
  getTerritories() {
    this.territoryService.getAll().subscribe((territories) => {
      this.territories = territories;
    });
  }
  
}
