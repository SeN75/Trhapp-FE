import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tp-mina-shell',
  template: `<router-outlet />`,
  imports: [CommonModule, RouterOutlet],
  standalone: true,
})
export class MinaShellComponent {}
