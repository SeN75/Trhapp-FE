import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bus, DialogData } from '../../../shared/types/base.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusState, CreateBus, UpdateBus } from '../../utils/types/buses.type';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
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
  });
  get controls() {
    return this.form.controls;
  }
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
    if (this.data.type === 'create') {
      const bus = this.form.getRawValue() as CreateBus;
      this.store.dispatch(BusesAction.create({ bus }));
    } else {
      const updateBus = this.form.getRawValue() as UpdateBus;
      this.store.dispatch(BusesAction.update({ updateBus }));
    }
    this.dialogRef.close();
  }
}
