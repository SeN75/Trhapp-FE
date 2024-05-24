import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/module/material.module';
import { delay, tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  form = new FormGroup({
    phone_number: new FormControl<string>('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    registration_code: new FormControl('', [Validators.required]),
  });
  isLoading = false;
  hasError = false;
  get controls() {
    return this.form.controls;
  }
  private auth = inject(AuthService);
  private router = inject(Router);

  signup() {
    if (this.form.valid) {
      this.isLoading = true;
      this.hasError = false;
      const { phone_number, password, registration_code } =
        this.form.getRawValue();
      this.auth
        .signUp({
          phone_number: phone_number!,
          password: password!,
          registration_code: registration_code!,
        })
        .pipe(
          delay(2000),
          tap(() => (this.isLoading = false)),
          tap(() => this.router.navigate(['/', 'r'])),
          catchError((error) => {
            this.isLoading = false;
            this.hasError = true;
            console.log(error);
            throw of(error);
          })
        )
        .subscribe();
    }
  }
}
