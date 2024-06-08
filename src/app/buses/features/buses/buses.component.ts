import { Component, OnInit, inject } from '@angular/core';
import { BusesTableComponent } from '../../ui/buses-table/buses-table.component';
import { CommonModule } from '@angular/common';
import { StateCardComponent } from '@/shared/components/state-card/state-card.component';
import { BusState } from '@/buses/utils/types/buses.type';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '@/buses/data-access/store/buses.reducer';
import { delay, map, startWith, switchMap, tap } from 'rxjs';
import { MaterialModule } from '@/shared/module/material.module';
import { AvailabiltyState } from '@/shared/types/availabilty.type';
import { selectData } from '@/shared/store/availavilty/availavilty.reducer';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [
    CommonModule,
    BusesTableComponent,
    StateCardComponent,
    MaterialModule,
  ],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.scss',
})
export class BusesComponent implements OnInit {
  private store = inject(Store<{ buses: BusState }>);
  private avaStore = inject(Store<{ availavilty: AvailabiltyState }>);
  form = new FormGroup({
    package_name: new FormControl('package1'),
    city: new FormControl('مكة المكرمة'),
  });
  data$ = this.form.valueChanges.pipe(
    startWith({ city: 'مكة المكرمة', package_name: 'package1' }),
    switchMap(({ city, package_name }) =>
      this.avaStore
        .select(selectData)
        .pipe(
          map(
            (data) =>
              data?.[(package_name as 'package1' | 'package4') || 'package1']
                .bus[city || 'مكة المكرمة']
          )
        )
    )
  );

  isLoading$ = this.store.select(selectIsLoading).pipe(delay(1000));

  ngOnInit(): void {
    this.data$.subscribe(console.log);
  }
}
