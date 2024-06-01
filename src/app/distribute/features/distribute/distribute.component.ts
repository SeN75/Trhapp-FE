import { MaterialModule } from '@/shared/module/material.module';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DistributeFormComponent } from '../distribute-form/distribute-form.component';

@Component({
  selector: 'tp-distribute',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './distribute.component.html',
  styleUrl: './distribute.component.scss',
})
export class DistributeComponent {
  private aRouter = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  pack = this.aRouter.snapshot.params['pack'] === 'package1' ? '1' : '4';

  openDialog() {
    this.dialog.open(DistributeFormComponent, {
      width: '500px',
      height: 'auto',
      panelClass: ['modal-box', 'p-2', 'bg-white'],
    });
  }
}
