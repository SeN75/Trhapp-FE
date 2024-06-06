import { PilgrimService } from '@/pilgrim/data-access/service/pilgrim.service';
import { PilgrimsCardComponent } from '@/pilgrim/ui/pilgrims-card/pilgrims-card.component';
import { MaterialModule } from '@/shared/module/material.module';
import { Pilgrim } from '@/shared/types/base.type';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, tap, catchError, of } from 'rxjs';

@Component({
  selector: 'tp-pilgrim-assembly-point',
  standalone: true,
  imports: [MaterialModule, CommonModule, PilgrimsCardComponent],
  templateUrl: './pilgrim-assembly-point.component.html',
  styleUrl: './pilgrim-assembly-point.component.scss',
})
export class PilgrimAssemblyPointComponent implements OnInit, OnDestroy {
  data?: Pilgrim;
  ngOnInit(): void {
    // const data = JSON.parse(
    //   localStorage['TPPilgrimAssembly']
    //     ? localStorage['TPPilgrimAssembly']
    //     : '{}'
    // );
    // if (data && Object.keys(data).length > 0) {
    //   this.data = data;
    // }
  }
  form = new FormGroup({
    national_id: new FormControl<string>('', [Validators.required]),
  });
  private router = inject(Router);
  private service = inject(PilgrimService);
  get controls() {
    return this.form.controls;
  }
  isLoading = false;
  hasError = false;
  send() {
    if (this.form.valid) {
      this.isLoading = true;
      this.hasError = false;
      const { national_id } = this.form.getRawValue();
      if (national_id)
        this.service
          .assembly({ national_id })
          .pipe(
            delay(2000),
            tap(() => (this.isLoading = false)),
            tap(
              (data) =>
                (localStorage['TPPilgrimAssembly'] = JSON.stringify(data || {}))
            ),
            tap((data: Pilgrim) => (this.data = data)),
            catchError((error) => {
              this.isLoading = false;
              this.hasError = true;
              return of(error);
            })
          )
          .subscribe();
    }
  }
  ngOnDestroy(): void {
    localStorage.removeItem('TPPilgrimAssembly');
  }
}
