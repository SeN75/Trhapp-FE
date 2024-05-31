import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '@/shared/module/material.module';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { BuildingState } from '@/building//utils/types/building.type';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBuildings } from '@/building//data-access/store/building.reducer';
import { Floor } from '@/shared/types/base.type';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'tp-mina-floors-table',
  standalone: true,
  imports: [MaterialModule, TpPaginatorDirective, RouterLink],
  templateUrl: './mina-floors-table.component.html',
  styleUrl: './mina-floors-table.component.scss',
})
export class MinaFloorsTableComponent implements OnInit {
  private store = inject(Store<{ buildings: BuildingState }>);
  private router = inject(Router);
  private aRouter = inject(ActivatedRoute);

  buildings$ = this.store.select(selectBuildings);
  dataSource = new MatTableDataSource<Floor>();
  displayedColumns: string[] = [
    'position',
    'name',
    'max_capacity',
    'current_capacity',
    'beds',
    'actions',
  ];
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
