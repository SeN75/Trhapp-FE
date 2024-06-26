import { Component, Inject, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MaterialModule } from '../../module/material.module';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UploadOpsState } from '../../types/upload-operations.type';
import { combineLatest } from 'rxjs';
import {
  selectErrors,
  selectIsLoading,
  selectRes,
  selectStatus,
} from '../../store/upload-operation/upload-operation.reducer';
import { UploadOperationActions } from '../../store/upload-operation/upload-operation.action';

@Component({
  selector: 'app-upload-operations',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './upload-operations.component.html',
  styleUrl: './upload-operations.component.scss',
})
export class UploadOperationsComponent {
  private store = inject(Store<{ uploadOps: UploadOpsState }>);
  data$ = combineLatest({
    status: this.store.select(selectStatus),
    error: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
  });
  fileCtrl = new FormControl<File | null>(null, [Validators.required]);
  res$ = this.store.select(selectRes);
  onClick() {
    const file = this.fileCtrl.value;
    console.log({ file });
    if (file) this.store.dispatch(UploadOperationActions.upload({ file }));
  }

  onFileChange(event: any) {
    this.fileCtrl.patchValue(event.target.files[0]);
  }
  constructor(
    public dialogRef: MatDialogRef<UploadOperationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
