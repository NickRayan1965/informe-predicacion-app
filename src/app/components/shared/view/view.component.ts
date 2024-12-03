import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view',
  imports: [],
  standalone: true,
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  @Input() width: string;
  @Input() height: string = '85%';
}
