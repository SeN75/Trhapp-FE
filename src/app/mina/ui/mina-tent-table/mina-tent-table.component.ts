import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { MaterialModule } from '@/shared/module/material.module';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoungeMinaState } from '@/mina/utils/types/lounges-mina.type';
import { LoungeMina, Suite } from '@/shared/types/base.type';
import { SuiteState, Suites } from '@/mina/utils/types/suites.type';
import { selectSuites } from '../../data-access/store/suites.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tp-mina-tent-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    TpPaginatorDirective,
    MaterialModule,
    MatButton,
    MatRipple,
    RouterLink,
  ],
  templateUrl: './mina-tent-table.component.html',
  styleUrl: './mina-tent-table.component.scss',
})
export class MinaTentTableComponent implements AfterViewInit, OnInit {
  private store = inject(Store<{ suites: SuiteState }>);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Suite>([]);
  obs = this.dataSource.connect();
  suites$ = this.store.select(selectSuites);
  ngOnInit(): void {}

  constructor() {
    this.suites$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.dataSource.data = data || [];
    });
  }
}

const DATA = [
  {
    name: 'سكن 1',
    isFull: true,
    id: '1',
  },
  {
    name: 'سكن 2',
    isFull: false,
    id: 2,
  },
  {
    name: 'سكن 3',
    isFull: false,
    id: 3,
  },
];
