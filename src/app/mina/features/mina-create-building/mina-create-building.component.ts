import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../shared/module/material.module';

@Component({
  selector: 'app-mina-create-building',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './mina-create-building.component.html',
  styleUrl: './mina-create-building.component.scss',
})
export class MinaCreateBuildingComponent implements OnInit {
  initalFloor = (i = 0) =>
    new FormGroup({
      floor_numbers: new FormControl(i),
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
        floor_numbers: FormControl<number | null>;
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
    const data = this.form.getRawValue();
    console.log(data);
  }
}
