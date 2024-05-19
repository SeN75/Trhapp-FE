import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TpPaginatorDirective } from '../../../shared/directive/tp-paginator.directive';
import { MaterialModule } from '../../../shared/module/material.module';

@Component({
  selector: 'tp-mina-suites-table',
  standalone: true,
  imports: [CommonModule, TpPaginatorDirective, MaterialModule],
  templateUrl: './mina-suites-table.component.html',
  styleUrl: './mina-suites-table.component.scss',
})
export class MinaSuitesTableComponent {
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = [
    'position',
    'name',
    'max_capacity',
    'current_capacity',
    'rooms',
    'actions',
  ];
}

const ELEMENT_DATA: any[] = [
  {
    position: 1,
    name: 'جناح 1',
    max_capacity: 100,
    current_capacity: 50,
    rooms: 4,
  },
  {
    position: 2,
    name: 'جناح 2',
    max_capacity: 100,
    current_capacity: 50,
    rooms: 4,
  },
  {
    position: 3,
    name: 'جناح 3',
    max_capacity: 100,
    current_capacity: 50,
    rooms: 4,
  },
];
