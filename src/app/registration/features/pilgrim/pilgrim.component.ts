import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { delay, tap, catchError, of } from 'rxjs';
import { MaterialModule } from '../../../shared/module/material.module';
import { AuthService } from '../../../shared/service/auth.service';
import { PilgrimService } from '../../../pilgrim/data-access/service/pilgrim.service';

@Component({
  selector: 'app-pilgrim',
  standalone: true,
  imports: [MaterialModule, NgClass, NgIf, RouterLink],
  templateUrl: './pilgrim.component.html',
  styleUrl: './pilgrim.component.scss',
})
export class PilgrimComponent {
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

  login() {
    if (this.form.valid) {
      this.isLoading = true;
      this.hasError = false;
      const { national_id } = this.form.getRawValue();
      if (national_id)
        this.service
          .login({ national_id })
          .pipe(
            delay(2000),
            tap(() => (this.isLoading = false)),
            tap(() => this.router.navigate(['/', 'l'])),
            catchError((error) => {
              this.isLoading = false;
              this.hasError = true;
              return of(error);
            })
          )
          .subscribe();
    }
  }
}
