import { Component, inject } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MaterialModule } from '../../module/material.module';
import { MatDialog } from '@angular/material/dialog';
import { UploadOperationsComponent } from '../upload-operations/upload-operations.component';
import { Store } from '@ngrx/store';
import { UploadOpsState } from '../../types/upload-operations.type';
import { selectStatus } from '../../store/upload-operation/upload-operation.reducer';
import { first, switchMap, tap } from 'rxjs';
import { UploadOperationActions } from '../../store/upload-operation/upload-operation.action';
type Item = { text: string; icon: string; link: string[] };
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [LogoComponent, MatIcon, RouterModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private dialog = inject(MatDialog);
  private store = inject(Store<{ uploadOps: UploadOpsState }>);
  private status$ = this.store.select(selectStatus);
  items: Item[] = [
    {
      text: 'تسكين الباصات',
      icon: 'tp-bus',
      link: ['/', 'l', 'buses'],
    },
    {
      text: 'تسكين منى باقة 1',
      icon: 'tp-bed',
      link: ['/', 'l', 'mina', 'pack1'],
    },
    {
      text: 'تسكين منى باقة 4',
      icon: 'tp-bed',
      link: ['/', 'l', 'mina', 'pack4'],
    },
    {
      text: 'تسكين عرفة',
      icon: 'tp-camping',
      link: ['/', 'l', 'arafah'],
    },
    {
      text: 'الاجنحة',
      icon: 'tp-door-side',
      link: ['/', 'l', 'suites'],
    },
    {
      text: 'بطاقة الحاج',
      icon: 'tp-card',
      link: ['/', 'l', 'cards'],
    },
    {
      text: 'معلومات الحاج',
      icon: 'tp-card',
      link: ['/', 'l', 'pilgrims'],
    },
  ];

  uploadFile() {
    this.dialog
      .open(UploadOperationsComponent, {
        width: '500px',
        panelClass: ['modal-box', 'p-2', 'bg-white'],
        data: null,
      })
      .afterClosed()
      .pipe(
        switchMap(() => this.status$),
        tap((status) => {
          if (status === 'success')
            this.store.dispatch(UploadOperationActions.reset());
        }),
        first()
      )
      .subscribe();
  }
}
