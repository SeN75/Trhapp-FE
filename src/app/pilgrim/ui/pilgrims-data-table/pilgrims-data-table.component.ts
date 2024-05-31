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
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { Pilgrim } from '@/shared/types/base.type';
import { Store } from '@ngrx/store';
import { PilgrimState } from '@/pilgrim/utils/types/pilgrim.type';
import { selectPilgrims } from '../../data-access/store/pilgrim.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgClass } from '@angular/common';
import { MaterialModule } from '@/shared/module/material.module';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { CityState } from '../../../citites/utils/types/cities.type';
import { selectCities } from '../../../citites/data-access/store/cities.reducer';
import { MatDialog } from '@angular/material/dialog';
import { PilgrimAllocationComponent } from '../../features/pilgrim-allocation/pilgrim-allocation.component';
import { AllocationState } from '@/pilgrim/utils/types/allocation.type';
import { AllocationAction } from '../../data-access/store/allocation.action';

@Component({
  selector: 'tp-pilgrims-data-table',
  standalone: true,
  imports: [NgClass, MaterialModule, AsyncPipe],
  templateUrl: './pilgrims-data-table.component.html',
  styleUrl: './pilgrims-data-table.component.scss',
})
export class PilgrimsDataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private dialog = inject(MatDialog);
  private store = inject(Store<{ pilgrims: PilgrimState }>);
  private citiesStore = inject(Store<{ cities: CityState }>);
  private alloctionStore = inject(Store<{ allocation: AllocationState }>);
  cities$ = this.citiesStore.select(selectCities);
  pilgrims$ = this.store.select(selectPilgrims);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'id',
    'name',
    'package_name',
    'phone_number',
    'national_id',
    'city',
    'nationality',
    'booking_reference',
    'actions',
  ];
  dataSource = new MatTableDataSource<Pilgrim>([]);
  searchActive: { [k: string]: boolean } = this.displayedColumns
    .map((k) => ({ [k]: false }))
    .reduce((a, b) => ({ ...a, ...b }), {});

  filterCtrl = new FormGroup({
    name: new FormControl(''),
    phone_number: new FormControl(''),
    package_name: new FormControl(''),
    city: new FormControl(''),
    nationality: new FormControl(''),
    national_id: new FormControl(''),
    booking_reference: new FormControl(''),
  });
  filter(value: string, key: string) {
    this.dataSource.filterPredicate = (data, filter) => {
      return ((data as unknown as Record<string, string>)[key] + '')
        .toLowerCase()
        .includes(filter + '');
    };
    this.dataSource.filter = (value + '').trim().toLowerCase();
    this.searchActive[key] = !!value;
  }
  constructor() {
    this.pilgrims$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => (this.dataSource.data = data || []));
  }
  ngOnInit(): void {
    Object.keys(this.filterCtrl.controls).forEach((key) => {
      (this.filterCtrl.controls as any)[key].valueChanges.subscribe(
        (v: string) => this.filter(v || '', key)
      );
    });
  }
  openAllocation(pilgrim: Pilgrim, type: 'switch' | 'delete' | 'manul') {
    this.alloctionStore.dispatch(AllocationAction.reset());
    this.dialog.open(PilgrimAllocationComponent, {
      width: '90%',
      height: 'auto',
      maxWidth: '500px',
      maxHeight: '90%',
      panelClass: ['modal-box', 'p-2', 'bg-white'],
      data: {
        type,
        pilgrim,
      },
    });
  }
}
