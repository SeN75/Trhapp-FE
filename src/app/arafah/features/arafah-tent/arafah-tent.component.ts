import {
  AfterViewInit,
  Component,
  ViewChild,
  inject,
  viewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArafahCreateSuiteComponent } from '../arafah-create-tent/arafah-create-suite.component';
import { ArafahTableComponent } from '../../ui/arafah-table/arafah-table.component';
import { ArafahCardsComponent } from '../../ui/arafah-cards/arafah-cards.component';
import { LoungesArafah } from '../../utils/types/lounges-arafah.type';
import { RouterLink } from '@angular/router';
import { TpPaginatorDirective } from '../../../shared/directive/tp-paginator.directive';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/module/material.module';

@Component({
  selector: 'app-arafah-tent',
  standalone: true,
  imports: [
    ArafahTableComponent,
    ArafahCardsComponent,
    RouterLink,
    TpPaginatorDirective,
    AsyncPipe,
    MaterialModule,
  ],
  templateUrl: './arafah-tent.component.html',
  styleUrl: './arafah-tent.component.scss',
})
export class ArafahTentComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  data = data;
  dataSource = new MatTableDataSource(data);
  private dialog = inject(MatDialog);
  obs = this.dataSource.connect();
  createPlace() {}
}

const data: LoungesArafah = [
  {
    id: '1',
    name: 'Sunset Lounge',
    lounge_number: 101,
    max_capacity: 50,
    is_male_accmidations: true,
  },
  {
    id: '2',
    name: 'Ocean View Lounge',
    lounge_number: 102,
    max_capacity: 75,
    is_male_accmidations: false,
  },
  {
    id: '3',
    name: 'Mountain Peak Lounge',
    lounge_number: 103,
    max_capacity: 60,
    is_male_accmidations: true,
  },
  {
    id: '4',
    name: 'Garden Terrace Lounge',
    lounge_number: 104,
    max_capacity: 40,
    is_male_accmidations: false,
  },
  {
    id: '5',
    name: 'Skyline Lounge',
    lounge_number: 105,
    max_capacity: 100,
    is_male_accmidations: true,
  },
  {
    id: '6',
    name: 'Lakeside Lounge',
    lounge_number: 106,
    max_capacity: 55,
    is_male_accmidations: false,
  },
  {
    id: '7',
    name: 'Desert Oasis Lounge',
    lounge_number: 107,
    max_capacity: 45,
    is_male_accmidations: true,
  },
  {
    id: '8',
    name: 'Forest Retreat Lounge',
    lounge_number: 108,
    max_capacity: 65,
    is_male_accmidations: false,
  },
  {
    id: '9',
    name: 'City Central Lounge',
    lounge_number: 109,
    max_capacity: 85,
    is_male_accmidations: true,
  },
  {
    id: '10',
    name: 'Beachside Lounge',
    lounge_number: 110,
    max_capacity: 70,
    is_male_accmidations: false,
  },
];
