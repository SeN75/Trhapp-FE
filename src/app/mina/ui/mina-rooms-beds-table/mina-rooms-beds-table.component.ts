import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBuildings } from '@/building//data-access/store/building.reducer';
import { BuildingState } from '@/building//utils/types/building.type';
import { Room } from '@/shared/types/base.type';
import { MaterialModule } from '@/shared/module/material.module';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';

@Component({
  selector: 'tp-mina-rooms-beds-table',
  standalone: true,
  imports: [MaterialModule, TpPaginatorDirective, RouterLink],
  templateUrl: './mina-rooms-beds-table.component.html',
  styleUrl: './mina-rooms-beds-table.component.scss',
})
export class MinaRoomsBedsTableComponent {
  private store = inject(Store<{ buildings: BuildingState }>);
  private router = inject(Router);
  private aRouter = inject(ActivatedRoute);

  buildings$ = this.store.select(selectBuildings);
  dataSource = new MatTableDataSource<Room>();
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
    const floorId = this.aRouter.snapshot.params['floorId'];
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
          building?.floors
            ?.find((f) => f.id === floorId)
            ?.rooms?.map((r, i) => ({ ...r, position: i + 1 })) || [];
      });
    }
  }
}
