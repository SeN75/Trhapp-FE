import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SuitesTableComponent } from '../../ui/suites-table/suites-table.component';
import { StateCardComponent } from '../../ui/state-card/state-card.component';

@Component({
  selector: 'app-suites',
  standalone: true,
  imports: [CommonModule, SuitesTableComponent, StateCardComponent],
  templateUrl: './suites.component.html',
  styleUrl: './suites.component.scss',
})
export class SuitesComponent {}
