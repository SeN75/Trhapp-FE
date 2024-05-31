import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MaterialModule } from '@/shared/module/material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  CreateSupervisor,
  SupervisorState,
  UpdateSupervisor,
} from '@/supervisor/utils/types/supervisor.type';
import { selectStatus } from '@/shared/store/upload-operation/upload-operation.reducer';
import {
  selectIsLoading,
  selectErrors,
} from '../../data-access/store/supervisor.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, Supervisor } from '@/shared/types/base.type';
import { SupervisorAction } from '../../data-access/store/supervisor.action';

@Component({
  selector: 'app-supervisor-form',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './supervisor-form.component.html',
  styleUrl: './supervisor-form.component.scss',
})
export class SupervisorFormComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  private store = inject(Store<{ supervisor: SupervisorState }>);
  get controls() {
    return this.form.controls;
  }

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    status: this.store.select(selectStatus),
    error: this.store.select(selectErrors),
  });

  constructor(
    public dialogRef: MatDialogRef<SupervisorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<Supervisor>
  ) {}

  ngOnInit(): void {
    if (this.data.type === 'update') {
      this.form.patchValue(this.data.data);
    }
  }
  action() {
    if (this.data.type === 'create') {
      const supervisor = this.form.getRawValue() as CreateSupervisor;
      this.store.dispatch(SupervisorAction.create({ supervisor }));
    } else {
      const updateSupervisor = this.form.getRawValue() as UpdateSupervisor;
      this.store.dispatch(SupervisorAction.update({ updateSupervisor }));
    }
    this.dialogRef.close();
  }
}
