import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '@/shared/module/material.module';
import { Store } from '@ngrx/store';
import { BuildingState } from '@/building//utils/types/building.type';
import {
  CreateMinaPack1,
  CreateMinaPack4,
  MinaState,
} from '@/mina/utils/types/mina.type';
import { MinaAction } from '@/mina/data-access/store/mina.action';
import { combineLatest } from 'rxjs';
import {
  selectStatus,
  selectErrors,
  selectIsLoading,
} from '@/mina/data-access/store/mina.reducer';

@Component({
  selector: 'app-mina-create-building',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './mina-create-building.component.html',
  styleUrl: './mina-create-building.component.scss',
})
export class MinaCreateBuildingComponent implements OnInit {
  private store = inject(Store<{ mina: MinaState }>);
  data$ = combineLatest({
    status: this.store.select(selectStatus),
    error: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
  });

  initalFloor = (i = 0) =>
    new FormGroup({
      floor_number: new FormControl(i),
      no_of_rooms: new FormControl(0),
      rooms: new FormArray<
        FormGroup<{
          room_number: FormControl<number | null>;
          is_male_accommodation: FormControl<boolean | null>;
          max_capacity: FormControl<number | null>;
        }>
      >([]),
    });

  initalRoom = (i = 0, capacity = 0) =>
    new FormGroup({
      room_number: new FormControl(i),
      is_male_accommodation: new FormControl(false),
      max_capacity: new FormControl(capacity),
    });
  form = new FormGroup({
    building_name: new FormControl<string>(''),
    no_of_floors: new FormControl<number>(0),
    floors: new FormArray<
      FormGroup<{
        floor_number: FormControl<number | null>;
        no_of_rooms: FormControl<number | null>;
        rooms: FormArray<
          FormGroup<{
            room_number: FormControl<number | null>;
            is_male_accommodation: FormControl<boolean | null>;
            max_capacity: FormControl<number | null>;
          }>
        >;
      }>
    >([]),
  });

  get controls() {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.form.controls.no_of_floors.valueChanges.pipe().subscribe((v) => {
      if (v) {
        for (let i = 0; i < this.form.controls.floors.controls.length; i++) {
          this.form.controls.floors.removeAt(i);
        }
        for (let i = 0; i < v; i++) {
          this.form.controls.floors.push(this.initalFloor(i));
          this.form.controls.floors.controls[
            i
          ].controls.no_of_rooms.valueChanges.subscribe((v2) => {
            if (v2) {
              for (
                let j = 0;
                j <=
                this.controls.floors.controls[i].controls.rooms.controls.length;
                j++
              ) {
                this.controls.floors.controls[i].controls.rooms.removeAt(j);
              }
              for (let j = 0; j < v2; j++) {
                this.controls.floors.controls[i].controls.rooms.push(
                  this.initalRoom(j, v2)
                );
              }
            }
          });
        }
      }
    });
  }
  send() {
    const data = this.form.getRawValue() as unknown as CreateMinaPack4;
    const payload: CreateMinaPack4 = {
      building_name: data.building_name,
      floors: data.floors.map((v) => {
        return {
          floor_number: v.floor_number,
          rooms: v.rooms.map((v2) => {
            return {
              room_number: v2.room_number,
              is_male_accommodation: v2.is_male_accommodation,
              max_capacity: v2.max_capacity,
            };
          }),
        };
      }),
    };

    // data.map((v) => {
    //   v.building_name;

    //   return {
    //     building_name: v.building_name,
    //     floors: v.floors.map((v2) => {
    //       return {
    //         floor_number: v2.floor_number,
    //         rooms: v2.rooms,
    //       };
    //     }),
    //   };
    // });
    console.log(payload);
    if (this.form.valid) {
      this.store.dispatch(MinaAction.create({ payload, pack: 'package4' }));
    }
  }
}
