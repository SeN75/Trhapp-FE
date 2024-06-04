import { MaterialModule } from '@/shared/module/material.module';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DistributeFormComponent } from '../distribute-form/distribute-form.component';
import { switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { DistributeState } from '@/distribute/utils/types/distribute.type';
import {
  selectPack1Read,
  selectPack4Read,
} from '@/distribute/data-access/store/distribution.reducer';
import { DistributeGroupCardComponent } from '@/distribute/ui/distribute-group-card/distribute-group-card.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { DistributionAction } from '@/distribute/data-access/store/distribution.action';

@Component({
  selector: 'tp-distribute',
  standalone: true,
  imports: [MaterialModule, DistributeGroupCardComponent, NgIf, AsyncPipe],
  templateUrl: './distribute.component.html',
  styleUrl: './distribute.component.scss',
})
export class DistributeComponent implements OnInit {
  private store = inject(Store<{ distribute: DistributeState }>);
  ngOnInit(): void {
    this.aRouter.params.subscribe((params) => {
      this.pack = params['pack'] === 'package1' ? 'package1' : 'package4';
      this.store.dispatch(
        DistributionAction.read({
          pack: this.pack as 'package1' | 'package4',
        })
      );
    });
  }
  private aRouter = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  pack = this.aRouter.snapshot.params['pack'] === 'package1' ? '1' : '4';
  list$ = this.aRouter.params.pipe(
    switchMap((params) =>
      params['pack'] === 'package1'
        ? this.store.select(selectPack1Read)
        : this.store.select(selectPack4Read)
    )
  );
  openDialog() {
    this.store.dispatch(DistributionAction.reset());
    this.dialog.open(DistributeFormComponent, {
      width: '800px',
      maxWidth: '100%',
      height: 'auto',
      panelClass: ['modal-box', 'p-2', 'bg-white'],
      data: {
        type: 'create',
        data: {
          package_name: this.aRouter.snapshot.params['pack'],
        },
      },
    });
  }
}
