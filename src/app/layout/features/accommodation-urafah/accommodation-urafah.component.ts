import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StateCardComponent } from '../../ui/state-card/state-card.component';
import { AccommodationUrafahTableComponent } from '../../ui/accommodation-urafah-table/accommodation-urafah-table.component';

@Component({
  selector: 'app-accommodation-urafah',
  standalone: true,
  imports: [
    CommonModule,
    StateCardComponent,
    AccommodationUrafahTableComponent,
  ],
  templateUrl: './accommodation-urafah.component.html',
  styleUrl: './accommodation-urafah.component.scss',
})
export class AccommodationUrafahComponent {}
