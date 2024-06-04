import { DashboardDataBarComponent } from '@/dashboard/ui/dashboard-data-bar/dashboard-data-bar.component';
import { DashboardDataCardComponent } from '@/dashboard/ui/dashboard-data-card/dashboard-data-card.component';
import { DashboardDataLineComponent } from '@/dashboard/ui/dashboard-data-line/dashboard-data-line.component';
import { selectData } from '@/shared/store/availavilty/availavilty.reducer';
import { AvailabiltyState } from '@/shared/types/availabilty.type';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tp-dashboard-data',
  standalone: true,
  imports: [
    DashboardDataBarComponent,
    DashboardDataCardComponent,
    DashboardDataLineComponent,
    CommonModule,
  ],
  templateUrl: './dashboard-data.component.html',
  styleUrl: './dashboard-data.component.scss',
})
export class DashboardDataComponent {
  private store = inject(Store<{ availavilty: AvailabiltyState }>);
  availavilty$ = this.store.select(selectData);
}
