import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
type Item = { text: string; icon: string; link: string[] };
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [LogoComponent, MatIcon, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  items: Item[] = [
    {
      text: 'تسكين الباصات',
      icon: 'tp-bus',
      link: ['/', 'l', 'buses'],
    },
    {
      text: 'تسكين منى',
      icon: 'tp-bed',
      link: ['/', 'l', 'accommodation-mina'],
    },
    {
      text: 'تسكين عرفة',
      icon: 'tp-camping',
      link: ['/', 'l', 'accommodation-urafah'],
    },
    {
      text: 'الاجنحة',
      icon: 'tp-door-side',
      link: ['/', 'l', 'suites'],
    },
    {
      text: 'بطاقة الحاج',
      icon: 'tp-card',
      link: ['/', 'l', 'cards'],
    },
  ];
}
