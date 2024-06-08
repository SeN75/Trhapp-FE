import { Component, Inject, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AllocationState,
  DeleteAllocation,
  ManualAllocation,
  SwitchAllocation,
} from '@/pilgrim/utils/types/allocation.type';
import { combineLatest } from 'rxjs';
import { selectPilgrims } from '../../data-access/store/pilgrim.reducer';
import {
  selectErrors,
  selectIsLoading,
  selectStatus,
} from '../../data-access/store/allocation.reducer';
import { PilgrimState } from '@/pilgrim/utils/types/pilgrim.type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, Pilgrim } from '@/shared/types/base.type';
import { MaterialModule } from '@/shared/module/material.module';
import { AsyncPipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllocationAction } from '../../data-access/store/allocation.action';
import { MinaPack1StepperComponent } from '@/mina/ui/mina-pack1-stepper/mina-pack1-stepper.component';
import { MinaPack4StepperComponent } from '@/mina/ui/mina-pack4-stepper/mina-pack4-stepper.component';
import { ArafaPack1StepperComponent } from '@/arafah/ui/arafa-pack1-stepper/arafa-pack1-stepper.component';
import { ArafaPick4StepperComponent } from '@/arafah/ui/arafa-pick4-stepper/arafa-pick4-stepper.component';

@Component({
  selector: 'app-pilgrim-allocation',
  standalone: true,
  imports: [
    MaterialModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NgClass,
    MinaPack1StepperComponent,
    MinaPack4StepperComponent,
    ArafaPack1StepperComponent,
    ArafaPick4StepperComponent,
  ],
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
    bed_id?: FormControl;
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
      type: 'switch' | 'delete' | 'manual';
      pilgrim: Pilgrim;
    }
  ) {}
  ngOnInit(): void {
    if (this.data.pilgrim) {
      this.controls.package_name.patchValue(
        this.data.pilgrim.package_name.trim()
      );
      this.controls.package_name.disable();
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
    } else {
      this.form.addControl(
        'national_id',
        new FormControl(
          { value: this.data.pilgrim.national_id, disabled: true },
          [Validators.required]
        )
      );
      this.form.addControl(
        'bed_id',
        new FormControl(null, [Validators.required])
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
    } else if (this.data.type === 'manual') {
      const _manual = this.form.getRawValue();
      delete _manual.national_id1;
      delete _manual.national_id2;
      console.log(_manual);
      this.store.dispatch(
        AllocationAction.manual({ _manual: _manual as ManualAllocation })
      );
    } else {
      this.dialogRef.close(this.form.value);
    }
  }
}
