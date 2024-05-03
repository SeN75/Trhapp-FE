import { Component } from '@angular/core';
import { BusesTableComponent } from '../../ui/buses-table/buses-table.component';
import { CommonModule } from '@angular/common';
import { StateCardComponent } from '../../ui/state-card/state-card.component';

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [CommonModule, BusesTableComponent, StateCardComponent],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.scss',
})
export class BusesComponent {}
