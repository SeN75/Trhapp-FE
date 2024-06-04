import { Data } from '@/dashboard/util/type/dashboard-data.type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tp-dashboard-data-card',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-data-card.component.html',
  styleUrl: './dashboard-data-card.component.scss',
})
export class DashboardDataCardComponent {
  @Input() data!: Data;
}
