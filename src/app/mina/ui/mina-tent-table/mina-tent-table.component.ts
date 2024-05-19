import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TpPaginatorDirective } from '../../../shared/directive/tp-paginator.directive';
import { MaterialModule } from '../../../shared/module/material.module';
import { RouterLink } from '@angular/router';

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
export class MinaTentTableComponent implements AfterViewInit {
  items = DATA;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource([]);
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
