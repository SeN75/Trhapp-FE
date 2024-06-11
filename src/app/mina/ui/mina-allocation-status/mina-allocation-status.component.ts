import { Component, Input, OnInit, inject } from '@angular/core';
import { MaterialModule } from '@/shared/module/material.module';
import { Store } from '@ngrx/store';
import { Availabilty, AvailabiltyState } from '@/shared/types/availabilty.type';
import { selectData } from '@/shared/store/availavilty/availavilty.reducer';
import { Observable, map, tap } from 'rxjs';
import { StateCardComponent } from '@/shared/components/state-card/state-card.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'tp-mina-allocation-status',
  standalone: true,
  imports: [MaterialModule, StateCardComponent, NgIf, AsyncPipe],
  templateUrl: './mina-allocation-status.component.html',
  styleUrl: './mina-allocation-status.component.scss',
})
export class MinaAllocationStatusComponent implements OnInit {
  private store = inject(Store<{ availavilty: AvailabiltyState }>);
  @Input() pack: 'package1' | 'package4' = 'package1';

  data$?: Observable<any>;
  ngOnInit(): void {
    this.data$ = this.store.select(selectData).pipe(
      map((data) => data?.[this.pack]),
      tap((val) => {
        console.log(this.pack, val);
      })
    );
  }
  max(value: number) {
    return Math.min(value, 100);
  }
}
