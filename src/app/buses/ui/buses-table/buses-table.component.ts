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
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { MatDialog } from '@angular/material/dialog';
import { BusesFormComponent } from '@/buses/features/buses-form/buses-form.component';
import { Store } from '@ngrx/store';
import { BusState } from '@/buses/utils/types/buses.type';
import { BusesAction } from '@/buses/data-access/store/buses.action';
import { Bus } from '@/shared/types/base.type';
import { selectBuses } from '@/buses/data-access/store/buses.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tp-buses-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    TpPaginatorDirective,
    MatButton,
    MatRipple,
  ],
  templateUrl: './buses-table.component.html',
  styleUrl: './buses-table.component.scss',
})
export class BusesTableComponent implements AfterViewInit, OnInit {
  private store = inject(Store<{ buses: BusState }>);
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<
    Bus & {
      supervisor_name: string;
      start_location_name: string;
      destination_location_name: string;
    }
  >();
  displayedColumns: string[] = [
    'position',
    'bus_name',
    'bus_code',
    'max_capacity',
    'supervisor_info',
    'start_location_name',
    'destination_location_name',
  ];
  buses$ = this.store.select(selectBuses);
  private dialog = inject(MatDialog);
  constructor() {
    this.buses$.pipe(takeUntilDestroyed()).subscribe((buess) => {
      this.dataSource.data =
        buess?.map((bus, i) => {
          return {
            ...bus,
            postions: i + 1,
            supervisor_name: bus.supervisor?.name,
            start_location_name: bus.start_location?.name,
            destination_location_name: bus.destination_location?.name,
          };
        }) || [];
    });
  }
  ngOnInit(): void {
    // this.dataSource;
  }
  openDialog() {
    this.store.dispatch(BusesAction.reset());
    this.dialog.open(BusesFormComponent, {
      width: '90%',
      height: 'auto',
      maxWidth: '700px',
      maxHeight: '90%',
      panelClass: ['modal-box', 'p-2', 'bg-white'],
      data: {
        type: 'create',
      },
    });
  }
}

const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
];
