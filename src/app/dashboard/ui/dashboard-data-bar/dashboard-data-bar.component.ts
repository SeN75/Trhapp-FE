import { selectData } from '@/shared/store/availavilty/availavilty.reducer';
import { AvailabiltyState } from '@/shared/types/availabilty.type';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { tap } from 'rxjs';

@Component({
  selector: 'tp-dashboard-data-bar',
  standalone: true,
  imports: [BaseChartDirective, AsyncPipe, CommonModule],
  templateUrl: './dashboard-data-bar.component.html',
  styleUrl: './dashboard-data-bar.component.scss',
})
export class DashboardDataBarComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private store = inject(Store<{ availavilty: AvailabiltyState }>);
  availavilty$ = this.store.select(selectData).pipe(
    tap((m) => {
      const dataMale: number[] = [
        m?.package1.mina.males.beds.required || 0,
        m?.package1.mina.males.beds.available || 0,
      ];

      const dataFemale: number[] = [
        m?.package1.mina.females.beds.required || 0,
        m?.package1.mina.females.beds.available || 0,
      ];
      this.barChartData.datasets[0].data = [dataMale[0], dataFemale[0]];

      this.barChartData.datasets[1].data = [dataMale[1], dataFemale[1]];

      this.chart?.update();
    })
  );

  public barChartData: ChartData<'bar', number[], string | string[]> = {
    labels: ['الرجال', 'النساء'],
    datasets: [
      {
        data: [],
      },
      {
        data: [],
      },
    ],
  };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    layout: {},
  };

  public barChartType: ChartType = 'bar';
}
