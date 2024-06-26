import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MinaCreatePlaceComponent } from '@/mina/features/mina-create-place/mina-create-place.component';
import { MinaTentTableComponent } from '@/mina/ui/mina-tent-table/mina-tent-table.component';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { MinaState } from '@/mina/utils/types/mina.type';
import { MinaAction } from '@/mina/data-access/store/mina.action';
import { selectIsLoading } from '@/mina/data-access/store/mina.reducer';
import { MinaAllocationStatusComponent } from '@/mina/ui/mina-allocation-status/mina-allocation-status.component';
import { MinaPack1StepperComponent } from '@/mina/ui/mina-pack1-stepper/mina-pack1-stepper.component';
import { AvailabiltyState } from '@/shared/types/availabilty.type';
import { selectData } from '@/shared/store/availavilty/availavilty.reducer';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mina-tent',
  standalone: true,
  imports: [
    MinaTentTableComponent,
    RouterLink,
    MinaAllocationStatusComponent,
    MinaPack1StepperComponent,
    CommonModule,
  ],
  templateUrl: './mina-tent.component.html',
  styleUrl: './mina-tent.component.scss',
})
export class MinaTentComponent implements OnInit {
  private dialog = inject(MatDialog);
  private store = inject(Store<{ mina: MinaState }>);
  private avaStore = inject(Store<{ availavilty: AvailabiltyState }>);
  isLoading$ = this.store.select(selectIsLoading);
  avaData$ = this.avaStore
    .select(selectData)
    .pipe(map((data) => data?.package1.mina.males));
  createPlace() {
    this.dialog.open(MinaCreatePlaceComponent, {
      width: '90%',
      height: 'auto',
      maxWidth: '500px',
      maxHeight: '90%',
      panelClass: ['modal-box', 'p-2', 'bg-white'],
      data: {
        type: 'create',
      },
    });
  }

  allocate() {
    this.store.dispatch(MinaAction.allocate({ pack: 'package1' }));
  }

  ngOnInit(): void {}
}
