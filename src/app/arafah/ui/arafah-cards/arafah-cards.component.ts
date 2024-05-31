import { Component, Input } from '@angular/core';
import { MaterialModule } from '@/shared/module/material.module';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoungeArafah } from '@/shared/types/base.type';

@Component({
  selector: 'tp-arafah-card',
  standalone: true,
  imports: [MaterialModule, NgClass, RouterLink],
  templateUrl: './arafah-cards.component.html',
  styleUrl: './arafah-cards.component.scss',
})
export class ArafahCardsComponent {
  @Input({ required: true }) data!: LoungeArafah;
}
