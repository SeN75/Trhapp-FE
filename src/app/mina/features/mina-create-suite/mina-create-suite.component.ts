import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../shared/module/material.module';

@Component({
  selector: 'app-mina-create-suite',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './mina-create-suite.component.html',
  styleUrl: './mina-create-suite.component.scss',
})
export class MinaCreateSuiteComponent implements OnInit {
  ngOnInit(): void {
    this.controls.no_lounges.valueChanges.pipe().subscribe((v) => {
      if (true) {
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
        this.controls.lounges.controls[i].controls.max_capacity.setValue(v);
      }
    });
  }
  initalLounge = (i = 0, capacity = 0) =>
    new FormGroup({
      name: new FormControl('صالة ' + (i + 1)),
      max_capacity: new FormControl(capacity),
    });
  form = new FormGroup({
    max_capacity: new FormControl(),
    no_lounges: new FormControl(),
    lounges: new FormArray<
      FormGroup<{
        name: FormControl<string | null>;
        max_capacity: FormControl<number | null>;
      }>
    >([]),
  });

  get controls() {
    return this.form.controls;
  }
}
