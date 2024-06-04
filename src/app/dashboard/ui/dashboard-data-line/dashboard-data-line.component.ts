import { selectData } from '@/shared/store/availavilty/availavilty.reducer';
import { AvailabiltyState } from '@/shared/types/availabilty.type';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Chart,
  ChartConfiguration,
  ChartDataset,
  ChartEvent,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { tap } from 'rxjs';
@Component({
  selector: 'tp-dashboard-data-line',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './dashboard-data-line.component.html',
  styleUrl: './dashboard-data-line.component.scss',
})
export class DashboardDataLineComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  private store = inject(Store<{ availavilty: AvailabiltyState }>);
  availavilty$ = this.store.select(selectData).pipe(
    tap((m) => {
      const dataMale: number[] = [
        m?.package1.mina.males.beds.required || 0,
        m?.package1.mina.males.beds.available || 0,
        m?.package1.mina.males.beds.allocated || 0,
        m?.package1.mina.males.beds.created || 0,
      ];
      const dataFemale: number[] = [
        m?.package1.mina.females.beds.required || 0,
        m?.package1.mina.females.beds.available || 0,
        m?.package1.mina.females.beds.allocated || 0,
        m?.package1.mina.females.beds.created || 0,
      ];

      this.lineChartData.datasets[0].data = [dataMale[0], dataFemale[0]];
      this.lineChartData.datasets[1].data = [dataMale[1], dataFemale[1]];
      this.lineChartData.datasets[2].data = [dataMale[2], dataFemale[2]];
      this.lineChartData.datasets[3].data = [dataMale[3], dataFemale[3]];

      this.chart?.update();
    })
  );

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Series C',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [180, 480, 770, 90, 1000, 270, 400],
        label: 'Series D',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['الرجال', 'النساء'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  public lineChartType: ChartType = 'line';
}
