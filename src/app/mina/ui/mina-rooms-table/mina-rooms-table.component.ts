import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MaterialModule } from '@/shared/module/material.module';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectBuildings } from '@/building//data-access/store/building.reducer';
import { BuildingState } from '@/building//utils/types/building.type';
import { BedBuidingMina, Room } from '@/shared/types/base.type';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'tp-mina-rooms-table',
  standalone: true,
  imports: [MaterialModule, TpPaginatorDirective, RouterLink],
  templateUrl: './mina-rooms-table.component.html',
  styleUrl: './mina-rooms-table.component.scss',
})
export class MinaRoomsTableComponent implements OnInit, AfterViewInit {
  private store = inject(Store<{ buildings: BuildingState }>);
  private router = inject(Router);
  private aRouter = inject(ActivatedRoute);
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  buildings$ = this.store.select(selectBuildings);
  dataSource = new MatTableDataSource<Room>();
  displayedColumns: string[] = [
    'id',
    'number',
    'floor',
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
        console.log('tes');
        this.dataSource.data =
          building?.floors
            ?.find((f) => +f.id === +floorId)
            ?.rooms?.map((r, i) => ({ ...r, position: i + 1 })) || [];
      });
    }
  }
}
