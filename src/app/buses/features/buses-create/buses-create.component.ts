import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectStatus,
  selectErrors,
  selectIsLoading,
} from '../../data-access/store/buses.reducer';
import { BusState } from '@/buses/utils/types/buses.type';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/shared/module/material.module';

@Component({
  selector: 'app-buses-create',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './buses-create.component.html',
  styleUrl: './buses-create.component.scss',
})
export class BusesCreateComponent {
  private store = inject(Store<{ buses: BusState }>);
  data$ = combineLatest({
    status: this.store.select(selectStatus),
    error: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
  });
  locationForm = () =>
    new FormGroup({
      name: new FormControl<string>('', [Validators.maxLength(100)]),
      lat: new FormControl<number>(0, [Validators.max(922337203685477)]),
      lng: new FormControl<number>(0, [Validators.max(922337203685477)]),
    });

  supervisorForm = () =>
    new FormGroup({
      name: new FormControl<string>('', [Validators.maxLength(100)]),
    });
  form = new FormGroup({
    bus_code: new FormControl<string>('', [Validators.maxLength(100)]),
    bus_plate: new FormControl<string>('', [Validators.maxLength(100)]),
    bus_name: new FormControl<string>('', [Validators.maxLength(100)]),
    max_capacity: new FormControl<number>(0, [
      Validators.max(922337203685477),
      Validators.min(-922337203685477),
      Validators.required,
    ]),
    current_capacity: new FormControl<number>(0, [
      Validators.max(922337203685477),
      Validators.min(-922337203685477),
      Validators.required,
    ]),
    start_location_id: new FormControl<string>(''),
    start_location: this.locationForm(),
    destination_location_id: new FormControl<string>(''),
    destination_location: this.locationForm(),
    supervisor_id: new FormControl(''),
    supervisor: this.supervisorForm(),
  });

  addStartLocation = false;
  addDestinationLocation = false;
  addSupervisor = false;

  get controls() {
    return this.form.controls;
  }

  action() {}
}
