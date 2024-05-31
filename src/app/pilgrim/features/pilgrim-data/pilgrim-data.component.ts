import { Component, inject } from '@angular/core';
import { StateCardComponent } from '@/shared/components/state-card/state-card.component';

import { PilgrimsDataTableComponent } from '../../ui/pilgrims-data-table/pilgrims-data-table.component';
import { Store } from '@ngrx/store';
import { AvailabiltyState } from '@/shared/types/availabilty.type';
@Component({
  selector: 'app-pilgrim-data',
  standalone: true,
  imports: [StateCardComponent, PilgrimsDataTableComponent],
  templateUrl: './pilgrim-data.component.html',
  styleUrl: './pilgrim-data.component.scss',
})
export class PilgrimDataComponent {
  private storeAva = inject(Store<{ availability: AvailabiltyState }>);
}
