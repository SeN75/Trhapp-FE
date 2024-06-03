import { Component, Input } from '@angular/core';

@Component({
  selector: 'tp-distribute-group-card',
  standalone: true,
  imports: [],
  templateUrl: './distribute-group-card.component.html',
  styleUrl: './distribute-group-card.component.scss',
})
export class DistributeGroupCardComponent {
  @Input() id = '';
  @Input() total = 0;
}
