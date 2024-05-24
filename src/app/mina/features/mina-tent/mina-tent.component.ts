import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MinaCreatePlaceComponent } from '../mina-create-place/mina-create-place.component';
import { MinaTentTableComponent } from '../../ui/mina-tent-table/mina-tent-table.component';
import { Store } from '@ngrx/store';
import { LoungeMinaState } from '../../utils/types/lounges-mina.type';
import { LoungeMinaAction } from '../../data-access/store/lounge-mina.action';
import { SuiteState } from '../../utils/types/suites.type';
import { SuitesAction } from '../../data-access/store/suites.action';
import { RouterLink } from '@angular/router';
import { MinaState } from '../../utils/types/mina.type';
import { MinaAction } from '../../data-access/store/mina.action';

@Component({
  selector: 'app-mina-tent',
  standalone: true,
  imports: [MinaTentTableComponent, RouterLink],
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
