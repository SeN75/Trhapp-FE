import {
  selectBuildings,
  selectIsLoading,
} from '@/building/data-access/store/building.reducer';
import { BuildingState } from '@/building/utils/types/building.type';
import { MaterialModule } from '@/shared/module/material.module';
import { LoggerService } from '@/shared/service/logger.service';
import {
  Building,
  BedBuidingMina,
  Floor,
  Room,
} from '@/shared/types/base.type';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

@Component({
  selector: 'tp-mina-pack4-stepper',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './mina-pack4-stepper.component.html',
  styleUrl: './mina-pack4-stepper.component.scss',
})
export class MinaPack4StepperComponent {
  private store = inject(Store<{ buildings: BuildingState }>);
  private logger = inject(LoggerService);
  isLoading$ = this.store.select(selectIsLoading);

  loaded = false;
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() value = new EventEmitter<BedBuidingMina>();
  bedDataSource = new MatTableDataSource<BedBuidingMina>();
  bedObs = this.bedDataSource.connect();
  building$ = this.store
    .select(selectBuildings)
    .pipe(tap((s) => (this.isEmpty = s !== null && s.length === 0)));
  isEmpty = false;
  selectedBuilding: Building | null = null;
  selectedFloor: Floor | null = null;
  selectedRoom: Room | null = null;
  beds: BedBuidingMina[] = [];
  selectedBed: BedBuidingMina | null = null;

  constructor() {
    this.isLoading$.pipe(takeUntilDestroyed()).subscribe((s) => {
      this.loaded = s || false;
    });
  }
  selectBuilding(suite: Building) {
    this.selectedBuilding = suite;
    this.selectedFloor = null;
    this.selectedRoom = null;
    this.selectedBed = null;
    this.stepper.next();
  }
  selectFloor(floor: Floor) {
    this.selectedFloor = floor;
    this.selectedRoom = null;
    this.selectedBed = null;
    this.stepper.next();
  }
  selectRoom(room: Room) {
    this.selectedRoom = room;
    this.bedDataSource.data = room.beds || [];
    this.selectedBed = null;
    this.stepper.next();
  }
  selectBed(bed: BedBuidingMina) {
    this.selectedBed = bed;
    this.logger.log('selected bed ==> ', bed);
    this.value.emit(bed);
  }
  ngAfterViewInit(): void {
    this.bedDataSource.paginator = this.paginator;
  }
}
