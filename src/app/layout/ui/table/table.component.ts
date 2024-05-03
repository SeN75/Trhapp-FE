import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'tp-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() dataSource!:MatTableDataSource<any>;
  @Input() coulmus!:string[];
  @Input() data:TableDataField [] =[];
  @Input() tabelActions: TableAcion[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }
  ngAfterViewInit(): void {
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;

   console.log('data ==>' , this.dataSource.data)
  }
}


export interface TableDataField  {
  label: string;
  title: string;
  value: string;
  type: 'text' | 'actions' | 'pic' | 'array'
}
export interface TableAcion {
  label: string;
  icon: string;
  action: (element: any) => unknown;
}
