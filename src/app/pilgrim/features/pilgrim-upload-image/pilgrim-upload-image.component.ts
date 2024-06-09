import { PilgrimAction } from '@/pilgrim/data-access/store/pilgrim.action';
import { PilgrimState, Pilgrims } from '@/pilgrim/utils/types/pilgrim.type';
import { MaterialModule } from '@/shared/module/material.module';
import {
  selectStatus,
  selectErrors,
  selectIsLoading,
} from '@/pilgrim/data-access/store/pilgrim.reducer';
import { Pilgrim, TPState } from '@/shared/types/base.type';
import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, delay } from 'rxjs';
import { PilgrimService } from '@/pilgrim/data-access/service/pilgrim.service';

@Component({
  selector: 'tp-pilgrim-upload-image',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './pilgrim-upload-image.component.html',
  styleUrl: './pilgrim-upload-image.component.scss',
})
export class PilgrimUploadImageComponent {
  private store = inject(Store<{ pilgrims: PilgrimState }>);
  private service = inject(PilgrimService);
  img: string = '';
  data$ = combineLatest({
    status: this.store.select(selectStatus),
    error: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
  });
  fileCtrl = new FormControl<File | null>(null, [Validators.required]);
  isLoaidng = false;
  status: TPState = 'prompt';
  onClick() {
    const file = this.fileCtrl.value;
    const id = this.data.national_id;
    console.log({ file });
    this.isLoaidng = true;
    this.status = 'sending';
    if (file) {
      this.service
        .uploadImage(id, file)
        .pipe(
          delay(1000),
          catchError((error) => {
            this.isLoaidng = false;
            this.status = 'error';
            throw error;
          })
        )
        .subscribe(() => {
          this.isLoaidng = false;
          this.status = 'success';
        });
    }
  }

  onFileChange(event: any) {
    this.fileCtrl.patchValue(event.target.files[0]);
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.data.image = reader.result + '';
      this.img = reader.result + '';
    };
  }
  constructor(
    public dialogRef: MatDialogRef<PilgrimUploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pilgrim
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
