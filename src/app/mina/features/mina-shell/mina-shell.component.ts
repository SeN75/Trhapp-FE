import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { BuildingState } from '../../../building/utils/types/building.type';
import { BuildingAction } from '../../../building/data-access/store/building.action';
import { MinaService } from '../../data-access/service/mina.service';
import { BuildingService } from '../../../building/data-access/service/building.service';

@Component({
  selector: 'tp-mina-shell',
  template: `<router-outlet />`,
  imports: [CommonModule, RouterOutlet],
  standalone: true,
})
export class MinaShellComponent implements OnInit {
  private buildingStore = inject(Store<{ building: BuildingState }>);
  private servie = inject(BuildingService);
  ngOnInit(): void {
    this.buildingStore.dispatch(BuildingAction.get());
  }
}
