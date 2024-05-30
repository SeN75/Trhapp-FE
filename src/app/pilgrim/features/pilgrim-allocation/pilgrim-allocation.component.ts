import { Component, Inject, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AllocationState,
  DeleteAllocation,
  SwitchAllocation,
} from '../../utils/types/allocation.type';
import { combineLatest } from 'rxjs';
import { selectPilgrims } from '../../data-access/store/pilgrim.reducer';
import {
  selectErrors,
  selectIsLoading,
  selectStatus,
} from '../../data-access/store/allocation.reducer';
import { PilgrimState } from '../../utils/types/pilgrim.type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, Pilgrim } from '../../../shared/types/base.type';
import { MaterialModule } from '../../../shared/module/material.module';
import { AsyncPipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PilgrimAction } from '../../data-access/store/pilgrim.action';
import { AllocationAction } from '../../data-access/store/allocation.action';

@Component({
  selector: 'app-pilgrim-allocation',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, NgTemplateOutlet, NgIf, NgClass],
  templateUrl: './pilgrim-allocation.component.html',
  styleUrl: './pilgrim-allocation.component.scss',
})
export class PilgrimAllocationComponent implements OnInit {
  private store = inject(Store<{ allocation: AllocationState }>);
  private pilgrimStore = inject(Store<{ pilgrims: PilgrimState }>);
  pilgrims$ = this.pilgrimStore.select(selectPilgrims);
  data$ = combineLatest({
    error: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
    status: this.store.select(selectStatus),
  });

  form = new FormGroup<{
    location_type: FormControl;
    package_name: FormControl;
    national_id?: FormControl;
    national_id1?: FormControl;
    national_id2?: FormControl;
  }>({
    location_type: new FormControl('', [Validators.required]),
    package_name: new FormControl('', [Validators.required]),
  });
  get controls() {
    return this.form.controls;
  }
  constructor(
    public dialogRef: MatDialogRef<PilgrimAllocationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: 'switch' | 'delete';
      pilgrim: Pilgrim;
    }
  ) {}
  ngOnInit(): void {
    if (this.data.pilgrim) {
      this.controls.package_name.patchValue(
        this.data.pilgrim.package_name.trim()
      );
    }
    if (this.data.type === 'switch') {
      this.form.addControl(
        'national_id1',
        new FormControl(
          { value: this.data.pilgrim.national_id, disabled: true },
          [Validators.required]
        )
      );

      this.form.addControl(
        'national_id2',
        new FormControl('', [Validators.required])
      );
    } else if (this.data.type === 'delete') {
      this.form.addControl(
        'national_id',
        new FormControl(
          { value: this.data.pilgrim.national_id, disabled: true },
          [Validators.required]
        )
      );
    }
  }
  action() {
    if (this.data.type === 'delete') {
      const _delete = this.form.getRawValue();
      delete _delete.national_id1;
      delete _delete.national_id2;
      this.store.dispatch(
        AllocationAction.delete({ _delete: _delete as DeleteAllocation })
      );
    } else if (this.data.type === 'switch') {
      const _switch = this.form.getRawValue();
      delete _switch.national_id;
      this.store.dispatch(
        AllocationAction.switch({ _switch: _switch as SwitchAllocation })
      );
    } else {
      this.dialogRef.close(this.form.value);
    }
  }
}
