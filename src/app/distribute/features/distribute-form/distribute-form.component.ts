import {
  Distribute,
  DistributeState,
} from '@/distribute/utils/types/distribute.type';
import {
  selectStatus,
  selectErrors,
  selectIsLoading,
} from '@/distribute/data-access/store/distribution.reducer';
import { Component, Inject, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { MaterialModule } from '@/shared/module/material.module';
import { AsyncPipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogData } from '@/shared/types/base.type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistributionAction } from '@/distribute/data-access/store/distribution.action';

@Component({
  selector: 'tp-distribute-form',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, NgIf, NgClass, NgTemplateOutlet],
  templateUrl: './distribute-form.component.html',
  styleUrl: './distribute-form.component.scss',
})
export class DistributeFormComponent {
  private store = inject(Store<{ distrbution: DistributeState }>);
  get controls() {
    return this.form.controls;
  }
  data$ = combineLatest({
    status: this.store.select(selectStatus),
    error: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
  });
  form = new FormGroup({
    num_employees: new FormControl<number>(0),
    // city: new FormGroup({
    //   name: new FormControl(),
    // }),
  });
  package_name = '';
  constructor(
    public dialogRef: MatDialogRef<DistributeFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData<Distribute & { package_name: string }>
  ) {}
  ngOnInit(): void {
    if (this.data.type === 'update') {
      this.form.patchValue(this.data.data as any);
    }
    if (this.data.data) {
      this.package_name = this.data.data.package_name;
    }
  }

  action() {
    if (this.data.type === 'create') {
      const value = this.form.getRawValue();
      this.store.dispatch(
        DistributionAction.peek({
          num_employees: value.num_employees!,
          pack: this.package_name as 'package1' | 'package4',
        })
      );
    }
  }
}
