import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <section class="flex justify-center flex-col items-center gap-8 py-4">
      <img src="../../../../assets/icons/logo-primary.svg" class="w-[250px]" />
      <router-outlet></router-outlet>
    </section>
  `,
})
export class RegistrationComponent {}
