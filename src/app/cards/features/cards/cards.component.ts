import { Component } from '@angular/core';
import { StateCardComponent } from '@/shared/components/state-card/state-card.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [StateCardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {}
