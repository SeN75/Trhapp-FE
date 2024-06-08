import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
import {
  PilgrimDataTable,
  PilgrimState,
} from '@/pilgrim/utils/types/pilgrim.type';
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
import { GeneratePdfService } from '@/shared/service/generate-pdf.service';
import { first, map, switchMap, tap } from 'rxjs';
import { UploadOperationsComponent } from '@/shared/components/upload-operations/upload-operations.component';
import { UploadOperationActions } from '@/shared/store/upload-operation/upload-operation.action';
import { selectStatus } from '@/shared/store/upload-operation/upload-operation.reducer';
import { selectIsLoading } from '@/pilgrim/data-access/store/pilgrim.reducer';
@Component({
  selector: 'tp-pilgrims-data-table',
  standalone: true,
  imports: [NgClass, MaterialModule, AsyncPipe, TpPaginatorDirective],
  templateUrl: './pilgrims-data-table.component.html',
  styleUrl: './pilgrims-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PilgrimsDataTableComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private gPdf = inject(GeneratePdfService);
  private dialog = inject(MatDialog);
  private store = inject(Store<{ pilgrims: PilgrimState }>);
  private citiesStore = inject(Store<{ cities: CityState }>);
  private alloctionStore = inject(Store<{ allocation: AllocationState }>);
  private status$ = this.store.select(selectStatus);
  private readonly BATCH_SIZE = 100;

  isLoading$ = this.store
    .select(selectIsLoading)
    .pipe(tap((v) => (this.loaded = v || false)));
  cities$ = this.citiesStore.select(selectCities);
  pilgrims$ = this.store.select(selectPilgrims);
  loaded = false;
  dataSource = new MatTableDataSource<PilgrimDataTable>([]);
  batchesData: PilgrimDataTable[][] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'package_name',
    'phone_number',
    'national_id',
    'city',
    'nationality',
    'booking_reference',
    'mina',
    'arafah',
    'actions',
  ];

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

  // dataSource!: MatTableDataSource<any>;

  filter(value: string, key: string) {
    if (value.length > 4 || value.length === 0) {
      this.dataSource.filterPredicate = (data, filter) => {
        return ((data as unknown as Record<string, string>)[key] + '')
          .toLowerCase()
          .includes(filter + '');
      };
      this.dataSource.filter = (value + '').trim().toLowerCase();
      this.searchActive[key] = !!value;
    }
  }
  constructor() {
    this.pilgrims$
      .pipe(
        takeUntilDestroyed(),
        map((data) =>
          data?.map((v) => {
            const d: PilgrimDataTable = {
              id: v?.id || '',
              name: v?.name || '',
              package_name: v?.package_name || '',
              phone_number: v?.phone_number || '',
              national_id: v?.national_id || '',
              city: v?.city || '',
              nationality: v?.nationality || '',
              booking_reference: v?.booking_reference || '',
              arafah:
                v?.arafah_accommodation !== null ||
                v?.arafah_tent_accommodation !== null,
              mian:
                v?.mina_building_accommodation !== null ||
                v?.mina_tent_accommodation !== null,
              is_male: v?.is_male || false,
            };
            return d;
          })
        )
      )
      .subscribe((data) => {
        if (data) {
          this.dataSource.data = data;
        }
      });
    Object.keys(this.filterCtrl.controls).forEach((key) => {
      (this.filterCtrl.controls as any)[key].valueChanges
        .pipe(takeUntilDestroyed())
        .subscribe((v: string) => this.filter(v || '', key));
    });
  }
  ngOnDestroy(): void {
    this.dataSource.data = [];
    console.log(this.dataSource.data);
  }
  setPage(pageIndex: number) {
    this.dataSource.data = this.batchesData[pageIndex] || [];
  }
  private divideListIntoBatches<T>(list: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < list.length; i += batchSize) {
      batches.push(list.slice(i, i + batchSize));
    }
    return batches;
  }
  ngOnInit(): void {}
  exportData() {
    const cols = [
      'name',
      'booking_reference',
      'phone_number',
      'national_id',
      'nationality',
      'package_name',
      'permit_status',
    ];
    const row = this.dataSource.data as unknown as { [k: string]: string }[];

    const data = row.map((v) => {
      return cols
        .map((k) => {
          return { [k]: v[k] };
        })
        .reduce((a, b) => ({ ...a, ...b }), {});
    });
    this.gPdf.generatePdf({
      file_name: 'pilgrims-' + new Date().getTime(),
      data,
    });
  }
  openAllocation(pilgrim: Pilgrim, type: 'switch' | 'delete' | 'manual') {
    this.alloctionStore.dispatch(AllocationAction.reset());
    this.dialog.open(PilgrimAllocationComponent, {
      width: '90%',
      height: 'auto',
      maxWidth: type !== 'manual' ? '500px' : '900px',
      maxHeight: '90%',
      panelClass: ['modal-box', 'p-2', 'bg-white'],
      data: {
        type,
        pilgrim,
      },
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('data ==>', this.dataSource.paginator);
    console.log('paginator ==>', this.paginator);
  }
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
