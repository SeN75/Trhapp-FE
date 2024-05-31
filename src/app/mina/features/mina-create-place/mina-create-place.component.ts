import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '@/shared/types/base.type';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/shared/module/material.module';
import { Store } from '@ngrx/store';
import { BedTentMinaState } from '@/mina/utils/types/beds-tent-mina.type';
import {
  selectStatus,
  selectErrors,
  selectIsLoading,
} from '@/mina/data-access/store/beds-tent-mina.reducer';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-mina-create-place',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './mina-create-place.component.html',
  styleUrl: './mina-create-place.component.scss',
})
export class MinaCreatePlaceComponent {
  private store = inject(Store<{ beds_tent_mina: BedTentMinaState }>);
  data$ = combineLatest({
    status: this.store.select(selectStatus),
    error: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
  });
  form = new FormGroup({
    name: new FormControl(),
    number_of_suties: new FormControl(),
  });
  get controls() {
    return this.form.controls;
  }

  constructor(
    public dialogRef: MatDialogRef<MinaCreatePlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<unknown>
  ) {}
  ngOnInit(): void {
    if (this.data.type === 'update') {
      this.form.patchValue(this.data.data as any);
    }
  }
  onClick() {
    this.dialogRef.close();
  }
}
