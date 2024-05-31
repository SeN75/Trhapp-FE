import { StateCardComponent } from '@/shared/components/state-card/state-card.component';
import { MaterialModule } from '@/shared/module/material.module';
import { selectData } from '@/shared/store/availavilty/availavilty.reducer';
import { AvailabiltyState } from '@/shared/types/availabilty.type';
import { NgIf, AsyncPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'tp-arafah-allocation-status',
  standalone: true,
  imports: [MaterialModule, StateCardComponent, NgIf, AsyncPipe],
  templateUrl: './arafah-allocation-status.component.html',
  styleUrl: './arafah-allocation-status.component.scss',
})
export class ArafahAllocationStatusComponent {
  private store = inject(Store<{ availavilty: AvailabiltyState }>);
  @Input() pack: 'package1' | 'package4' = 'package1';

  data$ = this.store.select(selectData).pipe(map((data) => data?.[this.pack]));
}
