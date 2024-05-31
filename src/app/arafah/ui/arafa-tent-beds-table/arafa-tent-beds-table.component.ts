import { selectLounges_arafah } from '../../data-access/store/lounge-arafah.reducer';
import { LoungeArafahState } from '@/arafah/utils/types/lounges-arafah.type';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { MaterialModule } from '@/shared/module/material.module';
import {
  BedBuidingMina,
  BedTentArafah,
  LoungeArafah,
} from '@/shared/types/base.type';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tp-arafa-tent-beds-table',
  standalone: true,
  imports: [MaterialModule, TpPaginatorDirective],
  templateUrl: './arafa-tent-beds-table.component.html',
  styleUrl: './arafa-tent-beds-table.component.scss',
})
export class ArafaTentBedsTableComponent implements AfterViewInit {
  private router = inject(Router);
  private aRouter = inject(ActivatedRoute);
  private store = inject(Store<{ lounges_arafah: LoungeArafahState }>);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  lounges$ = this.store.select(selectLounges_arafah);
  dataSource = new MatTableDataSource<BedTentArafah>();
  displayedColumns: string[] = [
    'bed_number',
    'place',
    'lounge',
    'gender',
    'pilgrim',
    'actions',
  ];
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    const loungeId = this.aRouter.snapshot.params['id'];
    if (!loungeId) this.router.navigate(['..']);

    // this.aRouter.paramMap.pipe(switchMap((params) => {}));
    this.lounges$.subscribe((loungeArafah) => {
      this.dataSource.data =
        loungeArafah
          ?.find((l) => +l.id === +loungeId)
          ?.beds?.map((p, i) => ({
            ...p,

            ...p.pilgrim,
            ...p.info,
            position: i + 1,
          })) || [];
      //   loungeArafah
    });
  }
}
