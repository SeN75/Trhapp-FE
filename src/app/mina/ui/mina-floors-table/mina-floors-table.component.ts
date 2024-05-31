import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MaterialModule } from '@/shared/module/material.module';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { BuildingState } from '@/building//utils/types/building.type';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBuildings } from '@/building//data-access/store/building.reducer';
import { Floor } from '@/shared/types/base.type';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'tp-mina-floors-table',
  standalone: true,
  imports: [MaterialModule, TpPaginatorDirective, RouterLink],
  templateUrl: './mina-floors-table.component.html',
  styleUrl: './mina-floors-table.component.scss',
})
export class MinaFloorsTableComponent implements OnInit, AfterViewInit {
  private store = inject(Store<{ buildings: BuildingState }>);
  private router = inject(Router);
  private aRouter = inject(ActivatedRoute);

  buildings$ = this.store.select(selectBuildings);
  dataSource = new MatTableDataSource<Floor>();
  displayedColumns: string[] = [
    'position',
    'name',
    'building',
    'rooms',
    'actions',
  ];
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    const buildingId = this.aRouter.snapshot.params['id'];
    if (!buildingId) this.router.navigate(['..']);
    else {
      this.buildings$.pipe().subscribe((data) => {
        const building = (data || []).find(
          (building) => +building.id === +buildingId
        );
        if (!building) {
          // this.router.navigate(['..']);
        }
        this.dataSource.data =
          building?.floors?.map((f, i) => ({ ...f, position: i + 1 })) || [];
      });
    }
  }
}
