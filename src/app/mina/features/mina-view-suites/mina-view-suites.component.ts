import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MinaSuitesTableComponent } from '../../ui/mina-suites-table/mina-suites-table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mina-view-suites',
  standalone: true,
  imports: [CommonModule, MinaSuitesTableComponent, RouterLink],
  templateUrl: './mina-view-suites.component.html',
  styleUrl: './mina-view-suites.component.scss',
})
export class MinaViewSuitesComponent {}
