import { Component, OnInit, inject } from '@angular/core';
import { StateCardComponent } from '@/shared/components/state-card/state-card.component';

import { PilgrimsDataTableComponent } from '../../ui/pilgrims-data-table/pilgrims-data-table.component';
import { Store } from '@ngrx/store';
import { AvailabiltyState } from '@/shared/types/availabilty.type';
import { PilgrimState } from '@/pilgrim/utils/types/pilgrim.type';
import { PilgrimAction } from '@/pilgrim/data-access/store/pilgrim.action';
@Component({
  selector: 'app-pilgrim-data',
  standalone: true,
  imports: [StateCardComponent, PilgrimsDataTableComponent],
  templateUrl: './pilgrim-data.component.html',
  styleUrl: './pilgrim-data.component.scss',
})
export class PilgrimDataComponent implements OnInit {
  private storeAva = inject(Store<{ availability: AvailabiltyState }>);
  private store = inject(Store<{ pligrms: PilgrimState }>);
  ngOnInit(): void {
    this.store.dispatch(PilgrimAction.get());
  }
}
