import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '@/shared/module/material.module';
import { Store } from '@ngrx/store';
import { CreateMinaPack1, MinaState } from '../../utils/types/mina.type';
import { MinaAction } from '@/mina/data-access/store/mina.action';
import { combineLatest, map, tap } from 'rxjs';
import {
  selectStatus,
  selectErrors,
  selectIsLoading,
} from '@/mina/data-access/store/mina.reducer';
import { MinaAllocationStatusComponent } from '@/mina/ui/mina-allocation-status/mina-allocation-status.component';
import { AvailabiltyState } from '@/shared/types/availabilty.type';
import { selectData } from '@/shared/store/availavilty/availavilty.reducer';

@Component({
  selector: 'app-mina-create-suite',
  standalone: true,
  imports: [CommonModule, MaterialModule, MinaAllocationStatusComponent],
  templateUrl: './mina-create-suite.component.html',
  styleUrl: './mina-create-suite.component.scss',
})
export class MinaCreateSuiteComponent implements OnInit {
  private store = inject(Store<{ mina: MinaState }>);
  private avaStore = inject(Store<{ availavilty: AvailabiltyState }>);
  last_lounge = 0;
  avaData$ = this.avaStore.select(selectData).pipe(
    map((data) => data?.package1.mina),
    tap((v) => {
      this.controls.suite_number.setValue((v?.last_created_suite || 0) + 1);
      this.last_lounge = v?.last_created_lounge || 0;
    })
  );
  data$ = combineLatest({
    status: this.store.select(selectStatus),
    error: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
  });

  ngOnInit(): void {
    this.store.dispatch(MinaAction.reset());
    this.controls.no_lounges.valueChanges.pipe().subscribe((v) => {
      this.form.setControl('lounges', new FormArray<FormGroup>([]));
      if (this.controls.lounges.value.length === 0) {
        const num = v || 0;
        for (let i = 0; i < (num <= 20 ? num : 20); i++) {
          this.controls.lounges.push(
            this.initalLounge(i + 1 + this.last_lounge)
          );
        }
      }
    });
    this.controls.max_capacity.valueChanges.pipe().subscribe((v) => {
      for (let i = 0; i < this.controls.lounges.controls.length; i++) {
        this.controls.lounges.controls[i].controls.max_capacity.setValue(v);
      }
    });
  }
  initalLounge = (i = 0, capacity = 0) =>
    new FormGroup({
      lounge_number: new FormControl(i + ''),
      max_capacity: new FormControl<number>(capacity),
    });
  form = new FormGroup({
    max_capacity: new FormControl<number>(0),
    is_male_accommodation: new FormControl<boolean>(false),
    no_lounges: new FormControl<number>(0),
    suite_number: new FormControl(0),
    lounges: new FormArray<
      FormGroup<{
        lounge_number: FormControl<string | null>;
        max_capacity: FormControl<number | null>;
      }>
    >([]),
  });

  get controls() {
    return this.form.controls;
  }

  send() {
    const data = {
      suites: [this.form.getRawValue()],
    } as unknown as CreateMinaPack1;

    const payload = data;
    if (payload) {
      this.store.dispatch(MinaAction.create({ payload, pack: 'package1' }));
    }
  }
}
