import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tp-pilgrim-shell',
  template: `<router-outlet></router-outlet>`,
  styles: [],
  standalone: true,
  imports: [RouterOutlet],
})
export class PilgrimShellComponent {}
