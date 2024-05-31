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
} from '@/arafah/utils/types/lounges-arafah.type';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '@/shared/module/material.module';
import { Store } from '@ngrx/store';
import { selectLounges_arafah } from '../../data-access/store/lounge-arafah.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoungeArafah } from '@/shared/types/base.type';
import { ArafahState } from '@/arafah/utils/types/arafah.type';
import { ArafahAction } from '../../data-access/store/arafah.action';
import { ArafahAllocationStatusComponent } from '@/arafah/ui/arafah-allocation-status/arafah-allocation-status.component';

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
    ArafahAllocationStatusComponent,
  ],
  templateUrl: './arafah-tent.component.html',
  styleUrl: './arafah-tent.component.scss',
})
export class ArafahTentComponent implements AfterViewInit {
  private store = inject(Store<{ lounges_arafah: LoungeArafahState }>);
  private arafahStore = inject(Store<{ arafah: ArafahState }>);
  private aRouter = inject(ActivatedRoute);
  lounges$ = this.store.select(selectLounges_arafah);
  pack = this.aRouter.snapshot.params['pack'] || 'package1';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.aRouter.params.subscribe((params) => {
      this.pack = params['pack'] || 'package1';
    });
  }
  constructor() {
    this.lounges$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.dataSource.data = data || [];
    });
  }
  dataSource = new MatTableDataSource<LoungeArafah>();
  private dialog = inject(MatDialog);
  obs = this.dataSource.connect();
  createPlace() {}

  allocate() {
    this.arafahStore.dispatch(ArafahAction.allocate({ pack: 'package1' }));
  }
}
