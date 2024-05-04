import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'tp-state-card',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './state-card.component.html',
  styleUrl: './state-card.component.scss',
})
export class StateCardComponent {
  @Input() text = 'text';
  @Input() icon = 'tp-bed';
  @Input() isActive = false;
}
