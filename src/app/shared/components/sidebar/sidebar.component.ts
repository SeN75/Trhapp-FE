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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
type Item = { text: string; icon: string; link: string[] };
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [LogoComponent, MatIcon, RouterModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('containerAnimation', [
      state('open', style({ 'grid-template-columns': '200px 1fr' })),
      state('closed', style({ 'grid-template-columns': '40px 1fr' })),
      transition(
        'open <=> closed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SidebarComponent {
  private dialog = inject(MatDialog);
  private store = inject(Store<{ uploadOps: UploadOpsState }>);
  private status$ = this.store.select(selectStatus);
  open = true;
  items: Item[] = [
    {
      text: 'صفحة الحجاج',
      icon: 'tp-card',
      link: ['/', 'l', 'pilgrims'],
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
      text: 'تسكين عرفة باقة 1',
      icon: 'tp-camping',
      link: ['/', 'l', 'arafah', 'package1'],
    },
    {
      text: 'تسكين عرفة باقة 4',
      icon: 'tp-camping',
      link: ['/', 'l', 'arafah', 'package4'],
    },
    {
      text: 'توزيعات باقة 1',
      icon: 'tp-camping',
      link: ['/', 'l', 'distribute', 'package1'],
    },
    {
      text: 'توزيعات باقة 4',
      icon: 'tp-camping',
      link: ['/', 'l', 'distribute', 'package4'],
    },
    {
      text: 'تسكين الباصات',
      icon: 'tp-bus',
      link: ['/', 'l', 'buses'],
    },

    {
      text: 'بطائق الحجاج',
      icon: 'tp-card',
      link: ['/', 'l', 'cards'],
    },
  ];
}
