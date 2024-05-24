import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
  viewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArafahCreateSuiteComponent } from '../arafah-create-tent/arafah-create-suite.component';
import { ArafahTableComponent } from '../../ui/arafah-table/arafah-table.component';
import { ArafahCardsComponent } from '../../ui/arafah-cards/arafah-cards.component';
import {
  LoungeArafahState,
  LoungesArafah,
} from '../../utils/types/lounges-arafah.type';
import { RouterLink } from '@angular/router';
import { TpPaginatorDirective } from '../../../shared/directive/tp-paginator.directive';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/module/material.module';
import { Store } from '@ngrx/store';
import { selectLounges_arafah } from '../../data-access/store/lounge-arafah.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoungeArafah } from '../../../shared/types/base.type';

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
  private store = inject(Store<{ lounges_arafah: LoungeArafahState }>);
  lounges$ = this.store.select(selectLounges_arafah);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  constructor() {
    this.lounges$.pipe(takeUntilDestroyed()).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data || [];
    });
  }
  dataSource = new MatTableDataSource<LoungeArafah>();
  private dialog = inject(MatDialog);
  obs = this.dataSource.connect();
  createPlace() {}
}
