import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TpPaginatorDirective } from '../../../shared/directive/tp-paginator.directive';
import { Pilgrim } from '../../../shared/types/base.type';
import { Store } from '@ngrx/store';
import { PilgrimState } from '../../utils/types/pilgrim.type';
import { selectPilgrims } from '../../data-access/store/pilgrim.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { MaterialModule } from '../../../shared/module/material.module';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'tp-pilgrims-data-table',
  standalone: true,
  imports: [TpPaginatorDirective, NgClass, MaterialModule],
  templateUrl: './pilgrims-data-table.component.html',
  styleUrl: './pilgrims-data-table.component.scss',
})
export class PilgrimsDataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {}
  private store = inject(Store<{ pilgrims: PilgrimState }>);
  pilgrims$ = this.store.select(selectPilgrims);
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'id',
    'name',
    'phone_number',
    'package_name',
    'package_number',
    'arafah_accommodation',
    'national_id',
  ];
  dataSource = new MatTableDataSource<Pilgrim>([]);

  constructor() {
    this.pilgrims$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => (this.dataSource.data = data || []));
  }
}
