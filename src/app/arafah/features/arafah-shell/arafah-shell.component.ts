import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoungeArafahState } from '@/arafah/utils/types/lounges-arafah.type';
import { Store } from '@ngrx/store';
import { LoungeArafahAction } from '../../data-access/store/lounge-arafah.action';

@Component({
  selector: 'tp-arafah-shell',
  template: `<router-outlet />`,
  imports: [CommonModule, RouterOutlet],
  standalone: true,
})
export class ArafahShellComponent implements OnInit {
  ngOnInit(): void {}
}
