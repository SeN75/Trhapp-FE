import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '@/shared/module/material.module';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '@/shared/service/auth.service';
import { catchError, delay, of, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { LoggerService } from '@/shared/service/logger.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, NgClass, NgIf, RouterLink],
  providers: [AuthService, LoggerService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({
    phone_number: new FormControl<string>('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  private auth = inject(AuthService);
  private router = inject(Router);
  get controls() {
    return this.form.controls;
  }
  isLoading = false;
  hasError = false;

  login() {
    if (this.form.valid) {
      this.isLoading = true;
      this.hasError = false;
      const { phone_number, password } = this.form.getRawValue();
      this.auth
        .login({ phone_number: phone_number!, password: password! })
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
