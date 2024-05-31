import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '@/shared/module/material.module';
import { TpPaginatorDirective } from '@/shared/directive/tp-paginator.directive';
import { MinaBuildingCardComponent } from '@/mina/ui/mina-building-card/mina-building-card.component';
import { AsyncPipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BuildingState } from '@/building//utils/types/building.type';
import { selectBuildings } from '@/building//data-access/store/building.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Building } from '@/shared/types/base.type';
import { MinaState } from '@/mina/utils/types/mina.type';
import { MinaAction } from '@/mina/data-access/store/mina.action';
@Component({
  selector: 'app-mina-building',
  standalone: true,
  imports: [
    RouterLink,
    MaterialModule,
    TpPaginatorDirective,
    MinaBuildingCardComponent,
    AsyncPipe,
  ],
  templateUrl: './mina-building.component.html',
  styleUrl: './mina-building.component.scss',
})
export class MinaBuildingComponent implements AfterViewInit {
  private store = inject(Store<{ building: BuildingState }>);
  private minaStore = inject(Store<{ mina: MinaState }>);
  building$ = this.store.select(selectBuildings);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Building>();
  obs = this.dataSource.connect();
  constructor() {
    this.building$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.dataSource.data = data || [];
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  allocate() {
    this.minaStore.dispatch(MinaAction.allocate({ pack: 'package4' }));
  }
}
