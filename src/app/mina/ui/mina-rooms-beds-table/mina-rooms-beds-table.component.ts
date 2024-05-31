import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBuildings } from '@/building//data-access/store/building.reducer';
import { BuildingState } from '@/building//utils/types/building.type';
import { BedBuidingMina, Room } from '@/shared/types/base.type';
import { MaterialModule } from '@/shared/module/material.module';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'tp-mina-rooms-beds-table',
  standalone: true,
  imports: [MaterialModule, TpPaginatorDirective, RouterLink],
  templateUrl: './mina-rooms-beds-table.component.html',
  styleUrl: './mina-rooms-beds-table.component.scss',
})
export class MinaRoomsBedsTableComponent implements AfterViewInit {
  private store = inject(Store<{ buildings: BuildingState }>);
  private router = inject(Router);
  private aRouter = inject(ActivatedRoute);
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  buildings$ = this.store.select(selectBuildings);
  dataSource = new MatTableDataSource<BedBuidingMina>();
  displayedColumns: string[] = [
    'bed_number',
    'place',
    'gender',
    'pilgrim',
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
            ?.find((f) => +f.id === +floorId)
            ?.rooms?.find((r) => +r.id === +roomId)
            ?.beds?.map((r, i) => ({
              ...r,
              ...r.pilgrim,
              ...r.info,
              position: i + 1,
            })) || [];
      });
    }
  }
}
