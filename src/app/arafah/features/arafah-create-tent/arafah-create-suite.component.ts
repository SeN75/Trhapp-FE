import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '@/shared/module/material.module';
import {
  ArafahState,
  CreateArafahPack1,
} from '@/arafah/utils/types/arafah.type';
import { Store } from '@ngrx/store';
import { ArafahAction } from '../../data-access/store/arafah.action';
import { combineLatest, filter, map, tap } from 'rxjs';
import {
  selectErrors,
  selectIsLoading,
  selectStatus,
} from '@/arafah/data-access/store/arafah.reducer';
import { ArafahAllocationStatusComponent } from '@/arafah/ui/arafah-allocation-status/arafah-allocation-status.component';
import { ActivatedRoute } from '@angular/router';
import { selectData } from '@/shared/store/availavilty/availavilty.reducer';
import { AvailabiltyState } from '@/shared/types/availabilty.type';

@Component({
  selector: 'app-arafah-create-suite',
  standalone: true,
  imports: [CommonModule, MaterialModule, ArafahAllocationStatusComponent],
  templateUrl: './arafah-create-suite.component.html',
  styleUrl: './arafah-create-suite.component.scss',
})
export class ArafahCreateSuiteComponent implements OnInit {
  private store = inject(Store<{ arafah: ArafahState }>);
  private aRouter = inject(ActivatedRoute);
  private avaStore = inject(Store<{ availavilty: AvailabiltyState }>);
  pack: 'package1' | 'package4' =
    this.aRouter.snapshot.params['pack'] === 'package1'
      ? 'package1'
      : 'package4';
  last_lounge = 0;
  avaData$ = this.avaStore.select(selectData).pipe(
    filter((data) => !!data),
    map((data) => data![this.pack || 'package1'].arafah),
    tap((v) => {
      this.last_lounge = v?.last_created_lounge || 0;
      console.log({ v, dd: this.last_lounge });
    })
  );
  data$ = combineLatest({
    status: this.store.select(selectStatus),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectErrors),
  });
  ngOnInit(): void {
    this.store.dispatch(ArafahAction.reset());
    this.controls.no_lounges.valueChanges.pipe().subscribe((v) => {
      this.form.setControl('lounges', new FormArray<FormGroup>([]));

      if (v) {
        for (let i = 0; i < v; i++) {
          this.controls.lounges.push(
            this.initalLounge(i + this.last_lounge + 1)
          );
        }
      }
    });
    this.controls.max_capacity.valueChanges.pipe().subscribe((v) => {
      for (let i = 0; i < this.controls.lounges.controls.length; i++) {
        this.controls.lounges.controls[i].controls.max_capacity.setValue(
          v ? +v : 0
        );
      }
    });

    // this.aRouter.params.subscribe((params) => {
    //   this.pack = params['pack'] || 'package1';
    // });
  }
  initalLounge = (i = 0, capacity = 0) =>
    new FormGroup({
      lounge_number: new FormControl(i),
      max_capacity: new FormControl<number>(capacity),
      is_male_accommodation: new FormControl<boolean>(false),
    });
  form = new FormGroup({
    max_capacity: new FormControl<number>(0),
    no_lounges: new FormControl<number>(0),
    lounges: new FormArray<
      FormGroup<{
        lounge_number: FormControl<number | null>;
        max_capacity: FormControl<number | null>;
        is_male_accommodation: FormControl<boolean | null>;
      }>
    >([]),
  });

  get controls() {
    return this.form.controls;
  }

  send() {
    const payload = this.form.getRawValue() as unknown as CreateArafahPack1;
    delete (payload as any).max_capacity;
    delete (payload as any).no_lounges;
    if (payload)
      this.store.dispatch(
        ArafahAction.create({
          payload,
          pack: this.pack === 'package4' ? 'package4' : 'package1',
        })
      );
  }
}
