import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { MaterialModule } from '@/shared/module/material.module';
import { SuiteState } from '@/mina/utils/types/suites.type';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { selectSuites } from '../../data-access/store/suites.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoungeMina } from '@/shared/types/base.type';

@Component({
  selector: 'tp-mina-suites-table',
  standalone: true,
  imports: [CommonModule, TpPaginatorDirective, MaterialModule, RouterLink],
  templateUrl: './mina-suites-table.component.html',
  styleUrl: './mina-suites-table.component.scss',
})
export class MinaSuitesTableComponent implements AfterViewInit, OnInit {
  private store = inject(Store<{ suites: SuiteState }>);
  private router = inject(Router);
  private aRouter = inject(ActivatedRoute);
  suites$ = this.store.select(selectSuites);
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<LoungeMina>();
  displayedColumns: string[] = [
    'position',
    'name',
    'max_capacity',
    'current_capacity',
    'beds',
    'actions',
  ];

  ngOnInit(): void {
    const suiteId = this.aRouter.snapshot.params['id'];
    if (!suiteId) this.router.navigate(['..']);
    else {
      this.suites$.pipe().subscribe((data) => {
        const suite = (data || []).find((suite) => +suite.id === +suiteId);
        console.log({ suite, data, suiteId });
        if (!suite) {
          // this.router.navigate(['..']);
        }
        this.dataSource.data =
          suite?.lounges?.map((l, i) => ({ ...l, position: i + 1 })) || [];
      });
    }
  }
}

const ELEMENT_DATA: any[] = [
  {
    position: 1,
    name: 'جناح 1',
    max_capacity: 100,
    current_capacity: 50,
    rooms: 4,
  },
  {
    position: 2,
    name: 'جناح 2',
    max_capacity: 100,
    current_capacity: 50,
    rooms: 4,
  },
  {
    position: 3,
    name: 'جناح 3',
    max_capacity: 100,
    current_capacity: 50,
    rooms: 4,
  },
];
