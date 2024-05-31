import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '@/shared/module/material.module';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectBuildings } from '@/building//data-access/store/building.reducer';
import { BuildingState } from '@/building//utils/types/building.type';
import { BedBuidingMina, Room } from '@/shared/types/base.type';

@Component({
  selector: 'tp-mina-rooms-table',
  standalone: true,
  imports: [MaterialModule, TpPaginatorDirective, RouterLink],
  templateUrl: './mina-rooms-table.component.html',
  styleUrl: './mina-rooms-table.component.scss',
})
export class MinaRoomsTableComponent implements OnInit {
  private store = inject(Store<{ buildings: BuildingState }>);
  private router = inject(Router);
  private aRouter = inject(ActivatedRoute);

  buildings$ = this.store.select(selectBuildings);
  dataSource = new MatTableDataSource<BedBuidingMina>();
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
    const roomId = this.aRouter.snapshot.params['roomId'];
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
            ?.rooms?.find((r) => r.id === roomId)
            ?.beds?.map((r, i) => ({ ...r, position: i + 1 })) || [];
      });
    }
  }
}
