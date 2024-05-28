import { Component } from '@angular/core';
import { StateCardComponent } from '../../../shared/components/state-card/state-card.component';

import { PilgrimsDataTableComponent } from '../../ui/pilgrims-data-table/pilgrims-data-table.component';
@Component({
  selector: 'app-pilgrim-data',
  standalone: true,
  imports: [StateCardComponent, PilgrimsDataTableComponent],
  templateUrl: './pilgrim-data.component.html',
  styleUrl: './pilgrim-data.component.scss',
})
export class PilgrimDataComponent {}
