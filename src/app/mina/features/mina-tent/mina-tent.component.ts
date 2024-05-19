import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MinaCreatePlaceComponent } from '../mina-create-place/mina-create-place.component';
import { MinaTentTableComponent } from '../../ui/mina-tent-table/mina-tent-table.component';

@Component({
  selector: 'app-mina-tent',
  standalone: true,
  imports: [MinaTentTableComponent],
  templateUrl: './mina-tent.component.html',
  styleUrl: './mina-tent.component.scss',
})
export class MinaTentComponent {
  private dialog = inject(MatDialog);

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
}
