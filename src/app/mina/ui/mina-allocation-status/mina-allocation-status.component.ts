import { Component, Input, inject } from '@angular/core';
import { MaterialModule } from '@/shared/module/material.module';
import { Store } from '@ngrx/store';
import { AvailabiltyState } from '@/shared/types/availabilty.type';
import { selectData } from '@/shared/store/availavilty/availavilty.reducer';
import { map } from 'rxjs';
import { StateCardComponent } from '@/shared/components/state-card/state-card.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'tp-mina-allocation-status',
  standalone: true,
  imports: [MaterialModule, StateCardComponent, NgIf, AsyncPipe],
  templateUrl: './mina-allocation-status.component.html',
  styleUrl: './mina-allocation-status.component.scss',
})
export class MinaAllocationStatusComponent {
  private store = inject(Store<{ availavilty: AvailabiltyState }>);
  @Input() pack: 'package1' | 'package4' = 'package1';

  data$ = this.store.select(selectData).pipe(map((data) => data?.[this.pack]));
}
