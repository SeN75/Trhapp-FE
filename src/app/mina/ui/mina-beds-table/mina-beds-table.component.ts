import { Component, ViewChild, inject } from '@angular/core';
import { BedTentMina } from '@/shared/types/base.type';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSuites } from '@/mina/data-access/store/suites.reducer';
import { SuiteState } from '@/mina/utils/types/suites.type';
import { MaterialModule } from '@/shared/module/material.module';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';

@Component({
  selector: 'tp-mina-beds-table',
  standalone: true,
  imports: [MaterialModule, TpPaginatorDirective],
  templateUrl: './mina-beds-table.component.html',
  styleUrl: './mina-beds-table.component.scss',
})
export class MinaBedsTableComponent {
  private store = inject(Store<{ suites: SuiteState }>);
  private router = inject(Router);
  private aRouter = inject(ActivatedRoute);
  suites$ = this.store.select(selectSuites);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<BedTentMina>();
  displayedColumns: string[] = [
    'bed_number',
    'place',
    'gender',
    'pilgrim',
    'actions',
  ];

  ngOnInit(): void {
    const suiteId = this.aRouter.snapshot.params['id'];
    const loungeId = this.aRouter.snapshot.params['loungeId'];
    if (!suiteId) this.router.navigate(['..']);
    else {
      this.suites$.pipe().subscribe((data) => {
        const suite = (data || []).find((suite) => +suite.id === +suiteId);
        console.log({ suite, data, suiteId });
        if (!suite) {
          // this.router.navigate(['..']);
        }
        this.dataSource.data =
          suite?.lounges
            ?.find((l) => +l.id === +loungeId)
            ?.beds?.map((l, i) => ({
              ...l,
              ...l.info,
              ...l.pilgrim,
              position: i + 1,
            })) || [];
      });
    }
  }
}
