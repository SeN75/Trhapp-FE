import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bus, DialogData } from '../../../shared/types/base.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusState, CreateBus, UpdateBus } from '../../utils/types/buses.type';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import {
  selectErrors,
  selectIsLoading,
  selectStatus,
} from '../../data-access/store/buses.reducer';
import { BusesAction } from '../../data-access/store/buses.action';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/module/material.module';

@Component({
  selector: 'app-buses-form',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './buses-form.component.html',
  styleUrl: './buses-form.component.scss',
})
export class BusesFormComponent implements OnInit {
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
      city: new FormControl(),
    });

  supervisorForm = () =>
    new FormGroup({
      name: new FormControl<string>('', [Validators.maxLength(100)]),
      phone_number: new FormControl<string>('', [Validators.maxLength(100)]),
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
  get controls() {
    return this.form.controls;
  }
  addStartLocation = false;
  addDestinationLocation = false;
  addSupervisor = false;
  constructor(
    public dialogRef: MatDialogRef<BusesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<Bus>
  ) {}
  ngOnInit(): void {
    if (this.data.type === 'update') {
      this.form.patchValue(this.data.data);
    }
  }

  action() {
    console.log(this.form.getRawValue());
    if (this.data.type === 'create') {
      const bus = this.form.getRawValue() as unknown as CreateBus;
      this.store.dispatch(BusesAction.create({ bus }));
    } else {
      const updateBus = this.form.getRawValue() as UpdateBus;
      this.store.dispatch(BusesAction.update({ updateBus }));
    }
    this.data$.pipe(map((res) => res.status)).subscribe((res) => {
      if (res === 'success') {
        this.dialogRef.close();
      }
    });
  }
}
