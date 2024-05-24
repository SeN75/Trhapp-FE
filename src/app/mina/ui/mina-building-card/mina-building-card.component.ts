import { Component, Input } from '@angular/core';
import { Building } from '../../../shared/types/base.type';
import { NgClass } from '@angular/common';
import { MaterialModule } from '../../../shared/module/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tp-mina-building-card',
  standalone: true,
  imports: [NgClass, MaterialModule, RouterLink],
  templateUrl: './mina-building-card.component.html',
  styleUrl: './mina-building-card.component.scss',
})
export class MinaBuildingCardComponent {
  @Input() data!: Building;
}
