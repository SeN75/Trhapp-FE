import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MinaCreatePlaceComponent } from '../mina-create-place/mina-create-place.component';
import { MinaTentTableComponent } from '../../ui/mina-tent-table/mina-tent-table.component';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { MinaState } from '@/mina/utils/types/mina.type';
import { MinaAction } from '../../data-access/store/mina.action';
import { MinaAllocationStatusComponent } from '../../ui/mina-allocation-status/mina-allocation-status.component';

@Component({
  selector: 'app-mina-tent',
  standalone: true,
  imports: [MinaTentTableComponent, RouterLink, MinaAllocationStatusComponent],
  templateUrl: './mina-tent.component.html',
  styleUrl: './mina-tent.component.scss',
})
export class MinaTentComponent implements OnInit {
  private dialog = inject(MatDialog);
  private store = inject(Store<{ mina: MinaState }>);

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
