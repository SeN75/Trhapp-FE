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

@Component({
  selector: 'app-arafah-create-suite',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './arafah-create-suite.component.html',
  styleUrl: './arafah-create-suite.component.scss',
})
export class ArafahCreateSuiteComponent implements OnInit {
  private store = inject(Store<{ arafah: ArafahState }>);
  ngOnInit(): void {
    this.controls.no_lounges.valueChanges.pipe().subscribe((v) => {
      if (v) {
        for (let i = 0; i < this.controls.lounges.controls.length; i++) {
          this.controls.lounges.removeAt(i);
        }
        for (let i = 0; i < v; i++) {
          this.controls.lounges.push(this.initalLounge(i));
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
    console.log(payload);
    delete (payload as any).max_capacity;
    delete (payload as any).no_lounge;
    if (payload)
      this.store.dispatch(ArafahAction.create({ payload, pack: 'package1' }));
  }
}
