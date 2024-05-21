import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StateCardComponent } from '../../../shared/components/state-card/state-card.component';
import { ArafahTableComponent } from '../../ui/arafah-table/arafah-table.component';

@Component({
  selector: 'app-arafah',
  standalone: true,
  imports: [CommonModule, StateCardComponent, ArafahTableComponent],
  templateUrl: './arafah.component.html',
  styleUrl: './arafah.component.scss',
})
export class ArafahComponent {}
