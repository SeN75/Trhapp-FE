import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout-shell',
  template: `
    <sidebar>
      <router-outlet />
    </sidebar>
  `,
  styles: [``],
  imports: [SidebarComponent, RouterOutlet],
})
export class LayoutShellComponent {}
