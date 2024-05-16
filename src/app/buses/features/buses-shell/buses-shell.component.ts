import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'tp-buses-shell',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class BusesShellComponent {}
