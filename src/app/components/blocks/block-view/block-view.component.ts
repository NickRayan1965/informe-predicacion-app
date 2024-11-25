import { Component } from '@angular/core';
import { ViewComponent } from "../../shared/view/view.component";
import { BlocksManagementComponent } from "../blocks-management/blocks-management.component";

@Component({
  selector: 'app-block-view',
  imports: [ViewComponent, BlocksManagementComponent],
  templateUrl: './block-view.component.html',
  styleUrl: './block-view.component.css'
})
export class BlockViewComponent {

}
